// app/api/your-route/route.ts
import { NextRequest } from "next/server";
import prisma from "@repo/db";
export async function POST(req: NextRequest) {
  try {
    const { signedUrl, user_id } = await req.json();
    console.log(signedUrl, user_id);
    const result = await prisma.video.create({
      data: {
        path: signedUrl as string,
        userId: user_id as string,
      },
    });
    return new Response(JSON.stringify(result), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error }), {
      status: 403,
    });
  }
}
