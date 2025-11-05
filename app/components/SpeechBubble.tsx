// app/components/SpeechBubble.tsx
import React from 'react';

interface SpeechBubbleProps {
  text: string;
  isVisible: boolean;
}

const SpeechBubble: React.FC<SpeechBubbleProps> = ({ text, isVisible }) => {
  return (
    // The main container for the bubble
    <div
    style={{ backgroundColor: '#CFCFCF' }}
      className={`
        absolute z-20 // Above image, below cursor
        
        top-1/2 // Stays the same
        left-[70%] // Stays the same
        -translate-y-1/2 transform translate-y-20 // Stays the same
        
        bg-white text-black p-3 rounded-lg // Basic bubble styling
        shadow-lg border border-black // The border is now black
        whitespace-nowrap // Prevent text from wrapping
        
        // Fade in/out transition
        transition-all duration-300 ease-in-out
        ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-90 pointer-events-none'}
      `}
    >
      <p className="text-sm font-semibold">{text}</p>
      
      {/* The "tail" of the speech bubble, pointing LEFT */}
      <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2
                      w-0 h-0
                      border-t-8 border-t-transparent
                      border-b-8 border-b-transparent
                      border-r-8 border-r-white"></div>
    </div>
  );
};

export default SpeechBubble;