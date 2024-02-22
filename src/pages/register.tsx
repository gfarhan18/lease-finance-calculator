
import RegisterForm, {
  FormValues,
} from "@/components/RegisterForm/RegisterForm";
import { createUser } from "@/models/User";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useState } from "react";

const RegisterPage: React.FC = () => {
  const router = useRouter();
  
  return (
    <section className="border-red-500 flex items-center justify-center">
      <div className="bg-gray-100 p-5 flex rounded-2xl shadow-lg max-w-5xl">
        <div className="w-full px-5">
          <h2 className="text-2xl font-bold text-[#002D74]">Register</h2>
          <RegisterForm />

          <div className="text-sm flex justify-between items-center mt-3">
            <p>If you have an account...</p>
            <button className="py-2 px-5 ml-3 bg-white border rounded-xl hover:scale-110 duration-300 border-yellow-400">
              Login
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RegisterPage;
