import { useRef } from 'react';
import { motion, useScroll, useSpring, useTransform, type SpringOptions } from 'framer-motion';
import './Caliber.css';

import videoSrc1 from "../assets/visuals/LogIn.mp4";
import videoSrc2 from "../assets/visuals/WorkOutEdit.mp4";
import videoSrc3 from "../assets/visuals/LogOut.mp4";

import { CaliberSec } from './caliber/CaliberSec';
import { ProjectLastSec } from './ProjectLastSec';
import { useViewport } from '../hooks/ViewPort';

const CaliberTrack = ({springConfig}:{springConfig: SpringOptions}) => {

  const {isMobile} = useViewport();
  

  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const techStack: {name:string, link: string}[] = [
        {name:"React", link:"https://react.dev/"}, 
        {name: "Typescript", link: "https://www.typescriptlang.org/"}, 
        {name: "Vite", link: "https://vite.dev/"}, 
        {name: "PostgreSQL", link:"https://www.postgresql.org/"}, 
        {name: "Python", link: "https://www.python.org/"}, 
        {name: "FastAPI", link: "https://fastapi.tiangolo.com/"}
  ]


  const scale = !isMobile ? useSpring(useTransform(scrollYProgress, [0.1, 0.2], [1, 0.2]), springConfig) : useSpring(useTransform(scrollYProgress, [0.1, 0.2], [1, 0.5]), springConfig);
  const y = useTransform(scrollYProgress, [0, 0.2], ["0vh", "-45vh"]);
  const x = !isMobile ? useSpring(useTransform(scrollYProgress, [0.1, 0.2], ["0vh", "40vw"]), springConfig) :  useSpring(useTransform(scrollYProgress, [0.1, 0.2], ["0vh", "25vw"]), springConfig);
  const subtextOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);

  return (
    <section ref={containerRef} className="hero-track">
      <div className="sticky-container">
        <motion.div 
          className="hero-content"
          style={{ scale, y, x }}
        >
          <h1 className="hero-name"><a href="https://calibertrack.com" target='_blank'>CALIBERTRACK</a></h1>
          <motion.p 
            className="hero-subtext"
            style={{ opacity: subtextOpacity }}
          >
            Clean Modern Exercise Tracker
          </motion.p>
        </motion.div>
      </div>
      <div className='track-content caliber' >
        <CaliberSec videoOnLeft={true} videoSrc={videoSrc1} text='JWT-Based Auth' subText ="Secure Session Persistence" />
        <CaliberSec videoOnLeft={false} videoSrc={videoSrc2} text='State-Driven CRUD' subText ="Optimized SQLModel Schema"/>
        <CaliberSec videoOnLeft={true} videoSrc={videoSrc3} text='Real-time Data Sync' subText ="Modular React Components"/>
        <ProjectLastSec projectName='caliber' techStack={techStack} />
      </div>
    </section>
  );
};

export default CaliberTrack;
