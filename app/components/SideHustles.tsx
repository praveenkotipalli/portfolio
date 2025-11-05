// app/components/SideHustles.tsx
'use client'; 

import React, { useRef, useEffect } from 'react';
// 1. Import the Tooltip component you wanted
import { Tooltip } from "@/components/ui/tooltip-card";
// 2. Import the new card we just made
import ProjectTooltipCard from "./ProjectTooltipCard";
import { desc } from 'framer-motion/client';

// 3. Updated the data to include images and descriptions
const sideProjects = [
  { 
    title: "Notpad (AI Powered Note-Taking App)", 
    href: "https://notpad.me/",
    description: "Built a React and Firebase-based web app that converts speech and YouTube videos into clean, AI-corrected notes using Gemini AI for real-time transcription, grammar correction, and cloud syncing.",
    imageUrl: "/Screenshot 2025-11-05 160021.png" // Add to /public/spotify-thumb.jpg
  },
  { 
    title: "Hirely - AI Interview Prep App with Voice Agent", 
    href: "#",
    description: "Built a React-Firebase app integrating Vapi for real-time voice interaction and Gemini AI for intelligent question generation and performance evaluation, creating a realistic AI-powered interview experience.",
    imageUrl: "/Screenshot 2025-11-05 162347.png" // Add to /public/robot-thumb.jpg
  },
  { 
    title: "Personal Portfolio (This Site)", 
    href: "#",
    description: "The very site you're on, you're looking at it! My digital sandbox, built from scratch with Next.js, Tailwind, and a lot of custom (and sometimes stubborn) animations.",
    imageUrl: "/Screenshot 2025-11-05 163802.png" // Add to /public/portfolio-thumb.jpg
  },
  {
    title: "TitanVerse – Attack on Titan Showcase",
    href: "https://praveeninctest.framer.website/",
    description: "Designed an interactive Framer experience showcasing Attack on Titan characters using advanced scroll animations and motion design to demonstrate UI/UX creativity and visual storytelling.",
    imageUrl: "/Screenshot 2025-11-05 163252.png" // Add to /public/spotify-thumb.jpg
  },
  { 
    title: "More on GitHub...", 
    href: "https://github.com/praveenkotipalli",
    description: "See all my other projects, experiments, and contributions.",
    imageUrl: "/Screenshot 2025-11-05 163942.png" // Add to /public/github-thumb.jpg
  },
];

const SideHustles: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);

  // Parallax effect for the title (unchanged)
  useEffect(() => {
    const handleScroll = () => {
      if (titleRef.current && sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        const top = rect.top;
        const viewportHeight = window.innerHeight;

        if (top < viewportHeight && top > -rect.height) {
          const centerOffset = (rect.top + rect.height / 2) - (viewportHeight / 2);
          const parallaxSpeed = 0.1;
          const translateAmount = -centerOffset * parallaxSpeed;
          titleRef.current.style.transform = `translateY(${translateAmount}px)`;
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section 
      id="side-hustles" 
      ref={sectionRef} 
      style={{ backgroundColor: '#111111', color: '#CFCFCF' }} 
      className="py-24 px-10 text-white rounded-tl-2xl rounded-tr-2xl"
      
    >
      <div className="flex flex-col md:flex-row md:gap-16">
        {/* Left Column (Title) - Unchanged */}
        <div 
          className="md:w-1/3"
          ref={titleRef} 
          style={{ willChange: 'transform' }}
        > 
          <h2 className="text-6xl font- ml-20 mb-16 md:mb-0" >
            Code & Curiosities
          </h2>
        </div>
        
        {/* --- UPDATED Right Column (Project List) --- */}
        <div className="md:w-2/3">
          {/* This div is the "box" with no left/right borders */}
          <div className="flex flex-col" >
            {sideProjects.map((project, index) => (
              // 4. Use the Aceternity Tooltip component
              <Tooltip
              
                key={project.title}
                // 5. Pass our custom card as the 'content'
                content={
                  <ProjectTooltipCard
                    title={project.title}
                    description={project.description}
                    imageUrl={project.imageUrl}
                    
                  />
                }
              >
                {/* 6. This is the trigger element */}
                <a 
                  href={project.href}
                  target="_blank"
                  className={`
                    block py-6 border-b border-gray-700
                    ${index === 0 ? 'border-t' : ''} 
                    hover:bg-gray-800 transition-colors duration-200
                    text-lg text-gray-400 hover:text-white
                  `}
                  style={{ color: '#CFCFCF' }}
                  
                >
                 {project.title}
                </a>
              </Tooltip>
            ))}
          </div>
        </div>
        {/* --- END OF UPDATED COLUMN --- */}

      </div>
    </section>
  );
}

export default SideHustles;