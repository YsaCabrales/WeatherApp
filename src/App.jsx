import React from 'react'
import Weather from './components/Weather'
import Background from './components/Background'

const App = () => {
  return (
    <div className='app'>
      <Background />
      <Weather />
    </div>
  )
}

export default App
