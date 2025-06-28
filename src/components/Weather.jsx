import React, { useEffect, useRef, useState } from 'react'
import './Weather.css'
import search_icon from '../assets/search.png'
import wind_icon from '../assets/wind.png'
import humidity_icon from '../assets/humidity.png'

const Weather = ({ updateBackground }) => {

  const inputRef = useRef();
  const [weatherData, setWeatherData] = useState(false);

  const allIcons = {
    "01d": 'https://openweathermap.org/img/wn/01d@2x.png',
    "01n": 'https://openweathermap.org/img/wn/01n@2x.png',
    "02d": 'https://openweathermap.org/img/wn/02d@2x.png',
    "02n": 'https://openweathermap.org/img/wn/02n@2x.png',
    "03d": 'https://openweathermap.org/img/wn/03d@2x.png',
    "03n": 'https://openweathermap.org/img/wn/03n@2x.png',
    "04d": 'https://openweathermap.org/img/wn/04d@2x.png',
    "04n": 'https://openweathermap.org/img/wn/04n@2x.png',
    "09d": 'https://openweathermap.org/img/wn/09d@2x.png',
    "09n": 'https://openweathermap.org/img/wn/09n@2x.png',
    "10d": 'https://openweathermap.org/img/wn/10d@2x.png',
    "10n": 'https://openweathermap.org/img/wn/10n@2x.png',
    "13d": 'https://openweathermap.org/img/wn/13d@2x.png',
    "13n": 'https://openweathermap.org/img/wn/13n@2x.png',
  }

  const handleWeatherChange = (weather) => {
    switch(weather) {
      case "01d":
      case "01n":
      default:
        updateBackground("default");
        break;
      case "02d":
      case "02n":
      case "03d":
      case "03n":
        updateBackground("cloudy");
        break;
      case "04d":
      case "04n":
        updateBackground("gloomy");
        break;
      case "09d":
      case "09n":
      case "10d":
      case "10n":
        updateBackground("rainy");
        break;
      case "11d":
      case "11n":
        updateBackground("stormy");
        break; 
      case "13d":
      case "13n":
        updateBackground("snowy");
        break;
    }
  };

  const search = async (city) => {
    if(city === '') {
      alert('Please enter a city name');
      return;
    }
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_APP_ID}`;

      const response = await fetch(url);
      const data = await response.json();

      if(!response.ok) {
        throw new Error(data.message || 'City not found');
      }

      console.log(data);

      const icon = allIcons[data.weather[0].icon] || clear_icon;
      setWeatherData({
        humidity: data.main.humidity,
        windspeed: data.wind.speed,
        temp: Math.floor(data.main.temp),
        city: data.name,
        icon: icon
      });

      handleWeatherChange(data.weather[0].icon);
      console.log(`Weather data updated: ${data.weather[0].icon}`);
      
    } catch (error) {
      setWeatherData(false);
      alert('City not found');
      console.error("Error fetching weather data:", error);
    }
  }

  useEffect(() => {
      search('Manila');
    }, []);

  return (
     <div className='weather '>
       <div className="search-bar">
         <input ref={inputRef} type="text" placeholder='Search' />
         <img src={search_icon} alt="" onClick={()=>search(inputRef.current.value)}/>
       </div>
       {weatherData?<>
       <img src={weatherData.icon} alt="" className='weather-icon'/> 
       <p className='temp'>{weatherData.temp}°C</p>           
       <p className='location'>{weatherData.city}</p>
       <div className="weather-data">
         <div className="col">
           <img src={humidity_icon} alt="" />
             <p>{weatherData.humidity}%</p>
             <span>Humidity</span>
         </div>
         <div className="col">
           <img src={wind_icon} alt="" />
             <p>{weatherData.windspeed} Km/h</p>
             <span>Wind Speed</span>
         </div>
       </div>
       </>:<></>}
     </div>    
  )
}

export default Weather