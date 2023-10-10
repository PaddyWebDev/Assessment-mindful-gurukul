import type { NextApiRequest, NextApiResponse } from "next";
import Query from "../../libraries/DBconn";
import bcryptjs from "bcryptjs";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const saltRounds: number = 10;
    const UpdateQuery: string =
      "INSERT INTO admindata ( adminName, adminEmail, adminPassword) VALUES(?, ?, ?)";
    const { name, email, password }: any = req.body;
    const HashedPassword = await bcryptjs.hash(password, saltRounds);
    const Values: Array<string> = [name, email, HashedPassword];
    const result = await Query(UpdateQuery, Values);
    res.status(200).send({ result });
  } catch (error) {
    console.log(error);
  }
}
