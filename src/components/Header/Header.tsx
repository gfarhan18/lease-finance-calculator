import Image from "next/image";

const Header: React.FC = () => {
  return (
    <div className="bg-black shadow-md">
      <div className="container mx-auto px-4 py-3 md:py-6 flex flex-col md:flex-row justify-between items-center">
          <Image src="/Dealer-Tactics-Logo.png" alt="Logo" width={150} height={50} />
          <h1 className="text-2xl md:text-3xl bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-gray-300 p-2 font-bold text-center">
            Lease Payment Calculator and Finance Calculator
          </h1>
        <a href="tel:+1234567890" className="text-white hover:text-yellow-200 mt-2 md:mt-0">
          +1 (234) 567-890
        </a>
      </div>
    </div>
  );
};

export default Header;
