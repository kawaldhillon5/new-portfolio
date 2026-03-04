import { useScroll, useSpring, useTransform, motion, useInView } from "framer-motion";
import { useEffect, useRef } from "react";
import { PhoneSvg } from "../phoneOutline";
import { useViewport } from "../../hooks/ViewPort";

export const CaliberSec = ({videoSrc, text, subText ,videoOnLeft}: {videoSrc: string, text: string, videoOnLeft: Boolean, subText: string})=>{

    const {isMobile} = useViewport();

    const containerRef = useRef<HTMLDivElement>(null);

    const videoRef = useRef<HTMLVideoElement>(null);
    const isInView = useInView(containerRef, { amount: 0.5 });

     const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    }); 

    

    const springConfig = { stiffness: 100, damping: 30, restDelta: 0.001 };

    const videoScale = useSpring(
        useTransform(scrollYProgress, [0.2, 0.3], [0.5, 1]), 
        springConfig
    );

    // Text fly-in: Start earlier, finish by the time video is scaled
    const textLeftY = useSpring(
        useTransform(scrollYProgress, [0, 0.4], [-150, -20]), 
        springConfig
    );
    const textRightY = useSpring(
        useTransform(scrollYProgress, [0, 0.4], [150, 20]), 
        springConfig
    );
    
    const opacity = useTransform(scrollYProgress, [0, 0.3], [0, 1]);

    useEffect(() => {
        if (!videoRef.current) return;

        if (isInView) {
            videoRef.current.play();
        } else {
            videoRef.current.pause();
            // Optional: videoRef.current.currentTime = 0; // Resets to start when scrolled away
        }
    }, [isInView]);    
    

    return (
        <div ref={containerRef} className={`track-content-section caliber ${isMobile && "mobile"}`}>
        {
            videoOnLeft
            ?
            < >
                <motion.div style={{ y: textLeftY, opacity: opacity }} className={`text-top-left ${isMobile && "mobile"}`}>
                    <h2>{text}</h2>
                    <h5>{subText}</h5>
                </motion.div>

                <motion.div style={{ y: textRightY, opacity: opacity, scale: videoScale }} className="video-div video-right">
                    <video ref={videoRef} className='phone-video' width="356" src={videoSrc} autoPlay loop muted playsInline />
                    <PhoneSvg color={"silver"} width={380} height={810} />
                </motion.div>
            </> 
            :  
                isMobile ? 
                <>
                     <motion.div style={{ y: textLeftY, opacity: opacity }} className={`text-bottom-right ${isMobile && "mobile"}`}>
                        <h2>{text}</h2>
                        <h5>{subText}</h5>
                    </motion.div>

                    <motion.div style={{ y: textRightY, opacity: opacity, scale: videoScale }} className="video-div video-left">
                        <video ref={videoRef} className='phone-video' width="356" src={videoSrc}  loop muted playsInline />
                        <PhoneSvg color={"silver"} width={380} height={810} />
                    </motion.div>

                </>
                :
                < >
                    <motion.div style={{ y: textRightY, opacity: opacity, scale: videoScale }} className="video-div video-left">
                        <video ref={videoRef} className='phone-video' width="356" src={videoSrc}  loop muted playsInline />
                        <PhoneSvg color={"silver"} width={380} height={810} />
                    </motion.div>

                    <motion.div style={{ y: textLeftY, opacity: opacity }} className={`text-bottom-right ${isMobile && "mobile"}`}>
                        <h2>{text}</h2>
                        <h5>{subText}</h5>
                    </motion.div>
                </>
        }
        </div>
    )
}