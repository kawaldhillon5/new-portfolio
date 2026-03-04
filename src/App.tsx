import ReactLenis from 'lenis/react'
import './App.css'
import CaliberTrack from './components/Caliber'
import { BlogPost } from './components/BlogPost'
import { TicTacToe } from './components/TicTacToe'
import { ExtraProjects } from './components/ExtraProjects'
import { Title } from './components/Title'

function App() {


  const springConfig = { stiffness: 200, damping: 30, restDelta: 0.001 };

  return (
    <ReactLenis root>
        <Title springConfig={springConfig} />
        <CaliberTrack springConfig={springConfig} />
        <BlogPost springConfig={springConfig} />
        <TicTacToe springConfig={springConfig} />
        <ExtraProjects springConfig={springConfig} />
    </ReactLenis>
  )
}

export default App
