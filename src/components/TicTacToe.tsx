import { useScroll, useSpring, useTransform, motion, type SpringOptions } from "framer-motion";
import { useRef } from "react";

import "./TicTacTie.css";
import { TicTacToeSec } from "./tictactoe/TicTacToeSec";

import videoSrc1 from "../assets/visuals/edge_1.mp4";
import videoSrc2 from "../assets/visuals/chrome_1.mp4";
import videoSrc3 from "../assets/visuals/edge_2.mp4";
import videoSrc4 from "../assets/visuals/chrome_2.mp4";
import { ProjectLastSec } from "./ProjectLastSec";
import { useViewport } from "../hooks/ViewPort";

export const TicTacToe = ({springConfig}:{springConfig: SpringOptions})=>{

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
        {name: "SQLite", link:"https://www.postgresql.org/"}, 
        {name: "NodeJS", link: "https://www.python.org/"}, 
        {name: "Socket.IO", link: "https://fastapi.tiangolo.com/"}
    ]

    const scale = !isMobile ? useSpring(useTransform(scrollYProgress, [0.1, 0.2], [1, 0.2]), springConfig) : useSpring(useTransform(scrollYProgress, [0.1, 0.2], [1, 0.5]), springConfig);
    const y = useTransform(scrollYProgress, [0, 0.2], ["0vh", "-45vh"]);
    const x = !isMobile ? useSpring(useTransform(scrollYProgress, [0.1, 0.2], ["0vh", "37vw"]), springConfig) :  useSpring(useTransform(scrollYProgress, [0.1, 0.2], ["0vh", "30vw"]), springConfig);
    const subtextOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);
    return (
        <section ref={containerRef} className="hero-track">
            <div className="sticky-container">
                <motion.div 
                className="hero-content"
                style={{ scale, y, x }}
                >
                <h1 className="hero-name"><a href="https://tic-tac-toe-kdhillon.netlify.app/" target='_blank'>TIC TAC TOE</a></h1>
                <motion.p 
                    className="hero-subtext"
                    style={{ opacity: subtextOpacity }}
                >
                    Simple Classic Online Game
                </motion.p>
                </motion.div>
            </div>
            <div className='track-content tictactoe' >
                <TicTacToeSec videoOnLeft={true} videoSrc1={videoSrc1} videoSrc2={videoSrc2} text="Synchronous Play" subText="Bi-directional Event Streaming"  />
                <TicTacToeSec videoOnLeft={false} videoSrc1={videoSrc3} videoSrc2={videoSrc4} text="Resilient Sessions" subText="State Rehydration Logic"  />
                <ProjectLastSec techStack={techStack} projectName="tictactoe" />
            </div>
        </section>
  );
}