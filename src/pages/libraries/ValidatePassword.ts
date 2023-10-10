import bcryptjs from "bcryptjs";

export default async function ValidatePassword(
  plainPassword: string,
  HashedPassword: string
): Promise<any> {
  const result = await bcryptjs.compare(plainPassword, HashedPassword);
  return result;
}
