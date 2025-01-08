import {} from 'react';

const Marquee = () => {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-primary/80 overflow-hidden py-3 z-50">
      <div className="animate-marquee whitespace-nowrap">
        <span className="mx-4 text-white font-semibold">🌍 Explore the world with TourIt</span>
        <span className="mx-4 text-white font-semibold">✈️ Plan your next adventure</span>
        <span className="mx-4 text-white font-semibold">🏖️ Discover amazing destinations</span>
        <span className="mx-4 text-white font-semibold">🎒 Travel smart, travel safe</span>
        <span className="mx-4 text-white font-semibold">🌟 Create unforgettable memories</span>
      </div>
    </div>
  );
};

export default Marquee; 