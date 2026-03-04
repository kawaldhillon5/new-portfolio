import { useScroll, useSpring, useTransform, motion, type SpringOptions } from "framer-motion";
import { useRef } from "react";
import * as AllIcons from './svgs';

import "./ExtraProjects.css"
import { useViewport } from "../hooks/ViewPort";

export const ExtraProjects = ({springConfig}:{springConfig: SpringOptions}) =>{

    const {isMobile} = useViewport();

    const containerRef = useRef<HTMLDivElement>(null);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    const scale = !isMobile ? useSpring(useTransform(scrollYProgress, [0.1, 0.2], [1, 0.2]), springConfig) : useSpring(useTransform(scrollYProgress, [0.1, 0.2], [1, 0.5]), springConfig);
    const ListScale = useSpring(useTransform(scrollYProgress, [0.1, 0.4], [0.5, 1]), springConfig);
    const y = useTransform(scrollYProgress, [0, 0.2], ["0vh", "-45vh"]);
    const x = !isMobile ? useSpring(useTransform(scrollYProgress, [0.1, 0.2], ["0vh", "37vw"]), springConfig) :  useSpring(useTransform(scrollYProgress, [0.1, 0.2], ["0vh", "23vw"]), springConfig);

    const projects : {name: string, link: string, iconName: string}[] = [
        {   
            name: "Classic Snake Game",
            iconName: "Snake",
            link: "https://react-snake-kawal.netlify.app/",
        },
        {   
            name: "Messaging App",
            iconName: "Message",
            link: "https://github.com/kawaldhillon5/messaging-app-api",
        },
        {   
            name: "Merchandise Store",
            iconName: "Cloth",
            link: "https://github.com/kawaldhillon5/My-Store",
        },
        {   
            name: "Weather Site",
            iconName: "Weather",
            link: "https://kawaldhillon5.github.io/TOP_Weather/",
        },
        {   
            name: "ToDo List",
            iconName: "ToDo",
            link: "https://kawaldhillon5.github.io/TOP_Todo_list/",
        },
    ]

    return (
        <section ref={containerRef} className=" hero-track extra-projects-div">
            <div className="sticky-container">
                <motion.div 
                    className="hero-content"
                    style={{ scale, y, x }}
                >
                    <h1 className="hero-name"><a href="https://github.com/kawaldhillon5" target='_blank'>EXTRA PROJECTS</a></h1>
                </motion.div>
            </div>
            <div  className="track-content extra-projects">
                <motion.div style={{ scale:ListScale}} className={`extra-projects-list ${isMobile && "mobile"}`}>
                    {
                        projects.map(item =>(
                            <ListItem name={item.name} link={item.link} icon={item.iconName}/>
                        ))
                    }
                </motion.div>
            </div>
        </section>
    )
}

const ListItem = (item:{name:string, link:string, icon:string})=>{
    
    const iconComponentName = `${item.icon.replace(/[\s.]+/g, '')}Icon`;
    const IconComponent = (AllIcons as any)[iconComponentName] || AllIcons.DefaultIcon;

    return (
        <a className="extra-projects-list-item" href={item.link} target="_blank"><IconComponent size={150} />{item.name}</a>
    )
}