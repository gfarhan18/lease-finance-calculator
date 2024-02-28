// // import { createUser } from '@/models/User';
// import { NextApiRequest, NextApiResponse } from 'next';
// import { toast } from 'react-toastify';
// import { createUser } from './db/queries';

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
// //   await connectToDatabase();
//   if (req.method === 'POST') {
//     const { email, password, first_name, last_name } = req.body;
//     try {
//         const response = await createUser(email, password, first_name, last_name, 'block');

//       if (response){
//           res.status(200).json({ success: true, message: 'User registered successfully' });
//       } else {
//         throw new Error();
//       }
//     } catch (error) {
//       res.status(500).json({ success: false, message: 'Failed to register user' });
//     }
//   } else {
//     // res.status(405).json({ success: false, message: 'Method Not Allowed' });
//   }
// }
