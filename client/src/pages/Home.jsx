import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import ShortenerForm from "../components/shortener/ShortenerForm";
import ShortenerResult from "../components/shortener/ShortenerResult";
import UrlHistory from "../components/shortener/UrlHistory";

import { URLService } from "../api";

const Home = () => {
  const { user } = useSelector((state) => state.userData);
  const [originalUrl, setOriginalUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [resultOriginal, setResultOriginal] = useState("");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [urlHistory, setUrlHistory] = useState([]);

  // small client-side generator for unauthenticated users
  const generateShortUrl = () => {
    const chars =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let res = "";
    for (let i = 0; i < 6; i++) res += chars.charAt(Math.floor(Math.random() * chars.length));
    return `${window.location.origin}/${res}`;
  };

  // 🔹 Load URL history from backend (only meaningful when authenticated)
  useEffect(() => {
    const fetchUrls = async () => {
      try {
        const data = await URLService.getAll();
        if (data?.userURLs) {
          setUrlHistory(
            data.userURLs.map((item) => ({
              original: item.originalURL,
              short: item.shortURL,
              date: new Date(item.createdAt).toLocaleDateString(),
            }))
          );
        }
      } catch (error) {
        // likely unauthenticated or server error — keep history empty
        setUrlHistory([]);
      }
    };

    if (user) fetchUrls();
  }, [user]);

  // 🔹 Submit handler (API call)
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!originalUrl.trim()) {
      alert("URL দিন");
      return;
    }

    // Always send to server — server accepts unauthenticated creates (no user attached)
    try {
      setLoading(true);
      const data = await URLService.createShort(originalUrl);

      setResultOriginal(originalUrl);
      setShortUrl(data.shortURL);

      // if server returned created entry, prepend to history for logged-in users
      if (data?.originalURL) {
        setUrlHistory((prev) => [
          {
            original: data.originalURL,
            short: data.shortURL,
            date: new Date(data.createdAt).toLocaleDateString(),
          },
          ...prev,
        ]);
      }

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
    // copy full redirect URL when shortUrl is id-like
    let toCopy = shortUrl;
    try {
      new URL(shortUrl);
    } catch (e) {
      const apiBase = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000";
      toCopy = `${apiBase}/${shortUrl.replace(/^\//, "")}`;
    }
    navigator.clipboard.writeText(toCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // 🔹 Reset form and result
  const handleReset = () => {
    setOriginalUrl("");
    setShortUrl("");
    setCopied(false);
    setResultOriginal("");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="container mx-auto px-4 py-8 max-w-5xl">
        <section className="bg-white p-6 rounded-xl shadow-md mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
            <div>
              <h2 className="text-2xl font-bold">URL Shortener</h2>
              <p className="mt-1 text-sm text-gray-500">
                Shorten a link and see your history from the server.
              </p>
            </div>
            {user && (
              <div className="rounded-2xl bg-emerald-50 p-4 border border-emerald-100">
                <p className="text-sm text-gray-600">Signed in as</p>
                <p className="font-semibold text-gray-900">{user.fullName || user.email}</p>
                <p className="text-sm text-gray-500">{user.email}</p>
              </div>
            )}
          </div>

          <ShortenerForm
            originalUrl={originalUrl}
            setOriginalUrl={setOriginalUrl}
            onSubmit={handleSubmit}
            loading={loading}
            onReset={handleReset}
          />

          <ShortenerResult
            shortUrl={shortUrl}
            originalUrl={resultOriginal}
            copied={copied}
            onCopy={handleCopy}
          />
        </section>

        <section className="bg-white p-6 rounded-xl shadow-md">
          <h3 className="text-xl font-semibold mb-4">Your shortened URLs</h3>
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
