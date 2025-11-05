'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import MarqueeText from './MarqueeText'; // Import your new component
import SpeechBubble from './SpeechBubble';

const Hero: React.FC = () => {
  const [showBubble, setShowBubble] = useState(false);
  return (
    // 1. CHANGED: Removed 'flex flex-col justify-center'
    //    We now use 'relative' to position children absolutely inside
    <section 
      className="h-screen sticky top-0 z-0
                 relative 
                  text-white overflow-hidden" // bg-black is needed
    >
      
      {/* 2. MARQUEE: Centered and put BEHIND the image (z-0) */}
      <div 
        className="absolute top-1/3 left-0 -translate-y-1/2 z-0 w-full"
        aria-hidden="true" // This is good for accessibility
      >
        <MarqueeText />
      </div>

      {/* 3. IMAGE: Centered and put IN FRONT (z-10) */}
      <div className="relative z-10 h-full flex justify-center items-center"
            
      >
        <Image
          src="/portf.avif" 
          alt="Portrait of Praveen Kotipalli"
          width={500} // This sets the 5:7 aspect ratio
          height={700} // This sets the 5:7 aspect ratio
          
          // 4. CHANGED: Made the image 80% of the screen height
          className="object-contain h-[106vh] w-auto mt-18" // Was max-h-[70vh]
          onMouseEnter={() => setShowBubble(true)}
            onMouseLeave={() => setShowBubble(false)}
          priority 
        />
        <SpeechBubble 
          text="Hello, welcome to my portfolio!" 
          
          isVisible={showBubble} 
        />
      </div>

      {/* BONUS WIDGETS: Added z-20 to ensure they are on top */}
      {/* <div className="absolute bottom-8 left-8 z-20 p-3 rounded-lg flex items-center gap-3
                      bg-gray-900/50 backdrop-blur-md border border-gray-700/50">
        <div className="w-12 h-12 bg-gray-700 rounded animate-pulse"></div>
        <div>
          <p className="font-semibold">Dancing With Your Ghost</p>
          <p className="text-sm text-gray-300">Sasha Alex Sloan</p>
        </div>
      </div> */}
      

      {/* <div className="absolute bottom-8 right-8 z-20 px-3 py-1.5 rounded-lg
                      bg-white/80 backdrop-blur-md text-black text-sm font-medium">
        Made in Framer
      </div> */}

    </section>
  );
}

export default Hero;