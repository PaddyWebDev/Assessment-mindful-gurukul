import type { NextApiRequest, NextApiResponse } from "next";
import Query from "../../libraries/DBconn";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const result = await Query("SELECT * FROM users", []);
    res.status(200).send({ result });
  } catch (error) {
    console.log(error);
  }
}
