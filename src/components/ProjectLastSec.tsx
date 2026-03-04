import { useViewport } from '../hooks/ViewPort';
import * as AllIcons from './svgs';

export const ProjectLastSec = ({techStack, projectName}:{techStack:{name:string, link: string}[], projectName: string}) => {
    
    const {isMobile} = useViewport();

    return (
       <div className="last-sec">
        <div>Technologies Used</div>
        <div className={`last-sec-list ${isMobile && "mobile"}`}>{
            techStack.map((item)=>(
                <ListItem name={item.name} link={item.link} projectName={projectName}/>   
            ))
        }</div>
       </div>
    )
}

const ListItem = (item:{name:string, link:string, projectName: string})=>{
    
    const iconComponentName = `${item.name.replace(/[\s.]+/g, '')}Icon`;
    const IconComponent = (AllIcons as any)[iconComponentName] || AllIcons.DefaultIcon;

    return (
        <div className={`last-sec-item ${item.projectName}`}>
            <IconComponent size={40} />
            <a  href={item.link} target="_blank">{item.name}</a>
        </div>
    )
}