// // pages/api/updateUser.ts

// import { NextApiRequest, NextApiResponse } from 'next';
// import updateUser from './db/queries';
// // import { updateUser } from '../api/db/queries'; // Import your updateUser function

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {

//   if (req.method !== 'PUT') {
//     return res.status(405).json({ message: 'Method Not Allowed' });
//   }

//   const { id, ...userData } = req.body;

//   if (!id || typeof id !== 'number') {
//     return res.status(400).json({ message: 'Invalid user ID' });
//   }

//   try {
//     console.log("req.body");
//     const success = await updateUser(id, userData);
//     if (success) {
//       return res.status(200).json({ message: 'User updated successfully' });
//     } else {
//       return res.status(500).json({ message: 'Failed to update user' });
//     }
//   } catch (error) {
//     console.error('Error updating user:', error);
//     return res.status(500).json({ message: 'Internal Server Error' });
//   }
// }
