import UserTable, { User } from "@/components/UserTable/UserTable";
import jwt from 'jsonwebtoken';
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
const Dashboard: NextPage<{ isLoggedIn: boolean }> = ({ isLoggedIn }) => {
  const router = useRouter();
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const decodedToken = jwt.decode(token) as {
            email: string;
            userId: string;
          };
          console.log(decodedToken, "token");
          const userId = decodedToken.userId;
          const response = await fetch(`/api/getUserById?userId=${userId}`);
          if (!response.ok) {
            throw new Error('Failed to fetch user data');
          }
          const userData = await response.json();
          if (userData.role === 'admin') {
            setIsAdmin(true);
            const users= await fetch('api/users');
            setUsers(await users.json());
            // Proceed to fetch user data and update state if needed
          } else {
            // Redirect to home page if user is not an admin
            router.push("/");
          }
        } catch (error) {
          console.error('Error fetching user data:', error);
          router.push("/login"); // Redirect to login page if there's an error
        }
      } else {
        router.push("/login"); // Redirect to login page if token does not exist
      }
    };

    fetchUser();
  }, []);

  if (!isAdmin) {
    return <div>Access denied. Only administrators can access this page.</div>;
  }

  return (
    <div className="mt-10">
      <UserTable users={users} />
    </div>
  );
};



export default Dashboard;
