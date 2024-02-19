// components/Footer.tsx
import Link from 'next/link';
import { FaTwitter, FaFacebook, FaInstagram } from 'react-icons/fa';

const Footer: React.FC = () => {
  return (
    <footer className="bg-black text-white py-8">
      <div className="container mx-auto px-4">
        <h2 className="text-lg text-center">Checkout our Website <Link href="https://dealertactics.com/" className='text-yellow-300 hover:text-yellow-500' target="_blank" rel="noopener noreferrer"> Dealer Tactics</Link></h2>
      </div>
    </footer>
  );
};

export default Footer;
