import React from 'react'
import './Background.css'

const Background = (weather) => {
  const bgWeatherColor = {
      default: "linear-gradient(to top,  #00f2fe, #2679c2)",
      cloudy: "linear-gradient(to top, #68c0d6, #bccfe2)",
      gloomy: "linear-gradient(to top, #8c9cac, #456572)",
      rainy: "linear-gradient(to top, #2679c2,  #3c5661)",
      stormy: "linear-gradient(to top, #254a6b, #223036)",
      snowy: "linear-gradient(to top, #4b5877, #cacabbf)",
  };

  console.log(weather.value);
  
  return (
    <div className="bg-color" style={{
        background: bgWeatherColor[weather.value] || bgWeatherColor.default,
      }}>
      {weather.value === 'rainy' || weather.value === 'stormy' ? <>
        <div className="rain"></div>
        <div className="rain"></div>
        <div className="clouds"></div>
        <div className="clouds"></div>
      </>:<></>}
      {weather.value === 'cloudy'? <>
        <div className="clouds"></div>
        <div className="clouds"></div>
      </>:<></>}
    </div>
  )
}

export default Background