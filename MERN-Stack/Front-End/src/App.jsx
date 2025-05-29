import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Info from './Components/info'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <Info></Info>
      </div>
    </>
  )
}

export default App
