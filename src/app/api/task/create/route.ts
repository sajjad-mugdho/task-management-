import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import jwt, { Secret } from "jsonwebtoken";

export async function POST(request: NextRequest) {
  try {
    const requestData = await request.json();

    console.log(requestData);

    const { id, ...data } = requestData;

    const response = await db.task.create({
      data: {
        ...data,
        projectId: id,
      },
    });

    console.log(response);

    return NextResponse.json(
      {
        message: "Task Created successfully",
        Project: response,
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
