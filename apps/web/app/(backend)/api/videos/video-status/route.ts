// app/api/your-route/route.ts
import { NextRequest } from "next/server";
import prisma from "@repo/db";

export async function GET(req: NextRequest) {
  const videoId = new URL(req.url).searchParams.get("videoId");
  try {
    const video = await prisma.video.findUnique({
      where: { id: videoId as string }, // Assuming 'id' is the unique identifier
      select: { status: true }, // Fetch only the 'status' field
    });
    return new Response(JSON.stringify(video), {
      status: 200,
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error }), {
      status: 403,
    });
  }
}

export async function PATCH(req: NextRequest) {
  const body = await req.json();

  try {
    const updatedStatus = await prisma.video.update({
      where: {
        id: body.videoId as string,
      },
      data: {
        status: body.status,
      },
    });
    return new Response(JSON.stringify(updatedStatus), {
      status: 200,
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error }), {
      status: 403,
    });
  }
}
