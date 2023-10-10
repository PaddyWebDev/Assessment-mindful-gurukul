import type { NextApiRequest, NextApiResponse } from "next";
import Query from "../../../libraries/DBconn";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    console.log(req.query.Id);
    console.log(req.body.FormData);
    const { Id } = req.query;
    const { userName, userEmail, userPhoneNum, userGender, City, State } =
      req.body.FormData;
    const UpdateQuery: string =
      "UPDATE users SET userName = ? , userEmail = ? , userPhoneNum = ?, userGender = ? , City = ? , State = ? WHERE userId= ?";

    const Values: Array<any> = [
      userName,
      userEmail,
      userPhoneNum,
      userGender,
      City,
      State,
      Id,
    ];

    const result = await Query(UpdateQuery, Values);
    res.status(200).send({ result });
  } catch (error) {
    console.log(error);
  }
}
