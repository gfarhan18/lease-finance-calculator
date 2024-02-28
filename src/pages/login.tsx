// components/LoginPage.tsx

import LoginForm from "@/components/LoginForm/LoginForm";
import { SignIn } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const LoginPage: React.FC = () => {
  return (
    <section className="border-red-500 flex items-center justify-center">
      <div className=" p-5 flex rounded-2xl shadow-lg max-w-3xl">
        <div className="md:w-1/2 px-5">
          {/* <LoginForm /> */}
          <SignIn 
            afterSignInUrl="/"
          />

          
        </div>

      </div>
    </section>
  );
};

export default LoginPage;
