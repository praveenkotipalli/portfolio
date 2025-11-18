
"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { motion } from "framer-motion";


interface ProjectCardProps {
  title: string;
  description: string;
  staticImage: string;
  hoverImage: string;
  href: string;
  onMouseEnter?: () => void; 
  onMouseLeave?: () => void; 
}


export const ProjectCard = React.forwardRef<
  HTMLDivElement,
  ProjectCardProps
>(({ 
  title, 
  description, 
  staticImage, 
  hoverImage, 
  href, 
  onMouseEnter,
  onMouseLeave 
}, ref) => {
  return (
   
    <motion.div
      ref={ref}
      className="w-full"
      onMouseEnter={onMouseEnter} 
      onMouseLeave={onMouseLeave} 
    >
      <Link
        href={href}
        className="group w-full h-96 rounded-md shadow-xl
                   overflow-hidden relative block
                   cursor-none
                   
                   transition-shadow duration-300 ease-in-out
                   hover:shadow-2xl" 
                   
        target="_blank"
      >
       
        <Image
          src={staticImage}
          alt={`${title} static preview`}
          fill
          className="object-cover 
                     transition-all duration-500
                     group-hover:opacity-0"
        />
        
        
        <Image
          src={hoverImage}
          alt={`${title} animated preview`}
          fill
          className="object-cover 
                     opacity-0 
                     transition-all duration-500
                     group-hover:opacity-100"
        />
        
        
        <div
          className="absolute inset-0 bg-black 
                     opacity-0 transition-all duration-500
                     group-hover:opacity-50"
        ></div>
  
        <div className="relative z-10 flex flex-col justify-end h-full p-4">
          <h1 className="font-bold text-xl md:text-2xl text-white relative" style={{ color: '#CFCFCF' }}>
            {title}
          </h1>
          <p className="font-normal text-base text-gray-200 relative my-2" style={{ color: '#CFCFCF' }}>
            {description}
          </p>
        </div>
      </Link>
    </motion.div>
  );
});

ProjectCard.displayName = "ProjectCard";