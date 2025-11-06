'use client';
import Image from 'next/image';
import Link from 'next/link';
import { Instagram, Linkedin, Github } from 'lucide-react';

const InteractiveTrafficSignal: React.FC = () => {
  return (
    <div className="relative w-full max-w-[500px] ml-70 aspect-[3/4]">
      
      {/* Your JPG image as the base layer */}
      <Image
        src="/footer1.png"
        alt="Traffic Signal"
        layout="fill"
        objectFit="contain"
        className="rounded-lg" 
      />

      {/* Overlay for the links */}
      <div className="absolute inset-0">
        
        {/* --- Red Light: Instagram --- */}
        <Link 
          href="https://www.instagram.com/pr4veennn/"
          target="_blank"
          className="group absolute w-8 h-13 
                     top-[30%] left-[46%] -translate-x-1/2"
        >
          <div className="absolute inset-0 bg-red-500 rounded-full 
                          blur-lg opacity-0 
                          group-hover:opacity-75 transition-opacity duration-300"
          ></div>
          {/* CHANGED: text-white/80 to text-white/50, group-hover:text-white to group-hover:text-white/70 */}
          <Instagram className="relative z-10 w-full h-full text-white/50 
                                group-hover:text-white/70 transition-colors" />
        </Link>
        
        {/* --- Yellow Light: LinkedIn --- */}
        <Link 
          href="https://www.linkedin.com/in/praveenkumarkotipalli/"
          target="_blank"
          className="group absolute w-8 h-13
                     top-[45%] left-[46%] -translate-x-1/2"
        >
          <div className="absolute inset-0 bg-yellow-400 rounded-full 
                          blur-lg opacity-0 
                          group-hover:opacity-75 transition-opacity duration-300"
          ></div>
          {/* CHANGED: text-white/80 to text-white/50, group-hover:text-white to group-hover:text-white/70 */}
          <Linkedin className="relative z-10 w-full h-full text-white/50 
                               group-hover:text-white/70 transition-colors" />
        </Link>

        {/* --- Green Light: GitHub --- */}
        <Link 
          href="https://github.com/praveenkotipalli"
          target="_blank"
          className="group absolute w-8 h-13
                     top-[60%] left-[46%] -translate-x-1/2"
        >
          <div className="absolute inset-0 bg-green-500 rounded-full 
                          blur-lg opacity-0 
                          group-hover:opacity-75 transition-opacity duration-300"
          ></div>
          {/* CHANGED: text-white/80 to text-white/50, group-hover:text-white to group-hover:text-white/70 */}
          <Github className="relative z-10 w-full h-full text-white/50 
                             group-hover:text-white/70 transition-colors" />
        </Link>
      </div>
    </div>
  );
};

export default InteractiveTrafficSignal;