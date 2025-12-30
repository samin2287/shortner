import React from "react";
import { useState } from "react";
import { Link as LinkIcon, Menu, X } from "lucide-react";
import { Link } from "react-router-dom";

// -------------------- Responsive Navbar (Green Theme) --------------------
const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks = [
    { label: "Home", href: "#" },
    { label: "Features", href: "#features" },
    { label: "Analytics", href: "#analytics" },
  ];

  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="p-2 bg-emerald-50 rounded-md">
              <LinkIcon className="w-6 h-6 text-emerald-600" />
            </div>
            <div>
              <a href="#" className="text-lg font-bold text-emerald-700">
                ShortURL
              </a>
              <div className="text-xs text-gray-500">Shorten & Track</div>
            </div>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-gray-700 hover:text-emerald-600 transition">
                {link.label}
              </a>
            ))}

            <Link
              to="/register"
              className="ml-4 cursor-pointer bg-emerald-600 text-white hover:bg-emerald-700 focus:ring-emerald-500  px-4 py-2 text-sm inline-flex items-center justify-center font-medium rounded-lg transition focus:outline-none focus:ring-2 focus:ring-offset-2">
              Register
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="p-2 rounded-md text-gray-700 hover:bg-gray-100">
              {menuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200">
          <div className="px-4 py-4 space-y-3">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="block text-gray-700 text-base">
                {link.label}
              </a>
            ))}

            <Link
              to="/register"
              className="ml-4 cursor-pointer bg-emerald-600 text-white hover:bg-emerald-700 focus:ring-emerald-500  px-4 py-2 text-sm inline-flex items-center justify-center font-medium rounded-lg transition focus:outline-none focus:ring-2 focus:ring-offset-2">
              Register
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
