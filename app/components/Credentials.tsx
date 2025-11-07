// app/components/Credentials.tsx
'use client'; 

import React, { useState, useEffect, useRef } from 'react';
import { useInView } from "framer-motion"; 
import { Highlighter } from '@/components/ui/highlighter';
import { CertificateFolder, CertificateItem } from './CertificateFolder'; // Make sure CertificateItem is exported


const workExperience = [
  {
    role: "Full Stack Developer Intern",
    company: "GARP Technologies Pty Ltd",
    duration: "Aug 2025 – Present",
  },
];


const certifications = [
  "cert1card.avif",
  "cert2card.avif",
  "cert3card.avif",
  "cert4card.avif",
];


const skillSet = [
  "Java", "React", "Next.js", "Node.js", "Spring Boot", "Salesforce", "Docker",
  "JavaScript", "TypeScript", "MongoDB", "SQL", "Firebase", "Git", "React Native"
];

const Credentials: React.FC = () => {
  const [startAnimation, setStartAnimation] = useState(false);
  const titleRef = useRef(null);
  const isInView = useInView(titleRef, { once: true });

  useEffect(() => {
    if (isInView) {
      const timer = setTimeout(() => {
        setStartAnimation(true);
      }, 2000); 
      return () => clearTimeout(timer);
    }
  }, [isInView]); 


  const handleMouseEnter = () => {
    document.body.classList.add('smooth-cursor-active');
  };
  
  const handleMouseLeave = () => {
    document.body.classList.remove('smooth-cursor-active');
  };

  return (
    <section 
      id="credentials" 
      style={{ backgroundColor: '#CFCFCF' }} 
      className="py-24 px-10 text-black rounded-tl-2xl rounded-tr-2xl"
      
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      
      <div className="text-center">
        <h2 ref={titleRef} className="mb-20 text-4xl md:text-6xl font-semibold leading-relaxed">
          My{" "}
          {startAnimation ? (
            <Highlighter  action="underline" color="#87CEFA">
              Credentials
            </Highlighter>
          ) : (
            "Credentials"
          )}
        </h2>
      </div>

      
      <div className="w-full max-w-4xl mx-auto mb-24">
        {/* <h3 className="text-4xl font-semibold mb-8 text-center md:text-left">
          {startAnimation ? (
            <Highlighter action="highlight" color="#FF9800">
              Certifications
            </Highlighter>
          ) : (
            "Certifications"
          )}
        </h3> */}
        
        <CertificateFolder certs={certifications} />
      </div>

      <div className="flex flex-col md:flex-row md:gap-16 max-w-6xl mx-auto">

       
        <div className="md:w-1/2">
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

       
        <div className="md:w-1/2 mt-16 md:mt-0">
          <h3 className="text-4xl font-semibold mb-8">
            {startAnimation ? (
              <Highlighter action="highlight" color="#FF9800">
                My Toolkit
              </Highlighter>
            ) : (
              "My Toolkit"
            )}
          </h3>

          <div className="flex flex-wrap gap-3">
            {skillSet.map((skill, index) => (
              <span 
                key={skill} 
                className={`
                  p-3 rounded-lg font-semibold shadow-md
                  ${index % 3 === 0 ? 'bg-gray-700 text-white' : 'bg-gray-200 text-black'}
                `}
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Credentials;