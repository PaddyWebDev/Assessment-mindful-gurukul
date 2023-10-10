import type { NextApiRequest, NextApiResponse } from "next";
import Query from "../../libraries/DBconn";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const UpdateQuery: string =
      "INSERT INTO users ( userName, userEmail, userPhoneNum, userGender, City, State) VALUES(?, ? , ? , ? , ? , ?)";
    const { name, email, phone, gender, city, state }: any = req.body.FormData;
    const Values: Array<string> = [name, email, phone, gender, city, state];
    const result = await Query(UpdateQuery, Values);
    res.status(200).send({ result });
  } catch (error) {
    console.log(error);
  }
}
