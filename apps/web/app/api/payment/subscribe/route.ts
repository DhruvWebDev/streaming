import { NextRequest } from "next/server";
import { clusterApiUrl, Connection } from "@solana/web3.js";
import prisma from "@repo/db";
import { z } from "zod";

const SOLANA_NETWORK = "devnet"; // Change to "mainnet-beta" for production

export async function POST(req: NextRequest) {
  try {
    // Parse the incoming JSON body
    const { txHash, userId, plan } = await req.json();

    // Validate subscription plan using Zod
    const planSchema = z.enum(["Free", "Hobby", "Enterprise"]);
    const parsedPlan = planSchema.safeParse(plan);

    // Return an error if the plan is invalid
    if (!parsedPlan.success) {
      return new Response(
        JSON.stringify({ error: "Invalid subscription plan" }),
        { status: 400 },
      );
    }

    // Return an error if txHash or userId are missing
    if (!txHash || !userId) {
      return new Response(
        JSON.stringify({ error: "Missing required fields" }),
        { status: 400 },
      );
    }

    // Set up connection to Solana network
    const connection = new Connection(clusterApiUrl(SOLANA_NETWORK));

    // Attempt to get the transaction info
    const txInfo = await connection.getParsedTransaction(txHash, {
      commitment: "confirmed",
    });

    // Return an error if the transaction is not found
    if (!txInfo) {
      return new Response(JSON.stringify({ error: "Transaction not found" }), {
        status: 404,
      });
    }

    // Check if the transaction failed (i.e., there was an error in the meta data)
    if (txInfo.meta?.err) {
      return new Response(JSON.stringify({ error: "Transaction failed" }), {
        status: 400,
      });
    }

    // Update subscription in the database
    await prisma.subscription.update({
      where: { id: userId },
      data: { type: parsedPlan.data }, // Use parsedPlan.data instead of the raw plan string
    });

    // Return a success response
    return new Response(
      JSON.stringify({ message: "Subscription updated successfully" }),
      { status: 200 },
    );
  } catch (error) {
    console.error("Error processing request:", error);

    // Return a generic internal server error if something goes wrong
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
    });
  }
}
