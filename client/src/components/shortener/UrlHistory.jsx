import React from "react";
import { Copy } from "lucide-react";
import Button from "../ui/Button";

// -------------------- URL History Component --------------------
const UrlHistory = ({ urlHistory, onCopyHistory }) => {
  if (!urlHistory || urlHistory.length === 0) return null;

  return (
    <div className="mt-8">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">
        Recently Shortened URLs
      </h3>
      <div className="space-y-3">
        {urlHistory.map((item, index) => (
          <div
            key={index}
            className="p-4 bg-gray-50 rounded-lg border border-gray-200">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
              <div className="flex-1 min-w-0">
                <p className="text-sm text-gray-500 truncate">
                  {item.original}
                </p>
                <p className="text-green-700 font-medium truncate">
                  {item.short}
                </p>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-sm text-gray-500">{item.date}</span>
                <Button
                  onClick={() => onCopyHistory(item.short)}
                  variant="secondary"
                  size="sm"
                  className="px-3 py-1.5 bg-white border border-gray-300 rounded-lg text-sm font-medium hover:bg-green-50 transition flex items-center gap-1">
                  <Copy className="w-4 h-4" />
                  Copy
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UrlHistory;
