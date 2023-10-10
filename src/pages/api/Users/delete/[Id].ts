import type { NextApiRequest, NextApiResponse } from "next";
import Query from "../../../libraries/DBconn";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const UpdateQuery: string = "DELETE FROM users WHERE userId = ?";
    const result = await Query(UpdateQuery, [req.query.Id]);
    res.status(200).send({ result });
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error" });
  }
}
