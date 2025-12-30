import React from "react";
import { Link } from "lucide-react";

// -------------------- Header Component (hero only) --------------------
const Header = () => {
  return (
    <header>
      {/* Hero */}
      <div className="bg-linear-to-r from-emerald-600 to-green-500 text-white py-12 shadow-lg">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Link className="w-10 h-10" />
            <h1 className="text-4xl font-bold">ShortURL Maker</h1>
          </div>
          <p className="text-center text-lg text-green-100 max-w-2xl mx-auto">
            Transform long, unwieldy URLs into short, memorable links that are
            perfect for sharing
          </p>
        </div>
      </div>
    </header>
  );
};

export default Header;
