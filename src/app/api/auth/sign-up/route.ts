import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import jwt, { Secret } from "jsonwebtoken";

export async function POST(request: NextRequest) {
  try {
    const requestData = await request.json();

    const response = await db.user.create({
      data: {
        username: requestData.username,
        email: requestData.email,
        password: requestData.password,
      },
    });

    const token = jwt.sign(
      {
        userId: response.id,
        email: response.email,
        username: response.username,
      },
      process.env.JWT_SECRET as Secret,
      {
        expiresIn: "1d",
      }
    );

    return NextResponse.json(
      {
        message: "Sign Up successfully",
        user: {
          id: response.id,
          email: response.email,
          username: response.username,
        },
        token: token,
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
