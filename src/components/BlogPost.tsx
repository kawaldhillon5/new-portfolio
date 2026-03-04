import { useScroll, useSpring, useTransform, motion, type SpringOptions } from "framer-motion";
import { useRef } from "react";
import { BlogPostSec } from "./blogpost/BlogPostSec";
import { ProjectLastSec } from "./ProjectLastSec";
import { useViewport } from "../hooks/ViewPort";

import "./BlogPost.css";

import videoSrc1 from "../assets/visuals/HomePage.mp4";
import videoSrc3 from "../assets/visuals/NewBlog.mp4";
import videoSrc4 from "../assets/visuals/SearchAndSort.mp4";

import videoSrc1M from "../assets/visuals/BlogHomePageMobile.mp4";
import videoSrc3M from "../assets/visuals/SearchandViewMobile.mp4";
import videoSrc4M from "../assets/visuals/SortingMobile.mp4";

export const BlogPost = ({springConfig}:{springConfig: SpringOptions})=>{

    const {isMobile} = useViewport();

    const containerRef = useRef<HTMLDivElement>(null);

      const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    const techStack: {name:string, link: string}[] = [
      {name:"React", link:"https://react.dev/"}, 
      {name: "Javascript", link: "https://developer.mozilla.org/en-US/docs/Web/JavaScript"}, 
      {name: "Vite", link: "https://vite.dev/"}, 
      {name: "MongoDB", link:"https://www.mongodb.com/"}, 
      {name: "NodeJS", link: "https://nodejs.org/en"}, 
      {name: "ExpressJS", link: "https://expressjs.com/"}
    ]


    const scale = !isMobile ? useSpring(useTransform(scrollYProgress, [0.1, 0.2], [1, 0.2]), springConfig) : useSpring(useTransform(scrollYProgress, [0.1, 0.2], [1, 0.5]), springConfig);
    const y = useTransform(scrollYProgress, [0, 0.2], ["0vh", "-45vh"]);
    const x = !isMobile ? useSpring(useTransform(scrollYProgress, [0.1, 0.2], ["0vh", "37vw"]), springConfig) :  useSpring(useTransform(scrollYProgress, [0.1, 0.2], ["0vh", "30vw"]), springConfig);
    const subtextOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);
    
    return (
    <section ref={containerRef} className="hero-track">
      <div className="sticky-container blogpost">
        <motion.div 
          className="hero-content"
          style={{ scale, y, x }}
        >
          <h1 className="hero-name"><a href="https://blogpostsite-kawal.netlify.app/" target='_blank'>BLOGPOST</a></h1>
          <motion.p 
            className="hero-subtext"
            style={{ opacity: subtextOpacity }}
          >
            Feature Rich Blog Shariing Platform
          </motion.p>
        </motion.div>
      </div>
      <div className='track-content blogpost' >
        <BlogPostSec text="Dynamic Content Delivery" subText="Responsive HomePage" videoOnLeft={true} videoSrc={isMobile ? videoSrc1M : videoSrc1} />
        <BlogPostSec text="Structured Data Persistence" subText="TinyMCE + HTML Sanitization" videoOnLeft={false} videoSrc={isMobile ? videoSrc3M :videoSrc3} />
        <BlogPostSec text="Query Optimization" subText="Regex Search & Multi-key Sorting" videoOnLeft={true} videoSrc={isMobile ? videoSrc4M: videoSrc4} />
        <ProjectLastSec projectName="blogPost" techStack={techStack} /> 
      </div>
    </section>
  );
}