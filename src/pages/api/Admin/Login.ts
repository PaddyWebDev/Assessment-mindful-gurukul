import ValidatePassword from "@/libraries/ValidatePassword";
import Query from "@/libraries/DBconn";
import { NextApiResponse, NextApiRequest } from "next";
export default async function handler(
  request: NextApiRequest,
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
      return res.status(403).json({ message: "Invalid Password" });
    }
    res.status(200).json({
      message: "Login Success",
      success: true,
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
}
