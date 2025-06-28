import React, { useState } from 'react'
import Weather from './components/Weather'
import Background from './components/Background'

const App = () => {

  const [bgValue, setBgValue] = useState('default');

  return (
    <div className='app'>
      <Background value={bgValue}  />
      <Weather updateBackground={setBgValue} />
    </div>
  )
}

export default App
