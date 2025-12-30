import React from "react";
import { Zap } from "lucide-react";
import Button from "../ui/Button";
// -------------------- Shortener Form Component --------------------
const ShortenerForm = ({
  originalUrl,
  setOriginalUrl,
  onSubmit,
  loading,
  onReset,
}) => {
  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <div>
        <label
          htmlFor="url"
          className="block text-sm font-medium text-gray-700 mb-2">
          Enter your long URL
        </label>
        <div className="flex flex-col md:flex-row gap-4">
          <input
            type="url"
            id="url"
            value={originalUrl}
            onChange={(e) => setOriginalUrl(e.target.value)}
            placeholder="Input your long URL here..."
            className="grow px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition"
            required
          />

          <div className="flex gap-3">
            <Button
              type="submit"
              disabled={loading}
              variant="green"
              size="lg"
              className="flex items-center gap-2">
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Processing...
                </>
              ) : (
                <>
                  <Zap className="w-5 h-5" />
                  Shorten URL
                </>
              )}
            </Button>

            <Button
              type="button"
              onClick={onReset}
              variant="secondary"
              size="md"
              className="px-6 py-3">
              Reset
            </Button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default ShortenerForm;
