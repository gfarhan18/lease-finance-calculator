import DashboardLayout from "@/components/DashboardLayout/DashboardLayout";
import UserTable from "@/components/UserTable/UserTable";
import React, { useState } from "react";
import { GetServerSideProps, NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { findUserByEmail } from "@/models/User";
import jwt from "jsonwebtoken";

const users = [
  { id: 1, name: "John Doe", email: "john@example.com", status: "Active" },
  { id: 2, name: "Jane Doe", email: "jane@example.com", status: "Blocked" },
];
const Dashboard: NextPage<{ isLoggedIn: boolean }> = ({ isLoggedIn }) => {
  const router = useRouter();
  const [userExists, setUserExists] = useState<boolean>(false);

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        const decodedToken = jwt.decode(token) as { email: string };
        console.log(decodedToken, "decoded token");
        const email = decodedToken.email;
        console.log(email, "email");
        const user = await findUserByEmail(email);
        console.log(user, "email after");

      } else {
        router.push("/login");
      }
    };
  
    fetchUser();
  }, []);

  if (!isLoggedIn || !userExists) {
    return null;
  }

  return (
    <div className="mt-10">
      don
      <UserTable users={users} />
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  return { props: { isLoggedIn: false } };
};

export default Dashboard;
