import React from "react";

const plans = [
  {
    title: "Free",
    subtitle: "Try NeuroNote",
    price: "$0",
    buttonText: "Stay on Free plan",
    features: [
      "Chat with NeuroNote AI",
      "Create and edit notes",
      "Analyze text and images",
      "Basic export options"
    ],
    border: "border-gray-300",
  },
  {
    title: "Pro",
    subtitle: "For everyday productivity",
    price: "$17",
    note: "/ month billed annually",
    buttonText: "Get Pro plan",
    features: [
      "Everything in Free, plus:",
      "More usage",
      "Access note templates",
      "Collaboration tools",
      "Smart organization features"
    ],
    border: "border-gray-400",
  },
  {
    title: "Max",
    subtitle: "Advanced AI + Productivity",
    price: "From $100",
    note: "/ month billed monthly",
    buttonText: "Get Max plan",
    features: [
      "Everything in Pro, plus:",
      "20x more AI usage",
      "Priority access to NeuroNote features",
      "Premium support",
      "Custom AI workflows"
    ],
    border: "border-gray-400",
  },
];

export default function Pricing() {
  return (
    <div className="bg-white dark:bg-neutral-950 py-16 px-4 sm:px-6 lg:px-8">
      <h2 className="text-4xl font-bold text-center mb-10 dark:text-white">
        Plans that grow with you
      </h2>
      <div className="grid gap-6 md:grid-cols-3 max-w-6xl mx-auto">
        {plans.map((plan, index) => (
          <div
            key={index}
            className={`rounded-xl border p-6 shadow-sm flex flex-col justify-between ${plan.border}`}
          >
            <div>
              <h3 className="text-xl font-semibold mb-1 dark:text-white">{plan.title}</h3>
              <p className="text-gray-500 dark:text-gray-300 mb-4">{plan.subtitle}</p>
              <p className="text-3xl font-bold mb-1 dark:text-white">{plan.price}</p>
              {plan.note && <p className="text-sm text-gray-400 mb-4">{plan.note}</p>}
              <ul className="text-gray-700 dark:text-gray-200 space-y-2 mb-6">
                {plan.features.map((feature, i) => (
                  <li key={i}>✓ {feature}</li>
                ))}
              </ul>
            </div>
            <button className="mt-auto bg-black text-white py-2 px-4 rounded hover:opacity-90">
              {plan.buttonText}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}