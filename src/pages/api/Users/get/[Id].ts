import type { NextApiRequest, NextApiResponse } from "next";
import Query from "../../../libraries/DBconn";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const Id: number = parseInt(req.query.Id as string);
    const result = await Query(
      'SELECT userName, userEmail, userPhoneNum, userGender, City, State FROM users WHERE userId = ?',
      [Id]
    );
    res.status(200).send({ result });
  } catch (error) {
    console.log(error);
  }
}
