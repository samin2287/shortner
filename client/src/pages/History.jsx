import React, { useEffect, useState } from "react";
import { URLService } from "../api";
import UrlHistory from "../components/shortener/UrlHistory";
import { useSelector } from "react-redux";

const History = () => {
  const { user } = useSelector((state) => state.userData);
  const [urlHistory, setUrlHistory] = useState([]);

  useEffect(() => {
    const fetch = async () => {
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
        console.error(error);
      }
    };

    if (user) fetch();
  }, [user]);

  return (
    <div className="container mx-auto py-8">
      <h2 className="text-2xl font-semibold mb-4">Your Shortened URLs</h2>
      {!user ? (
        <p>Please log in to view your history.</p>
      ) : (
        <UrlHistory urlHistory={urlHistory} onCopyHistory={(u) => navigator.clipboard.writeText(u)} />
      )}
    </div>
  );
};

export default History;
