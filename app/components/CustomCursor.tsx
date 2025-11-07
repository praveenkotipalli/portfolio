
'use client'; 

import React, { useRef, useEffect, useState } from 'react'; 

const CustomCursor: React.FC = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    
    const onMouseMove = (e: MouseEvent) => {
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
      }
    };

    const onMouseEnter = () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
      setIsVisible(true);
    };

    const onMouseLeave = () => {
      timeoutRef.current = setTimeout(() => {
        setIsVisible(false);
      }, 3000); 
    };
    
    window.addEventListener('mousemove', onMouseMove);
    document.documentElement.addEventListener('mouseenter', onMouseEnter);
    document.documentElement.addEventListener('mouseleave', onMouseLeave);
    
    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.documentElement.removeEventListener('mouseenter', onMouseEnter);
      document.documentElement.removeEventListener('mouseleave', onMouseLeave);
      
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      id="pochita-cursor"
      className="fixed top-0 left-0 z-[9999] pointer-events-none" 
      style={{
        opacity: isVisible ? 1 : 0,
        transition: 'transform 0.3s ease-out, opacity 0.3s ease-in-out', 
      }}
    >
      <img
        src="/cursor.png" 
        alt="Custom Cursor"
        width={105} 
        height={105}
        style={{
          
          marginLeft: '10px', 
          marginTop: '10px',
          
        }}
      />
    </div>
  );
};

export default CustomCursor;