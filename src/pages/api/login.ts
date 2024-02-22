import { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcryptjs";
import {  findUserByEmail } from "@/models/User";
import jwt from 'jsonwebtoken';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//   await connectToDatabase();

  if (req.method === "POST") {
    const { email, password } = req.body;
    try {
      const user = await findUserByEmail(email);
      if (!user) {
        return res.status(401).json({ message: "Invalid email or password" });
      }
      console.log(user , "before match");

      const passwordMatch = await bcrypt.compare(password, user[0].password);
      if (!passwordMatch) {
        return res.status(401).json({ message: "Invalid email or password" });
      }
      const token = jwt.sign({ userId: user[0].id, email: user[0].email }, process.env.JWT_SECRET || '', { expiresIn: '1h' });
      return res.status(200).json({ token });
    } catch (error) {
      console.error("Error logging in:", error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  } else {
    return res.status(405).json({ message: "Method Not Allowed" });
  }
}
