import  { useRef } from 'react';
import { motion, useScroll, useSpring, useTransform, type SpringOptions } from 'framer-motion';
import './Title.css';
import { APIIcon, AuthIcon, DatabaseIcon, GuiIcon, WebIcon } from './svgs';
import { useViewport } from '../hooks/ViewPort';


export const Title  = ({springConfig}:{springConfig: SpringOptions}) => {

    const {isMobile} = useViewport();

    const containerRef = useRef<HTMLDivElement>(null);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    
    const hintOpacity = useTransform(scrollYProgress, [0, 0.1], [1, 0]);

    const scale = !isMobile ? useSpring(useTransform(scrollYProgress, [0.1, 0.2], [1, 0.2]), springConfig) : useSpring(useTransform(scrollYProgress, [0.1, 0.2], [1, 0.5]), springConfig);
    const scale2 = useSpring(useTransform(scrollYProgress, [0.2, 0.4], [0.6, 1]), springConfig);
    const y = useTransform(scrollYProgress, [0, 0.2], ["0vh", "-45vh"]) 
    const x = !isMobile ? useSpring(useTransform(scrollYProgress, [0.1, 0.2], ["0vh", "37vw"]), springConfig) :  useSpring(useTransform(scrollYProgress, [0.1, 0.2], ["0vh", "20vw"]), springConfig);

    const subtextOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);

    return (
    <section ref={containerRef} className="hero-track">
        <div className="sticky-container">
        
        <motion.div 
            className="hero-content"
            style={{ scale, y, x }}
        >
            <h1 className="hero-name">KAWAL DHILLON</h1>
            <motion.p 
            className="hero-subtext"
            style={{ opacity: subtextOpacity }}
            >
            Computer Science @<a href='https://www.sheridancollege.ca/programs/bachelor-computer-science' target='_blank'>Sheridan</a>
            </motion.p>
        </motion.div>
        </div>
        <div className='track-content hero'>
            <motion.div style={{scale: scale2}} className={`hero-content-top ${isMobile && "mobile"}`}>
                <p>Calm Observant Problem Solver</p>
                <p>"My background in telecommunications taught me that the most complex problems are solved through careful listening and methodical troubleshooting."</p>
            </motion.div>
            <motion.div style={{scale: scale2}} className={`hero-content-bottom ${isMobile && "mobile"} `}>
                <div className='hero-content-bottom-item'>
                    <WebIcon size={60}/>
                    <div>
                        <div>MVC,</div>
                        <div>.NET,</div>
                        <div>Event-Driven Architecture</div>
                    </div>
                </div>
                <div className='hero-content-bottom-item'>
                    <DatabaseIcon size={60}/>
                    <div>
                        <div>SQL,</div>
                        <div>NoSQL</div>
                    </div>
                </div>
                <div className='hero-content-bottom-item'>
                    <APIIcon size={60}/>
                    <div>
                        <div>RESTfullAPI,</div>
                        <div>WebSockets</div>
                    </div>
                </div>
                <div className='hero-content-bottom-item'>
                    <AuthIcon size={60}/>
                    <div>
                        <div>OAuth,</div>
                        <div>JWT,</div>
                        <div>Cookie</div>
                    </div>
                </div>
                <div className='hero-content-bottom-item'>
                    <GuiIcon size={60}/>
                    <div>
                        <div>React,</div>
                        <div>Framer Motion</div>
                    </div>
                </div>
            </motion.div>
            
        </div>
        <motion.div 
            animate={{ y: [-10, 0, -10] }} 
            transition={{ repeat: Infinity, duration: 2 }}
            className="scroll-hint"
            style={{opacity: hintOpacity}}
        >
            ↓ Scroll to Explore
        </motion.div>

    </section>
    );
};



