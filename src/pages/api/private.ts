import { clerkClient } from "@clerk/nextjs";
import { getAuth } from "@clerk/nextjs/server";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { userId } = await getAuth(req);
    if (!userId) {
        return res.status(401).json({ error: "Unauthorized" });
    }

    try {
        // Fetch user data
        const user = await clerkClient.users.getUser(userId);
        
        // Check if "status" field already exists in user metadata
        if (user.unsafeMetadata && user.unsafeMetadata.status) {
            return res.status(400).json({ error: "Metadata already exists",user: user });
        }

        // Update user metadata
        await clerkClient.users.updateUserMetadata(userId, {
            unsafeMetadata: {
                "status": "active"
            }
        });

        res.status(200).json({ success: true });
    } catch (error) {
        console.error("Error updating user metadata:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}
