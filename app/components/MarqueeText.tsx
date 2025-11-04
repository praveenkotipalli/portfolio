import React from 'react';

const MarqueeText: React.FC = () => {
  return (
    <div className="flex overflow-hidden whitespace-nowrap select-none">
      
      <div className="animate-marquee flex-shrink-0">
        <span 
          // CHANGED from text-8xl to text-9xl
          className="text-[12rem] mx-8 font-kaldera" 
        >
          PRAVEEN KOTIPALLI     ‎ 
        </span>
        <span 
          // CHANGED from text-8xl to text-9xl
          className="text-[12rem] mx-8 font-kaldera" 
        >
          PRAVEEN KOTIPALLI     ‎ 
        </span>
      </div>

      <div className="animate-marquee flex-shrink-0" aria-hidden="true">
        <span 
          // CHANGED from text-8xl to text-9xl
          className="text-[12rem] mx-8 font-kaldera" 
        >
          PRAVEEN KOTIPALLI     ‎ 
        </span>
        <span 
          // CHANGED from text-8xl to text-9xl
          className="text-[12rem] mx-8 font-kaldera" 
        >
          PRAVEEN KOTIPALLI     ‎ 
        </span>
      </div>
    </div>
  );
}

export default MarqueeText;