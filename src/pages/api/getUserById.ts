// // pages/api/getUserById.ts

// import { NextApiRequest, NextApiResponse } from 'next';
// import { getUserById } from '../api/db/queries'; // Import your user-related functions

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//   if (req.method !== 'GET') {
//     return res.status(405).json({ message: 'Method Not Allowed' });
//   }

//   const { userId } = req.query;

//   if (!userId || typeof userId !== 'string') {
//     return res.status(400).json({ message: 'Invalid user ID' });
//   }

//   try {
//     const user = await getUserById(Number(userId));
//     if (!user) {
//       return res.status(404).json({ message: 'User not found' });
//     }
//     return res.status(200).json(user);
//   } catch (error) {
//     console.error('Error fetching user by ID:', error);
//     return res.status(500).json({ message: 'Internal Server Error' });
//   }
// }
