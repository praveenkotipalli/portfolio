// app/components/ProjectCard.tsx
"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { motion } from "framer-motion";

// 1. Define the props our card will accept, including the hover events
interface ProjectCardProps {
  title: string;
  description: string;
  staticImage: string;
  hoverImage: string;
  href: string;
  onMouseEnter?: () => void; // <-- ADD THIS
  onMouseLeave?: () => void; // <-- ADD THIS
}

// 2. Change to React.forwardRef so we can pass a ref to it
export const ProjectCard = React.forwardRef<
  HTMLDivElement,
  ProjectCardProps
>(({ 
  title, 
  description, 
  staticImage, 
  hoverImage, 
  href, 
  onMouseEnter, // <-- ADD THIS
  onMouseLeave  // <-- ADD THIS
}, ref) => {
  return (
    // 3. Apply the hover events to the outer motion.div
    <motion.div
      ref={ref}
      className="w-full" // <-- 1. REMOVED max-w-xs from here
      onMouseEnter={onMouseEnter} // <-- ADD THIS
      onMouseLeave={onMouseLeave} // <-- ADD THIS
    >
      <Link
        href={href}
        className="group w-full h-96 rounded-md shadow-xl
                   overflow-hidden relative block
                   cursor-none
                   
                   transition-shadow duration-300 ease-in-out
                   hover:shadow-2xl" // <-- 2. ADDED shadow transition
                   
        target="_blank"
      >
        {/* --- All your existing image and text layers stay the same --- */}
        
        {/* Static Image */}
        <Image
          src={staticImage}
          alt={`${title} static preview`}
          fill
          className="object-cover 
                     transition-all duration-500
                     group-hover:opacity-0"
        />
        
        {/* Hover Image */}
        <Image
          src={hoverImage}
          alt={`${title} animated preview`}
          fill
          className="object-cover 
                     opacity-0 
                     transition-all duration-500
                     group-hover:opacity-100"
        />
        
        {/* Dark Overlay */}
        <div
          className="absolute inset-0 bg-black 
                     opacity-0 transition-all duration-500
                     group-hover:opacity-50"
        ></div>
  
        {/* Text Content */}
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