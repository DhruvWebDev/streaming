import { type NextRequest } from "next/server";
import { clusterApiUrl, Connection } from "@solana/web3.js";
import prisma from "@repo/db";

// Solana connection
const connection = new Connection(clusterApiUrl("mainnet-beta"), {
  commitment: "confirmed",
});

export async function POST(req: NextRequest) {
  try {
    const searchParams = new URL(req.url).searchParams;
    const userId = searchParams.get("user_id");

    // Check if userId is provided
    if (!userId) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
      });
    }

    // Fetch the transaction signature from the database
    const signature = await prisma.subscription.findUnique({
      where: {
        userId,
      },
    });

    // Check if signature is found
    if (!signature) {
      return new Response(
        JSON.stringify({ error: "Signature not found in the db" }),
        { status: 404 },
      );
    }

    // Get the transaction status from Solana
    const txStatus = await connection.getSignatureStatus(signature.txSignature);

    // Return the status of the transaction
    return new Response(
      JSON.stringify({
        success: true,
        status: txStatus,
      }),
      { status: 200 },
    );
  } catch (error) {
    console.error("Error verifying transaction:", error);
    return new Response(
      JSON.stringify({ error: "Failed to verify transaction" }),
      { status: 500 },
    );
  }
}
