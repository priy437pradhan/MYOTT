import { Link } from 'react-router-dom';
import { FaSearch, FaUser, FaBars } from 'react-icons/fa'; 
import { useState } from 'react';

function Header({ onLoginClick }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="bg-red-600 text-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <div className="text-3xl font-bold">
          <Link to="/" className="hover:text-gray-200 transition">MyOTTPlatform</Link>
        </div>
        <nav className={`md:flex space-x-6 ${isMenuOpen ? 'block' : 'hidden'} md:block`}>
          <Link to="/" className="hover:text-gray-200 transition duration-300">Home</Link>
          <Link to="/watchlist" className="hover:text-gray-200 transition duration-300">Watchlist</Link>
        </nav>
        <div className="flex items-center space-x-4">
          <button className="hover:text-gray-200 transition duration-300">
            <FaSearch size={20} />
          </button>
          <button className="hover:text-gray-200 transition duration-300" onClick={onLoginClick}>
            <FaUser size={20} />
          </button>
          <button className="md:hidden hover:text-gray-200 transition duration-300" onClick={toggleMenu}>
            <FaBars size={24} />
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;
