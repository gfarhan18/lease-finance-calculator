
import { SignUp } from "@clerk/nextjs";
import { useRouter } from "next/router";
import React from "react";

const RegisterPage: React.FC = () => {
  const router = useRouter();
  
  return (
    <section className="border-red-500 flex items-center justify-center">
      <div className=" p-5 flex rounded-2xl shadow-lg max-w-5xl">
        <div className="w-full px-5">
          {/* <RegisterForm /> */}
          <SignUp
            // afterSignInUrl="/"
            // appearance={{
            //   elements :{
            //     rootBox: 'mx-auto'
            //   }
            // }}
          />
          
        </div>
      </div>
    </section>
  );
};

export default RegisterPage;
