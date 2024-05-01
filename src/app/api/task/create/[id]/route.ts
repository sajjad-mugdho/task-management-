import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params: { id } }: { params: { id: string } }
) {
  // const requestData = await request.json();

  console.log(id);

  try {
    const response = await db.task.findMany({
      where: {
        projectId: id,
      },
    });

    return NextResponse.json(
      {
        message: "Tasks fetched successfully",
        tasks: response,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
}
