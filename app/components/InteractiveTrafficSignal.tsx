'use client';
import Image from 'next/image';
import Link from 'next/link';
import { Instagram, Linkedin, Github } from 'lucide-react';

const InteractiveTrafficSignal: React.FC = () => {
  return (
    <div className="relative w-full max-w-[500px] ml-70 aspect-[3/4]">
      
      
      <Image
        src="/footer1.png"
        alt="Traffic Signal"
        layout="fill"
        objectFit="contain"
        className="rounded-lg" 
      />

      <div className="absolute inset-0">
        
        
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
          
          <Instagram className="relative z-10 w-full h-full text-white/50 
                                group-hover:text-white/70 transition-colors" />
        </Link>
        
        
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
          
          <Linkedin className="relative z-10 w-full h-full text-white/50 
                               group-hover:text-white/70 transition-colors" />
        </Link>

        
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
         
          <Github className="relative z-10 w-full h-full text-white/50 
                             group-hover:text-white/70 transition-colors" />
        </Link>
      </div>
    </div>
  );
};

export default InteractiveTrafficSignal;