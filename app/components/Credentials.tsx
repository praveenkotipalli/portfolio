// app/components/Credentials.tsx
'use client'; 

// 1. Import the hooks we need
import React, { useState, useEffect, useRef } from 'react';
import { useInView } from "framer-motion"; // 2. Import useInView
import { Highlighter } from '@/components/ui/highlighter';
import { ScrollVelocityContainer, ScrollVelocityRow } from '@/components/ui/scroll-based-velocity';

// Your Experience Data
const workExperience = [
  {
    role: "Full Stack Developer Intern",
    company: "GARP Technologies Pty Ltd",
    duration: "Aug 2025 – Present",
  },
];

// Your Certification Data
const certifications = [
  "Salesforce Platform Developer I",
  "Salesforce AI Associate",
  "RedHat Enterprise Application Developer", // Placeholder
  "Github Foundations",     // Placeholder
  "Postman API Expert"
];

const Credentials: React.FC = () => {
  // 3. Create a state to control the animation
  const [startAnimation, setStartAnimation] = useState(false);
  
  // 4. Create a ref for the title
  const titleRef = useRef(null);
  
  // 5. Set up the inView hook
  // It will only trigger once
  const isInView = useInView(titleRef, { once: true });

  // 6. Use useEffect to start the timer
  useEffect(() => {
    // When isInView becomes true
    if (isInView) {
      // Start a 2-second timer
      const timer = setTimeout(() => {
        // After 2 seconds, set startAnimation to true
        setStartAnimation(true);
      }, 2000); // 2000ms = 2 seconds
      
      // Clean up the timer if the component unmounts
      return () => clearTimeout(timer);
    }
  }, [isInView]); // This effect runs when 'isInView' changes

  return (
    <section 
      id="credentials" 
      style={{ backgroundColor: '#CFCFCF' }} // Using your light color
      className="py-24 px-10 text-black rounded-tl-2xl rounded-tr-2xl"
    >
      <div className="text-center">
        {/* 7. Attach the ref to the h2 tag */}
        <h2 ref={titleRef} className="mb-20 text-4xl md:text-6xl font-semibold leading-relaxed">
          My{" "}
          {/* 8. Conditionally render the highlighter */}
          {startAnimation ? (
            <Highlighter  action="underline" color="#87CEFA">
              Credentials
            </Highlighter>
          ) : (
            "Credentials"
          )}
        </h2>
      </div>

      {/* Two-Column Layout */}
      <div className="flex flex-col md:flex-row md:gap-16 max-w-6xl mx-auto">

        {/* --- LEFT COLUMN (Work Experience) --- */}
        <div className="md:w-1/2">
          {/* --- THIS IS THE CHANGE --- */}
          <h3 className="text-4xl font-semibold mb-8">
            {startAnimation ? (
              <Highlighter action="highlight" color="#FF9800">
                Experience
              </Highlighter>
            ) : (
              "Experience"
            )}
          </h3>
          {workExperience.map((job) => (
            <div key={job.company} className="mb-6">
              <h4 className="text-2xl font-semibold">{job.role}</h4>
              <p className="text-xl text-gray-700">{job.company}</p>
              <p className="text-lg text-gray-600">{job.duration}</p>
            </div>
          ))}
        </div>

        {/* --- RIGHT COLUMN (Certifications) --- */}
        <div className="md:w-1/2 mt-16 md:mt-0">
          {/* --- THIS IS THE CHANGE --- */}
          <h3 className="text-4xl font-semibold mb-8">
            {startAnimation ? (
              <Highlighter action="highlight" color="#FF9800">
                Certifications
              </Highlighter>
            ) : (
              "Certifications"
            )}
          </h3>
          
          <div className="relative flex w-full flex-col items-center justify-center overflow-hidden">
            <ScrollVelocityContainer className="text-2xl font-semibold">
              <ScrollVelocityRow baseVelocity={5} direction={1}>
                {certifications.map((cert) => (
                  <span key={cert} className="mx-4 p-4 border-b border-t border-gray-400">
                    {cert}
                  </span>
                ))}
              </ScrollVelocityRow>
            </ScrollVelocityContainer>
            <div className="from-[#CFCFCF] pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r"></div>
            <div className="from-[#CFCFCF] pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l"></div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Credentials;