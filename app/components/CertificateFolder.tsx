
'use client';
import Image from 'next/image';
import React from 'react';


export interface CertificateItem {
  imageSrc: string; 
}


const CertCard: React.FC<{ src: string; animationClasses: string }> = ({
  src,
  animationClasses,
}) => {
  return (
    <div
      className={`
        absolute bottom-8 left-1/2
        -ml-[80px] w-[160px] h-[102px] md:-ml-[110px] md:w-[220px] md:h-[140px]
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


interface CertificateFolderProps {
  certs: string[];
}

export const CertificateFolder: React.FC<CertificateFolderProps> = ({ certs }) => {
  const cardData = certs.slice(0, 4);

  
  // Where each card fans out to when the folder opens. Phones get a tighter
  // fan that stays on screen; tablets and up keep the wide spread.
  const animations = [
    'group-hover:-translate-y-[120px] group-hover:-translate-x-[100px] md:group-hover:-translate-y-[180px] md:group-hover:-translate-x-[350px] group-hover:-rotate-[14deg] group-hover:scale-100',
    'group-hover:-translate-y-[150px] group-hover:-translate-x-[34px] md:group-hover:-translate-y-[220px] md:group-hover:-translate-x-[120px] group-hover:-rotate-[6deg] group-hover:scale-100',
    'group-hover:-translate-y-[150px] group-hover:translate-x-[34px] md:group-hover:-translate-y-[220px] md:group-hover:translate-x-[120px] group-hover:rotate-[6deg] group-hover:scale-100',
    'group-hover:-translate-y-[120px] group-hover:translate-x-[100px] md:group-hover:-translate-y-[180px] md:group-hover:translate-x-[350px] group-hover:rotate-[14deg] group-hover:scale-100',
  ];

  return (
    // mt-24 on phones: room above the folder for the fanned-out cards.
    <div className="relative w-full h-64 mt-24 md:mt-0 flex items-center justify-center group overflow-visible">
      <div className="relative w-44 h-44 md:w-56 md:h-56">

       
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-44 h-44 md:w-56 md:h-56 z-10">
          <Image
            src="/backoffolder.avif"
            alt="Folder Back"
            layout="fill"
            objectFit="contain"
            className="object-bottom"
          />
        </div>

       
        {cardData.map((src, index) => (
          <CertCard
            key={index}
            src={src}
            animationClasses={animations[index % animations.length]}
          />
        ))}

        
        <div
          className="
            absolute bottom-0 left-1/2 -translate-x-1/2 w-44 h-44 md:w-56 md:h-56 z-30
            cursor-pointer origin-bottom
            transition-transform duration-700 ease-[cubic-bezier(0.25,0.8,0.25,1)]
            group-hover:scale-y-[0.75]
          "
        >
         
          <div className="absolute inset-0 z-30">
            <Image
              src="/blankcard.avif"
              alt="Blank Card"
              layout="fill"
              objectFit="contain"
              className="object-bottom"
            />
          </div>

          
          <div className="absolute inset-0 z-40">
            <Image
              src="/frontoffolder.avif"
              alt="Folder Front"
              layout="fill"
              objectFit="contain"
              className="object-bottom"
            />

            
            <div 
              className="absolute inset-0 flex items-end justify-center 
                         pb-6 
                         transition-all duration-500 ease-out"
            >
              
              <p className="text-lg md:text-xl font-semibold text-white/50">
                Certifications
              </p>
            </div>
            
          </div>
        </div>

      </div>
    </div>
  );
};