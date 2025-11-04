// app/components/About.tsx
'use client'; 

import { TextReveal } from '@/components/ui/text-reveal';
import React, { useRef, useEffect } from 'react';

const About: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  // 1. Renamed 'contentRef' to 'titleRef' for clarity
  const titleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    
    const handleScroll = () => {
      // 2. Check 'titleRef' instead of 'contentRef'
      if (titleRef.current && sectionRef.current) {
        
        const rect = sectionRef.current.getBoundingClientRect();
        const top = rect.top;
        const viewportHeight = window.innerHeight;

        if (top < viewportHeight && top > -rect.height) {
          const centerOffset = (rect.top + rect.height / 2) - (viewportHeight / 2);
          const parallaxSpeed = 0.1;
          const translateAmount = -centerOffset * parallaxSpeed;
          
          // 3. Apply the transform only to the title's div
          titleRef.current.style.transform = `translateY(${translateAmount}px)`;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []); // The dependency array is correct

  return (
    <section 
      id="about" 
      ref={sectionRef} 
      style={{ backgroundColor: '#CFCFCF' }}
      className="py-24 px-10 text-black rounded-tl-2xl rounded-tr-2xl overflow-hidden"
    >
      {/* 4. The main content <div> no longer has a ref or style */}
      <div 
        className="flex flex-col md:flex-row md:gap-16"
      >
        {/* Left Column (Title) */}
        {/* 5. The ref and style are now applied ONLY to this div */}
        <div 
          className="md:w-1/3"
          ref={titleRef} 
          style={{ willChange: 'transform' }}
        > 
          <h2 className="text-6xl font ml-20 mb-4 md:mb-0">About Me</h2>
        </div>
        
        {/* Right Column (Paragraph) */}
        {/* This div is now static and will scroll normally */}
        <div className="md:w-2/3"> 
          <TextReveal className="text-2xl max-w-3xl"> 
            I’m driven by the 'what if?' What if this app could be smarter? What if this system could be more efficient? What if this user experience could be truly seamless?
             
            That curiosity is my main tool as a developer. I thrive on the challenge of untangling a complex problem and turning it into clean, scalable code. My playground is the full stack, from building resilient systems with Spring Boot to crafting dynamic UIs in React. As a final-year B.Tech student, I’m not just looking for a job; I’m looking for the next puzzle to solve.
          </TextReveal>
        </div>
      </div>
    </section>
  );
}

export default About;