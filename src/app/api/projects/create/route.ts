import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import jwt, { Secret } from "jsonwebtoken";

export async function POST(request: NextRequest) {
  try {
    const requestData = await request.json();

    console.log(requestData);

    const response = await db.project.create({
      data: requestData,
      include: {
        Task: true,
      },
    });

    console.log(response);

    return NextResponse.json(
      {
        message: "Project Created successfully",
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

export async function GET(request: NextRequest) {
  try {
    const response = await db.project.findMany({
      include: {
        Task: true,
      },
    });

    return NextResponse.json(
      {
        message: "Projects fetched successfully",
        projects: response,
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
