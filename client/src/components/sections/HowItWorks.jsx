import React from "react";
import { Zap } from "lucide-react";

// -------------------- How It Works Section --------------------
const HowItWorks = () => {
  const howItWorks = [
    {
      step: "1",
      title: "Paste Your URL",
      description:
        "Enter your long URL in the input field above. Make sure it starts with http:// or https://",
    },
    {
      step: "2",
      title: "Generate Short Link",
      description:
        "Click the 'Shorten URL' button. Our system will create a unique, shortened version of your URL.",
    },
    {
      step: "3",
      title: "Share & Track",
      description:
        "Copy your new short URL and share it anywhere. Track clicks and analytics in your dashboard.",
    },
  ];

  return (
    <section className="bg-gradient-to-r from-emerald-50 to-green-50 rounded-2xl shadow-xl p-8">
      <div className="flex items-center gap-3 mb-8">
        <div className="p-2 bg-white rounded-lg shadow">
          <Zap className="w-6 h-6 text-green-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-800">How ShortURL Works</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {howItWorks.map((step, index) => (
          <div key={index} className="relative">
            <div className="absolute -top-4 -left-4 w-10 h-10 bg-gradient-to-r from-emerald-500 to-green-500 text-white rounded-full flex items-center justify-center font-bold text-lg shadow-lg">
              {step.step}
            </div>
            <div className="bg-white p-6 rounded-xl shadow border border-gray-100 h-full pt-8">
              <h3 className="text-xl font-semibold text-gray-800 mb-3">
                {step.title}
              </h3>
              <p className="text-gray-600">{step.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HowItWorks;
