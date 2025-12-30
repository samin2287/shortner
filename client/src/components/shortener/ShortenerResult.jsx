import React from "react";
import { Copy, Check } from "lucide-react";
import Button from "../ui/Button";
// -------------------- Shortener Result Component --------------------
const ShortenerResult = ({ shortUrl, originalUrl, copied, onCopy }) => {
  if (!shortUrl) return null;

  return (
    <div className="mt-8 p-6 bg-linear-to-r from-green-50 to-emerald-50 rounded-xl border border-green-100 animate-fadeIn">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">
        Your Short URL is Ready!
      </h3>

      <div className="space-y-4">
        <div>
          <p className="text-sm font-medium text-gray-600 mb-2">Original URL</p>
          <div className="p-3 bg-white rounded-lg border border-gray-200 overflow-x-auto">
            <p className="text-gray-700 break-all">{originalUrl}</p>
          </div>
        </div>

        <div>
          <p className="text-sm font-medium text-gray-600 mb-2">Short URL</p>
          <div className="flex flex-col md:flex-row gap-3 items-start md:items-center">
            <div className="grow p-3 bg-white rounded-lg border border-gray-200 overflow-x-auto">
              <p className="text-green-700 font-medium break-all">{shortUrl}</p>
            </div>

            <Button
              onClick={onCopy}
              variant={copied ? "green" : "secondary"}
              size="md"
              className={`px-5 py-3 flex items-center gap-2 ${
                copied
                  ? "bg-green-100 text-green-700 border border-green-200"
                  : "bg-white text-green-700 hover:bg-green-50"
              }`}>
              {copied ? (
                <>
                  <Check className="w-5 h-5" />
                  Copied!
                </>
              ) : (
                <>
                  <Copy className="w-5 h-5" />
                  Copy URL
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShortenerResult;
