import type { NextApiRequest, NextApiResponse } from "next";
import { auth, currentUser, getAuth } from "@clerk/nextjs/server";
import { clerkClient } from "@clerk/nextjs";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { userId } = await getAuth(req);

    //   console.log(userMetadata,"user metadata");
    if (!userId) {
        return res.status(401).json({ error: "Unauthorized" });
    }
    const user = await clerkClient.users.getUser(userId);

    // retrieve data from your database

    res.status(200).json({ user: user });
}