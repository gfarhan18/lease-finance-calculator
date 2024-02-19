// components/LoginPage.tsx

import RegisterForm from "@/components/RegisterForm/RegisterForm";
import { registerUser } from "@/services/userService";
import Image from "next/image";
import React from "react";

const LoginPage: React.FC = () => {
    const handleRegister = async (email: string, password: string) => {
        try {
          await registerUser(email, password);
          // Redirect user to login page or any other page after successful registration
        } catch (error) {
          console.error("Failed to register user: ", error);
        }
      };
  return (
    <section className="border-red-500 flex items-center justify-center">
      <div className="bg-gray-100 p-5 flex rounded-2xl shadow-lg max-w-3xl">
        <div className="md:w-1/2 px-5">
          <h2 className="text-2xl font-bold text-[#002D74]">Login</h2>
          <p className="text-sm mt-4 text-[#002D74]">
            If you have an account, please login
          </p>
          <RegisterForm onRegister={handleRegister}/>

          <div className="text-sm flex justify-between items-center mt-3">
            <p>If you don't have an account...</p>
            <button className="py-2 px-5 ml-3 bg-white border rounded-xl hover:scale-110 duration-300 border-yellow-400">
              Register
            </button>
          </div>
        </div>

        <div className="w-1/2 md:block hidden">
          <Image
            src="/calculator.jpg"
            className="rounded-2xl"
            alt="page img"
            width={300}
            height={650}
          />
        </div>
      </div>
    </section>
  );
};

export default LoginPage;
