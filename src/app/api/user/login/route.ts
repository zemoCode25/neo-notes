import { NextResponse, NextRequest } from "next/server";
import { findUserByEmail } from "../user-action";
import { comparePasswords } from "@/app/auth/core/comparePassword";
import { getUserByEmail } from "../user-action";
import { signJwt } from "@/app/auth/jwt";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json({ error: "Missing Values" }, { status: 400 });
    }

    // Check if user exists
    const user = await findUserByEmail(email);
    console.log(user, "User found in POST request");
    if (!user)
      return NextResponse.json({ error: "Email does not exist", status: 401 });

    const userEntry = await getUserByEmail(email);

    const userDetails = userEntry.user;

    if (!userDetails) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    console.log(userDetails.password, "User details retrieved");

    // Compare passwords
    const isMatchingPassword = await comparePasswords({
      inputPassword: password,
      hashedPassword: userDetails.password,
      salt: userDetails.salt,
    });

    if (!isMatchingPassword) {
      return NextResponse.json({ error: "Invalid password" }, { status: 401 });
    }

    // Generate JWT token
    const token = await signJwt({
      email: email,
      userID: userDetails.id,
    });

    const response = NextResponse.json({ success: true }, { status: 200 });

    response.cookies.set("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });

    return response;
  } catch (error) {
    console.error(`${error}`);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
