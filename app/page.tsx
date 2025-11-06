import React from 'react';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import SideHustles from './components/SideHustles';
import Credentials from './components/Credentials';
import Contact from './components/Contact';
// Import any other components you have, like Contact

const Home: React.FC = () => {
  return (
    <main>
      {/* This is your sticky hero, on z-index 0 */}
      <Hero />
      
      {/* This div wraps all scrolling content */}
      {/* 'relative' is needed for 'z-index' to work */}
      {/* 'z-10' puts it ON TOP of the 'z-0' hero */}
      <div className="relative z-10">
        <About />
        <Projects />
        <SideHustles />
        <Credentials />
        <Contact/>
        {/* <Contact /> */}
      </div>
    </main>
  );
}

export default Home;