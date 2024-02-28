// API route for users
import { getUsers } from "../db/queries";

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      console.log(req, "hehehhee");
      const users = await getUsers();
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  } 
  else {
    res.status(405).json({ error: "Method Not Allowed" });
  }
}
