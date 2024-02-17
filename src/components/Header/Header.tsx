import Image from "next/image";

// components/Header.tsx
const Header: React.FC = () => {
  return (
    <div className="bg-black shadow-md">
      <div className="container mx-auto px-4 py-6 flex justify-between items-center">
        <Image src="/Dealer-Tactics-Logo.png" alt="Logo" width={100} height={50} />
        <h1 className="text-3xl bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-gray-300 px-2 font-bold">Lease Payment Calculator and Finance Calculator</h1>

        <a href="tel:+1234567890" className="text-white hover:text-yellow-200">
          +1 (234) 567-890
        </a>
      </div>
    </div>
  );
};

export default Header;
