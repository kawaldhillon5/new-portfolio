import { useInView, useScroll, useSpring, useTransform , motion} from "framer-motion";
import { useEffect, useRef } from "react";
import { useViewport } from "../../hooks/ViewPort";
import { PhoneSvg } from "../phoneOutline";

export const BlogPostSec = ({videoSrc, text, subText ,videoOnLeft}: {videoSrc: string, text: string, videoOnLeft: Boolean, subText: string})=> {

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
        useTransform(scrollYProgress, [0.2, 0.3], [0.8, 1]), 
        springConfig
    );

    // Text fly-in: Start earlier, finish by the time video is scaled
    const leftX = useSpring(
        useTransform(scrollYProgress, [0, 0.4], [-250, -20]), 
        springConfig
    );
    const rightX = useSpring(
        useTransform(scrollYProgress, [0, 0.4], [250, 20]), 
        springConfig
    );
    
    const opacity = useTransform(scrollYProgress, [0, 0.4], [0, 1]);

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
        <div ref={containerRef} className="track-content-section-desktop">
        {
            isMobile ?
            <>
                <motion.div style={{ x: leftX, opacity: opacity }} className="text-top-left mobile">
                    <h3>{text}</h3>
                    <h5>{subText}</h5>
                </motion.div>

                <motion.div style={{ y: rightX, opacity: opacity, scale: videoScale }} className="video-div video-right mobile">
                    <video ref={videoRef} className='phone-video' width="354" src={videoSrc} autoPlay loop muted playsInline />
                    <PhoneSvg color={"silver"} width={380} height={800} />
                </motion.div>
            </>
            :
            <>
                {videoOnLeft
                ?
                < >
                    <motion.div style={{ x: leftX, opacity: opacity }} className="text-top-left">
                        <h3>{text}</h3>
                        <h5>{subText}</h5>
                    </motion.div>

                    <motion.div style={{ x: rightX, opacity: opacity, scale: videoScale }} className="video-div video-right">
                        <video className='desktop-video' width="1200" src={videoSrc} autoPlay loop muted playsInline />
                    </motion.div>
                </> 
                :
                < >
                    <motion.div style={{ x: rightX, opacity: opacity }} className="text-bottom-right">
                        <h3>{text}</h3>
                        <h5>{subText}</h5>
                    </motion.div>

                    <motion.div style={{ x: leftX, opacity: opacity, scale: videoScale }} className="video-div video-left">
                        <video ref={videoRef} className='desktop-video' width="1200" src={videoSrc}  loop muted playsInline />
                    </motion.div>

                </>}
            </>
        }
        </div>
    )
}