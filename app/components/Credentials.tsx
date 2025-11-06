// app/components/Credentials.tsx
'use client'; 

import React, { useState, useEffect, useRef } from 'react';
import { useInView } from "framer-motion"; 
import { Highlighter } from '@/components/ui/highlighter';
// 1. Import our new CertificateFolder
import { CertificateFolder } from './CertificateFolder';

// Your Experience Data (Unchanged)
const workExperience = [
  {
    role: "Full Stack Developer Intern",
    company: "GARP Technologies Pty Ltd",
    duration: "Aug 2025 – Present",
  },
];

// 2. UPDATED certification data to be a list of image paths
const certifications = [
  "cert1card.avif",
  "cert2card.avif",
  "cert3card.avif",
  "cert4card.avif",
];

// Your Skill Set Data (Unchanged)
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

  return (
    <section 
      id="credentials" 
      style={{ backgroundColor: '#CFCFCF' }} 
      className="py-24 px-10 text-black rounded-tl-2xl rounded-tr-2xl"
    >
      {/* Title (Unchanged) */}
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

      <div className="flex flex-col md:flex-row md:gap-16 max-w-6xl mx-auto">

        {/* --- LEFT COLUMN (Work Experience) --- Unchanged */}
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

        {/* --- 3. RIGHT COLUMN (Certifications) --- REPLACED */}
        <div className="md:w-1/2 mt-16 md:mt-0">
          <h3 className="text-4xl font-semibold mb-8">
            {startAnimation ? (
              <Highlighter action="highlight" color="#FF9800">
                Certifications
              </Highlighter>
            ) : (
              "Certifications"
            )}
          </h3>
          
          {/* Replace the old list with our new component */}
          <CertificateFolder certs={certifications} />
        </div>
      </div>

      {/* --- "MY TOOLKIT" SECTION --- Unchanged */}
      <div className="max-w-6xl mx-auto mt-24">
        <h3 className="text-4xl font-semibold mb-12 text-center md:text-left">
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
    </section>
  );
}

export default Credentials;