// import { useRouter } from 'next/router';
// import { useState, useEffect, ChangeEvent, FormEvent } from 'react';
// import { User } from '@/components/UserTable/UserTable';
// import { toast } from 'react-toastify';

// export default function EditUserPage() {
//   const router = useRouter();
//   const { id } = router.query;
//   const [user, setUser] = useState<User>({
//     id: 0,
//     first_name: '',
//     last_name: '',
//     email: '',
//     status: '',
//   });
//   const [formData, setFormData] = useState<User>({
//     id: 0,
//     first_name: '',
//     last_name: '',
//     email: '',
//     status: '',
//   });

//   useEffect(() => {
//     if (id) {
//       const fetchUser = async () => {
//         try {
//           const response = await fetch(`/api/getUserById?userId=${id}`);
//           if (!response.ok) {
//             throw new Error('Failed to fetch user');
//           }
//           const userData = await response.json();
//           setUser(userData);
//           setFormData(userData);
//         } catch (error) {
//           console.error('Error fetching user:', error);
//         }
//       };
//       fetchUser();
//     }
//   }, [id]);

//   const handleChange = (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     try {
//       const response = await fetch(`/api/updateUser`, {
//         method: 'PUT',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(formData),
//       });
//       if (!response.ok) {
//         throw new Error('Failed to update user');
//       }
//       toast.success("User updated successfully");
//       router.push(`/dashboard`);
//     } catch (error) {
//       console.error('Error updating user:', error);
//     }
//   };


//   return (
//     <div className="max-w-lg mx-auto mt-10">
//       <h1 className="text-3xl font-semibold mb-6 text-yellow-500">Edit User</h1>
//       <form onSubmit={handleSubmit} className="space-y-4">
//         <div>
//           <label className="block mb-1 text-yellow-500">First Name:</label>
//           <input
//             type="text"
//             name="first_name"
//             value={formData.first_name}
//             onChange={handleChange}
//             className="w-full border rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
//           />
//         </div>
//         <div>
//           <label className="block mb-1 text-yellow-500">Last Name:</label>
//           <input
//             type="text"
//             name="last_name"
//             value={formData.last_name}
//             onChange={handleChange}
//             className="w-full border rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
//           />
//         </div>
//         <div>
//           <label className="block mb-1 text-yellow-500">Email:</label>
//           <input
//             type="email"
//             name="email"
//             value={formData.email}
//             onChange={handleChange}
//             className="w-full border rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
//           />
//         </div>
//         <div>
//           <label className="block mb-1 text-yellow-500">Status:</label>
//           <select
//             name="status"
//             value={formData.status}
//             onChange={handleChange}
//             className="w-full border rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
//           >
//             <option value="active">Active</option>
//             <option value="block">Block</option>
//           </select>
//         </div>
//         <button type="submit" className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600">Update</button>
//       </form>
//     </div>
//   );

// }
