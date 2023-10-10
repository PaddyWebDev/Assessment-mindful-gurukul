import ValidatePassword from "@/pages/libraries/ValidatePassword";
import Query from "../../libraries/DBconn";
import { NextRequest, NextResponse } from "next/server";
import { NextApiResponse } from "next";
export default async function handler(
  request: NextRequest,
  res: NextApiResponse
) {
  try {
    const { email, password }: any = request.body;
    const GetUser: any = await Query(
      "SELECT * FROM admindata WHERE adminEmail = ?",
      [email]
    );
    const UserData = GetUser[0];
    const HashedPassword: string = UserData.adminPassword;
    const isPasswordMatch = await ValidatePassword(password, HashedPassword);
    if (!isPasswordMatch) {
      return NextResponse.json(
        { message: "Invalid Password" },
        { status: 403 }
      );
    }
    res.status(200).json({
      message: "Login Success",
      success: true,
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
}
