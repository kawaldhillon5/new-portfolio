import { useInView, useScroll, useSpring, useTransform, motion } from "framer-motion";
import { useEffect, useRef } from "react";
import { PhoneSvg } from "../phoneOutline";
import { useViewport } from "../../hooks/ViewPort";

export const TicTacToeSec = ({videoSrc1, text, subText ,videoSrc2, videoOnLeft}: {videoOnLeft:boolean, videoSrc1: string, text: string, videoSrc2: string, subText: string}) =>{

    const {isMobile} = useViewport();

    const containerRef = useRef<HTMLDivElement>(null);

    const videoRef1 = useRef<HTMLVideoElement>(null);
    const videoRef2 = useRef<HTMLVideoElement>(null);
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
        if (!videoRef1.current || !videoRef2.current) return;

        if (isInView) {
            videoRef1.current.play();
            videoRef2.current.play();
        } else {
            videoRef1.current.pause();
            videoRef2.current.pause();
        }
    }, [isInView]);
    
     return (
        <div ref={containerRef} className={`track-content-section tictactoe ${isMobile && "mobile"}`}>
        {
            videoOnLeft
            ?
            < >
                <motion.div style={{ y: textLeftY, opacity: opacity }} className="text-top-left tictactoe">
                    <h2>{text}</h2>
                    <h5>{subText}</h5>
                </motion.div>

                <motion.div style={{ y: textRightY, opacity: opacity, scale: videoScale }} className="video-div video-right">
                    <video ref={videoRef1} className='phone-video tictactoe' width="370" src={videoSrc1} autoPlay loop muted playsInline />
                    <PhoneSvg color={"rgb(165, 165, 165)"} width={390} height={758} />
                </motion.div>

                <motion.div style={{ y: textRightY, opacity: opacity, scale: videoScale }} className="video-div video-right">
                    <video ref={videoRef2} className='phone-video tictactoe' width="344" src={videoSrc2} autoPlay loop muted playsInline />
                    <PhoneSvg color={"rgb(165, 165, 165)"} width={366} height={760} />
                </motion.div>
            </> 
            : isMobile ?
            <>
                <motion.div style={{ y: textLeftY, opacity: opacity }} className="text-bottom-right tictactoe">
                    <h2>{text}</h2>
                    <h5>{subText}</h5>
                </motion.div>

                <motion.div style={{ y: textRightY, opacity: opacity, scale: videoScale }} className="video-div video-left">
                    <video ref={videoRef1} className='phone-video tictactoe' width="370" src={videoSrc1}  loop muted playsInline />
                    <PhoneSvg color={"rgb(165, 165, 165)"} width={390} height={758} />
                </motion.div>

                <motion.div style={{ y: textRightY, opacity: opacity, scale: videoScale }} className="video-div video-right">
                    <video ref={videoRef2} className='phone-video tictactoe' width="344" src={videoSrc2} autoPlay loop muted playsInline />
                    <PhoneSvg color={"rgb(165, 165, 165)"} width={366} height={760} />
                </motion.div>
            </>
            :
            < >
                <motion.div style={{ y: textRightY, opacity: opacity, scale: videoScale }} className="video-div video-left">
                    <video ref={videoRef1} className='phone-video tictactoe' width="370" src={videoSrc1}  loop muted playsInline />
                    <PhoneSvg color={"rgb(165, 165, 165)"} width={390} height={758} />
                </motion.div>

                <motion.div style={{ y: textRightY, opacity: opacity, scale: videoScale }} className="video-div video-right">
                    <video ref={videoRef2} className='phone-video tictactoe' width="344" src={videoSrc2} autoPlay loop muted playsInline />
                    <PhoneSvg color={"rgb(165, 165, 165)"} width={366} height={760} />
                </motion.div>

                <motion.div style={{ y: textLeftY, opacity: opacity }} className="text-bottom-right tictactoe">
                    <h2>{text}</h2>
                    <h5>{subText}</h5>
                </motion.div>
            </>
        }
        </div>
    )
    
}