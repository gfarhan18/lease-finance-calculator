import { SignInButton, SignUpButton, UserButton } from "@clerk/nextjs";
import Image from "next/image";

const Header: React.FC = () => {
  return (
    <div className="bg-black shadow-md">
      <div className="container mx-auto px-4 py-3 md:py-6 flex flex-col md:flex-row items-center">
        <Image
          src="/Dealer-Tactics-Logo.png"
          alt="Logo"
          width={150}
          height={50}
        />
        <h1 className=" w-full text-2xl md:text-3xl bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-gray-300 p-2 font-bold text-center">
          Bonus Calculator
        </h1>

        <SignInButton>
          <button className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded ml-2 sm:w-28">
            Sign In
          </button>
        </SignInButton>
        <SignUpButton>
          <button className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded ml-2 sm:w-32">
            Sign Up
          </button>
        </SignUpButton>

        <UserButton afterSignOutUrl={"/sign-in"} />
      </div>
    </div>
  );
};

export default Header;
