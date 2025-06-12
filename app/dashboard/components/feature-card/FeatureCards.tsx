
"use client";

type FeatureCard = {
  logo: string;
  heading: string;
  description: string;
};

type FeatureCardsProps = {
  cards: FeatureCard[];
};

export default function FeatureCards({ cards }: FeatureCardsProps) {
  return (
    <section className=" py-16 px-4 bg-background text-foreground ">
      
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {cards.map((card, index) => (
          <div
            key={index}
            className="bg-gray-100 dark:bg-gray-900 rounded-xl p-6 shadow-md hover:shadow-xl transition duration-300 transform hover:-translate-y-2 hover:scale-[1.02] border border-transparent hover:border-green-400"
          >
            <div className="mb-4 text-4xl">{card.logo}</div>
            <h3 className="font-bold text-lg mb-2">{card.heading}</h3>
            <p className="text-gray-600 dark:text-neutral-400 text-sm">
              {card.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
