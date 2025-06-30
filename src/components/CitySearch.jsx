import React from 'react'
import { useState, useEffect } from 'react';
import './CitySearch.css'; 
import search_icon from '../assets/search.png'

const CitySearch = ({ onSearch, onSelect }) => {
  const [query, setQuery] = useState('');
  const [cities, setCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState('');

  useEffect(() => {
    const delay = setTimeout(() => {
      if (query.length > 2) {
        fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${query}&limit=5&appid=${import.meta.env.VITE_APP_ID}`)
          .then(res => res.json())
          .then(data => setCities(data))
          .catch(err => console.error(err));
      }
    }, 400);

    return () => clearTimeout(delay);
  }, [query]);

  const handleSearchClick = () => {
    const cityToSearch = selectedCity || query;
    if (cityToSearch) {
      onSearch(cityToSearch);
      setCities([]);
    } else {
      alert('Please enter a city');
    }
  };

  return (
    <div className="city-search">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Enter city"
        className="p-2 border rounded w-full"
      />
      {cities.length > 0 && (
        <ul className="cities-list">
          {cities.map((city, i) => (
            <li
              key={i}
              className="cities"
              onClick={() => {
                onSelect(city.name);
                setQuery(`${city.name}, ${city.country}`);
                setCities([]);
              }}
            >
              {city.name}, {city.state ? `${city.state}, ` : ''}{city.country}
            </li>
          ))}
        </ul>
      )}

      <img src={search_icon} alt="" onClick={handleSearchClick}/>
    </div>
  );
};

export default CitySearch