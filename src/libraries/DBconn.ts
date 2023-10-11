import mysql from "mysql2/promise";
export default async function Query(query: string, values: Array<any>) {
  const DbConn = await mysql.createConnection({
    host: process.env.NEXT_PUBLIC_HOST,
    user: process.env.NEXT_PUBLIC_USER,
    password: "",
    database: process.env.NEXT_PUBLIC_DATABASE,
  });

  try {
    const [result] = await DbConn.query(query, values);
    DbConn.end();
    return result;
  } catch (error) {
    console.log(
      error
        ? `Failed To Connect to MySQL with ${error}`
        : `Connected Successfully to MySQL`
    );
  }
}
