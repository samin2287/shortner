import React from "react";

// -------------------- Footer Component --------------------
const Footer = () => {
  return (
    <footer className="mt-12 pt-8 border-t border-gray-200 text-center text-gray-600">
      <p className="mb-2">
        © {new Date().getFullYear()} ShortURL Maker. All rights reserved.
      </p>
      <p className="text-sm">
        Free URL shortening service • No registration required • Link analytics
        coming soon
      </p>
    </footer>
  );
};

export default Footer;
