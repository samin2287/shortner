import React from "react";
import { Zap, BarChart, Shield } from "lucide-react";

// -------------------- Features Section --------------------
const Features = () => {
  const features = [
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Instant Shortening",
      description:
        "Get your shortened URL in milliseconds with our lightning-fast processing.",
    },
    {
      icon: <BarChart className="w-6 h-6" />,
      title: "Click Analytics",
      description:
        "Track how many clicks your shortened URLs receive with detailed analytics.",
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Secure & Reliable",
      description:
        "All URLs are checked for security and malware before shortening.",
    },
  ];

  return (
    <section className="mb-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
        Why Use ShortURL?
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {features.map((feature, index) => (
          <div
            key={index}
            className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
            <div className="p-3 bg-green-100 text-green-600 rounded-lg w-fit mb-4">
              {feature.icon}
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              {feature.title}
            </h3>
            <p className="text-gray-600">{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Features;
