// app/components/CertificateFolder.tsx
'use client';
import Image from 'next/image';
import React from 'react';

// Interface for Certificates
export interface CertificateItem {
  imageSrc: string; // e.g., "cert1card.avif"
}

// Certificate Card (no fade-in)
const CertCard: React.FC<{ src: string; animationClasses: string }> = ({
  src,
  animationClasses,
}) => {
  return (
    <div
      className={`
        absolute bottom-8 left-1/2 -ml-[110px] w-[220px] h-[140px]
        transform transition-transform duration-700 ease-[cubic-bezier(0.25,0.8,0.25,1)]
        scale-90
        z-20
        ${animationClasses}
      `}
    >
      <Image
        src={`/${src}`}
        alt="Certificate"
        layout="fill"
        objectFit="cover"
        className="rounded-xl shadow-2xl"
      />
    </div>
  );
};

// Main Component
interface CertificateFolderProps {
  certs: string[];
}

export const CertificateFolder: React.FC<CertificateFolderProps> = ({ certs }) => {
  const cardData = certs.slice(0, 4);

  // Adjusted positions for perfect arc without overlap
  const animations = [
    // Far left
    'group-hover:-translate-y-[180px] group-hover:-translate-x-[350px] group-hover:-rotate-[14deg] group-hover:scale-100',
    // Mid-left
    'group-hover:-translate-y-[220px] group-hover:-translate-x-[120px] group-hover:-rotate-[6deg] group-hover:scale-100',
    // Mid-right
    'group-hover:-translate-y-[220px] group-hover:translate-x-[120px] group-hover:rotate-[6deg] group-hover:scale-100',
    // Far right
    'group-hover:-translate-y-[180px] group-hover:translate-x-[350px] group-hover:rotate-[14deg] group-hover:scale-100',
  ];

  return (
    <div className="relative w-full h-64 flex items-center justify-center group overflow-visible">
      <div className="relative w-56 h-56">

        {/* Folder Back (z-10) */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-56 h-56 z-10">
          <Image
            src="/backoffolder.avif"
            alt="Folder Back"
            layout="fill"
            objectFit="contain"
            className="object-bottom"
          />
        </div>

        {/* Certificates (z-20) */}
        {cardData.map((src, index) => (
          <CertCard
            key={index}
            src={src}
            animationClasses={animations[index % animations.length]}
          />
        ))}

        {/* Folder Front + Blank (z-30) */}
        <div
          className="
            absolute bottom-0 left-1/2 -translate-x-1/2 w-56 h-56 z-30
            cursor-pointer origin-bottom
            transition-transform duration-700 ease-[cubic-bezier(0.25,0.8,0.25,1)]
            group-hover:scale-y-[0.75]
          "
        >
          {/* Blank Card */}
          <div className="absolute inset-0 z-30">
            <Image
              src="/blankcard.avif"
              alt="Blank Card"
              layout="fill"
              objectFit="contain"
              className="object-bottom"
            />
          </div>

          {/* Front Folder */}
          <div className="absolute inset-0 z-40">
            <Image
              src="/frontoffolder.avif"
              alt="Folder Front"
              layout="fill"
              objectFit="contain"
              className="object-bottom"
            />

            {/* --- THIS IS THE CHANGE --- */}
            <div 
              className="absolute inset-0 flex items-end justify-center 
                         pb-6 
                         transition-all duration-500 ease-out"
            >
              {/* Changed text-white/30 to text-white/50 */}
              <p className="text-xl font-semibold text-white/50">
                Certifications
              </p>
            </div>
            {/* --- END OF CHANGE --- */}
          </div>
        </div>

      </div>
    </div>
  );
};