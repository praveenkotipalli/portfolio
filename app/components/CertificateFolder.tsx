// app/components/CertificateFolder.tsx
'use client';
import Image from 'next/image';
import React from 'react';

// This interface is for your *Credentials.tsx* file.
export interface CertificateItem {
  imageSrc: string; // e.g., "cert1card.avif"
}

// Helper component for the fanning-out certificate cards
const CertCard: React.FC<{ src: string, animationClasses: string }> = ({ src, animationClasses }) => {
  return (
    <div
      className={`
        absolute bottom-10 left-1/2 -ml-[100px] w-[200px] h-[126px] // Set card size
        transform transition-all duration-500 ease-out
        opacity-0 -translate-y-0 scale-90
        z-0 /* Placed behind the folder */
        ${animationClasses}
      `}
    >
      <Image src={`/${src}`} alt="Certificate" layout="fill" objectFit="cover" className="rounded-lg" />
    </div>
  );
};


// Main component
interface CertificateFolderProps {
  certs: string[]; // Array of image paths like "cert1card.avif"
}

export const CertificateFolder: React.FC<CertificateFolderProps> = ({ certs }) => {
  const cardData = certs.slice(0, 4); // Only show the first 4

  // Define the animation classes for each card
  const animations = [
    // Card 1 (Back-left)
    "group-hover:opacity-100 group-hover:-translate-y-48 group-hover:-translate-x-40 group-hover:-rotate-12 group-hover:scale-100 delay-100",
    // Card 2 (Front-left)
    "group-hover:opacity-100 group-hover:-translate-y-32 group-hover:-translate-x-12 group-hover:-rotate-6 group-hover:scale-100 delay-200",
    // Card 3 (Front-right)
    "group-hover:opacity-100 group-hover:-translate-y-32 group-hover:translate-x-12 group-hover:rotate-6 group-hover:scale-100 delay-300",
    // Card 4 (Back-right)
    "group-hover:opacity-100 group-hover:-translate-y-48 group-hover:translate-x-40 group-hover:rotate-12 group-hover:scale-100 delay-400",
  ];

  return (
    <div 
      className="relative w-full h-64 flex items-center justify-center group"
    >
      <div className="relative w-48 h-48">

        {/* Layer 1: The Folder Back (STATIC) */}
        <div 
          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-48 h-48 z-10"
        >
          <Image
            src="/backoffolder.avif"
            alt="Folder Back"
            layout="fill"
            objectFit="contain"
            className="object-bottom" // Aligns image to bottom
          />
        </div>

        {/* Layer 2: The Certificate Cards (animated) */}
        {cardData.map((src, index) => (
          <CertCard 
            key={index} 
            src={src} 
            animationClasses={animations[index % animations.length]} 
          />
        ))}
        
        {/* --- THIS IS THE FIX --- */}
        {/* Layer 3: The Blank Card (squeezes with front) */}
        <div 
          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-48 h-48 z-30
                     transition-all duration-500 ease-out 
                     group-hover:h-28" // <-- ANIMATE HEIGHT
        >
          <Image
            src="/blankcard.avif"
            alt="Blank Card"
            layout="fill"
            objectFit="contain"
            className="object-bottom" // Aligns image to bottom
          />
        </div>
        
        {/* Layer 4: The Folder Front (squeezes with front) */}
        <div 
          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-48 h-48 z-40
                     cursor-pointer
                     transition-all duration-500 ease-out 
                     group-hover:h-28" // <-- ANIMATE HEIGHT
        >
          <Image
            src="/frontoffolder.avif"
            alt="Folder Front"
            layout="fill"
            objectFit="contain"
            className="object-bottom" // Aligns image to bottom
          />
        </div>
        {/* --- END OF FIX --- */}

      </div>
    </div>
  );
};