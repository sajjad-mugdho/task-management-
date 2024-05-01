import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import jwt, { Secret } from "jsonwebtoken";

export async function POST(request: NextRequest) {
  try {
    const requestData = await request.json();

    console.log(requestData);

    const response = await db.user.findUnique({
      where: {
        email: requestData.email,
      },
    });

    if (!response) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    if (response.password !== requestData.password) {
      return NextResponse.json(
        { message: "Password is incorrect" },
        { status: 400 }
      );
    }

    const token = jwt.sign(
      {
        userId: response.id,
      },
      process.env.JWT_SECRET as Secret,
      {
        expiresIn: "1d",
      }
    );

    return NextResponse.json(
      {
        message: "Sign In successfully",
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
