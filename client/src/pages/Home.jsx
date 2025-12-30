// import React, { useState } from "react";
// import Header from "../components/layout/Header";
// import Footer from "../components/layout/Footer";
// import ShortenerForm from "../components/shortener/ShortenerForm";
// import ShortenerResult from "../components/shortener/ShortenerResult";
// import UrlHistory from "../components/shortener/UrlHistory";
// import Features from "../components/sections/Features";
// import HowItWorks from "../components/sections/HowItWorks";

// const ShortUrlMaker = () => {
//   const [originalUrl, setOriginalUrl] = useState("");
//   const [shortUrl, setShortUrl] = useState("");
//   const [copied, setCopied] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [urlHistory, setUrlHistory] = useState([]);

//   // Generate a random short URL (in a real app, this would call an API)
//   const generateShortUrl = (url) => {
//     const characters =
//       "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
//     let result = "";
//     for (let i = 0; i < 6; i++) {
//       result += characters.charAt(
//         Math.floor(Math.random() * characters.length)
//       );
//     }
//     return `https://short.url/${result}`;
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     if (!originalUrl.trim()) {
//       alert("Please enter a valid URL");
//       return;
//     }

//     // Validate URL format
//     const urlPattern = /^(https?:\/\/)?([\w-]+\.)+[\w-]+(\/[\w- .\/?%&=]*)?$/;
//     if (!urlPattern.test(originalUrl)) {
//       alert("Please enter a valid URL starting with http:// or https://");
//       return;
//     }

//     setLoading(true);

//     // Simulate API call delay
//     setTimeout(() => {
//       const newShortUrl = generateShortUrl(originalUrl);
//       setShortUrl(newShortUrl);

//       // Add to history
//       setUrlHistory((prev) => [
//         {
//           original: originalUrl,
//           short: newShortUrl,
//           date: new Date().toLocaleDateString(),
//         },
//         ...prev.slice(0, 4), // Keep only last 5 URLs
//       ]);

//       setLoading(false);
//     }, 800);
//   };

//   const handleCopy = () => {
//     navigator.clipboard
//       .writeText(shortUrl)
//       .then(() => {
//         setCopied(true);
//         setTimeout(() => setCopied(false), 2000);
//       })
//       .catch((err) => {
//         console.error("Failed to copy: ", err);
//       });
//   };

//   const handleReset = () => {
//     setOriginalUrl("");
//     setShortUrl("");
//   };

//   // Features are provided by `components/sections/Features.jsx`

//   // How it works steps are provided by `components/sections/HowItWorks.jsx`

//   return (
//     <div className="min-h-screen bg-linear-to-br from-emerald-50 to-green-50">
//       {/* Header */}
//       <Header />

//       <main className="container mx-auto px-4 py-8 max-w-6xl">
//         {/* -------------------- Shortener Section -------------------- */}
//         <section className="bg-white rounded-2xl shadow-xl p-6 mb-8">
//           <div className="flex items-center gap-3 mb-6">
//             <div className="p-2 bg-green-100 rounded-lg">
//               {/* small accent */}
//             </div>
//             <h2 className="text-2xl font-bold text-gray-800">
//               Shorten Your URL
//             </h2>
//           </div>

//           {/* Form */}
//           <ShortenerForm
//             originalUrl={originalUrl}
//             setOriginalUrl={setOriginalUrl}
//             onSubmit={handleSubmit}
//             loading={loading}
//             onReset={handleReset}
//           />

//           {/* Result */}
//           <ShortenerResult
//             shortUrl={shortUrl}
//             originalUrl={originalUrl}
//             copied={copied}
//             onCopy={() => handleCopy()}
//           />

//           {/* History */}
//           <UrlHistory
//             urlHistory={urlHistory}
//             onCopyHistory={(text) => {
//               navigator.clipboard.writeText(text);
//               alert("URL copied to clipboard!");
//             }}
//           />
//         </section>

//         {/* Features */}
//         <Features />

//         {/* How it works */}
//         <HowItWorks />

//         {/* Footer */}
//         <Footer />
//       </main>
//     </div>
//   );
// };

// export default ShortUrlMaker;
import React, { useEffect, useState } from "react";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import ShortenerForm from "../components/shortener/ShortenerForm";
import ShortenerResult from "../components/shortener/ShortenerResult";
import UrlHistory from "../components/shortener/UrlHistory";

import { URLService } from "../api";

const Home = () => {
  const [originalUrl, setOriginalUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [urlHistory, setUrlHistory] = useState([]);

  // 🔹 Load URL history from backend
  useEffect(() => {
    const fetchUrls = async () => {
      try {
        const data = await URLService.getAll();
        setUrlHistory(
          data.map((item) => ({
            original: item.originalURL,
            short: item.shortURL,
            date: new Date(item.createdAt).toLocaleDateString(),
          }))
        );
      } catch (error) {
        console.error("History load failed", error);
      }
    };

    fetchUrls();
  }, []);

  // 🔹 Submit handler (API call)
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!originalUrl.trim()) {
      alert("URL দিন");
      return;
    }

    try {
      setLoading(true);

      const data = await URLService.createShort(originalUrl);

      setShortUrl(data.shortURL);

      setUrlHistory((prev) => [
        {
          original: data.originalURL,
          short: data.shortURL,
          date: new Date(data.createdAt).toLocaleDateString(),
        },
        ...prev,
      ]);

      setOriginalUrl("");
    } catch (error) {
      alert("URL shorten করা যায়নি");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Copy short URL
  const handleCopy = () => {
    navigator.clipboard.writeText(shortUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="container mx-auto px-4 py-8 max-w-5xl">
        <section className="bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-2xl font-bold mb-4">URL Shortener</h2>

          <ShortenerForm
            originalUrl={originalUrl}
            setOriginalUrl={setOriginalUrl}
            onSubmit={handleSubmit}
            loading={loading}
          />

          <ShortenerResult
            shortUrl={shortUrl}
            copied={copied}
            onCopy={handleCopy}
          />

          <UrlHistory
            urlHistory={urlHistory}
            onCopyHistory={(url) => navigator.clipboard.writeText(url)}
          />
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Home;
