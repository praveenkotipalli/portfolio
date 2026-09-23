import React from 'react';

const MarqueeText: React.FC = () => {
  return (
    <div className="flex overflow-hidden whitespace-nowrap select-none"
    style={{ color: '#CFCFCF' }}>
      
      <div className="animate-marquee flex-shrink-0">
        <span
          // Smaller on phones so the name still reads as a band, not a single letter
          className="text-[7.5rem] md:text-[12rem] mx-6 md:mx-8 font-kaldera"
        >
          PRAVEEN KOTIPALLI     ‎
        </span>
        <span
          className="text-[7.5rem] md:text-[12rem] mx-6 md:mx-8 font-kaldera"
        >
          PRAVEEN KOTIPALLI     ‎
        </span>
      </div>

      <div className="animate-marquee flex-shrink-0" aria-hidden="true">
        <span
          className="text-[7.5rem] md:text-[12rem] mx-6 md:mx-8 font-kaldera"
        >
          PRAVEEN KOTIPALLI     ‎
        </span>
        <span
          className="text-[7.5rem] md:text-[12rem] mx-6 md:mx-8 font-kaldera"
        >
          PRAVEEN KOTIPALLI     ‎ 
        </span>
      </div>
    </div>
  );
}

export default MarqueeText;