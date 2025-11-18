// app/components/Projects.tsx
'use client'; 

import React, { useRef, useEffect } from 'react';
import { ProjectCard } from './ProjectCard'; // Import our new card
import { FollowerPointerCard } from '@/components/ui/following-pointer';

// Your two main projects
const projectData = [
  {
    title: "Unsplash ",
    description: "A Project Management tool which helps teams collaborate and stay organized.",
    staticImage: "/image.png", // Add a 16:9 image to /public/project-notepad.jpg
    hoverImage: "/timeline-1_5LZllUKN.gif", // Add a GIF to /public/project-notepad.gif
    href: "https://unsplash1.framer.website/", // Change this
  },
  {
    title: "Uber Clone",
    description: "A Cross Platform ride-sharing Mobile app that connects drivers with passengers in real-time.",
    staticImage: "/Screenshot 2025-11-04 151958.png", // Add a 16:9 image to /public/project-cloud.jpg
    hoverImage: "/Screen Recording 2025-06-19 190312 (online-video-cutter.com) (online-video-cutter.com).gif", // Add a GIF to /public/project-cloud.gif
    href: "https://github.com/praveenkotipalli/uberCloneReactNative", // Change this
  },
];

const Projects: React.FC = () => {
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
      id="projects" 
      ref={sectionRef} 
      style={{ backgroundColor: '#1A1A1A' }}
      className="py-24 px-10 text-white overflow-hidden"
    >
      <div className="flex flex-col md:gap-16">
        {/* ... (Title div) ... */}
        <div 
          ref={titleRef} 
          style={{ willChange: 'transform' }}
        > 
          <h2 className="text-6xl font- text-center md:text-left md:ml-20 mb-16" style={{ color: '#CFCFCF' }}>
            Projects
          </h2>
        </div>
        
        <div>
          {/* 1. We add 'justify-items-center' to the grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-4xl mx-auto justify-items-center">
            
            {projectData.map((project) => (
              
              <FollowerPointerCard
                key={project.title}
                // 2. We add max-w-xs HERE to constrain the wrapper
                // 'justify-self-center' is handled by the grid's 'justify-items-center'
                className="w-full max-w-xs" 
              >
                <ProjectCard
                  title={project.title}
                  description={project.description}
                  staticImage={project.staticImage}
                  hoverImage={project.hoverImage}
                  href={project.href}
                  onMouseEnter={() => {
                    document.body.classList.add("hide-pochita-cursor")
                    document.body.classList.add("hide-cursor-on-projects")
                  }}
                  onMouseLeave={() => {
                    document.body.classList.remove("hide-pochita-cursor")
                    document.body.classList.remove("hide-cursor-on-projects")
                  }}
                />
              </FollowerPointerCard>
              
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Projects;