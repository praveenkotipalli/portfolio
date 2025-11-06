// app/components/Contact.tsx
'use client'; 

// 1. Import useState and emailjs
import React, { useRef, useState } from 'react';
import confetti from "canvas-confetti"; 
import { MorphingText } from '@/components/ui/morphing-text';
import InteractiveTrafficSignal from './InteractiveTrafficSignal';
import emailjs from '@emailjs/browser'; // 2. Import EmailJS

// Helper function for fireworks
const randomInRange = (min: number, max: number) =>
  Math.random() * (max - min) + min;

const Contact: React.FC = () => {
  const formRef = useRef<HTMLFormElement | null>(null);
  // 3. Add states for loading and success
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // 4. Add your EmailJS keys
  const serviceID = "service_7qv3i6t";
  const templateID = "template_s4e19pb";
  const publicKey = "dejggMqXoQjWcHNX6";

  // 5. Make handleSubmit async and add EmailJS logic
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true); // Start loading

    if (!serviceID || !templateID || !publicKey) {
      alert("EmailJS keys are missing.");
      setIsLoading(false);
      return;
    }

    try {
      // 6. Send the email
      await emailjs.sendForm(serviceID, templateID, formRef.current!, publicKey);

      // --- 7. Run success logic ---
      setIsSuccess(true); // Show success message
      fireFireworks(); // Fire confetti

      if (formRef.current) {
        formRef.current.reset(); // Reset the form
      }
      
    } catch (error) {
      console.error("EmailJS Error:", error);
      alert("Something went wrong. Please try again.");
    }

    setIsLoading(false); // Stop loading
  };
  
  // 8. Moved fireworks logic into its own function
  const fireFireworks = () => {
    const duration = 5 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 99999 }; 

    const interval = window.setInterval(() => {
      const timeLeft = animationEnd - Date.now();
      if (timeLeft <= 0) return clearInterval(interval);
      const particleCount = 50 * (timeLeft / duration);
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
      });
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
      });
    }, 250);
  };

  return (
    <section 
      id="contact" 
      style={{ backgroundColor: '#111111' }} 
      className="px-10 text-white rounded-tl-2xl rounded-tr-2xl relative min-h-screen
                 flex flex-col justify-center"
    >
      {/* 9. Fixed invalid margins and font size */}
      <div className="text-center mb-16 mt-16 relative z-10">
        <MorphingText
          texts={["Let's Talk.", "Let's Build.", "Say Hello."]}
          className="text-4xl md:text-6xl font-semibold"
        />
      </div>

      <div className="max-w-6xl mx-auto w-full flex flex-col md:flex-row md:gap-16 md:items-center">
        <div className="md:w-1/2">
          
          {/* 10. Conditional rendering for success message */}
          {isSuccess ? (
            <div className="text-center text-2xl md:text-3xl font-medium text-gray-300 h-full flex items-center justify-center">
              <p>Thanks for your message! <br/> I'll get back to you soon.</p>
            </div>
          ) : (
            <form 
              ref={formRef}
              onSubmit={handleSubmit}
              className="w-full flex flex-col gap-8 relative z-10
                         text-2xl md:text-3xl font-medium text-gray-400"
            >
              <p>
                Hi Praveen,
              </p>
              
              <p>
                My name is 
                <input 
                  type="text" 
                  name="name"
                  placeholder="your name here"
                  className="form-input-inline"
                  required 
                />
                and I'm interested in
                <input 
                  type="text" 
                  name="interest"
                  placeholder="a project / an opportunity"
                  className="form-input-inline"
                  required 
                />.
              </p>

              <p>
                You can reach me at
                <input 
                  type="email" 
                  name="email"
                  placeholder="your_email@example.com"
                  className="form-input-inline"
                  required 
                />
                to talk more.
              </p>
              
              <textarea 
                name="message"
                placeholder="Anything else you'd like to add?"
                className="form-input-inline form-input-inline-textarea"
                rows={2}
              ></textarea>

              <div>
                <button 
                  type="submit"
                  className="form-submit-link"
                  disabled={isLoading} // Disable button when sending
                >
                  {/* 11. Show loading text */}
                  {isLoading ? "Sending..." : "[ Send It → ]"}
                </button>
              </div>
            </form>
          )}
        </div>
        
        <div className="md:w-1/2 flex flex-col items-center relative z-10">
          <InteractiveTrafficSignal />
        </div>
      </div>
    </section>
  );
}

export default Contact;