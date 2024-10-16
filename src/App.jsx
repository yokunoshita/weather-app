import React, { useState } from 'react';
import axios from 'axios';
import Weather from './components/weather';
import WeeklyForecast from './components/weeklyForecast';

function App() {
  const [city, setCity] = useState('');
  const [currentWeather, setCurrentWeather] = useState(null);
  const [weeklyForecast, setWeeklyForecast] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const apiKey = '2b2100a08dd764f5463554133b9bf633';

  const getWeather = async () => {
    if (!city) {
      setError('City name please');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const weatherResponse = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
      );

      const forecastResponse = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`
      );
      setCurrentWeather(weatherResponse.data);
      setWeeklyForecast(forecastResponse.data);
      setLoading(false);

    } catch (err) {
      setError('Can\'t found the vucking city bish');
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      getWeather();
    }
  };

  return (
    <div className="min-h-screen bg-blue-100 flex flex-col justify-center items-center p-5">
      <h1 className="text-4xl font-bold mb-6">Weather App</h1>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Enter city"
          className="p-3 rounded-lg shadow-md border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 mr-2"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button
          onClick={getWeather}
          className="bg-blue-500 text-white px-5 py-3 rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Get Weather
        </button>
      </div>
      {loading && <p className="text-lg text-gray-700">Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {currentWeather && <Weather data={currentWeather} />}
      {weeklyForecast && <WeeklyForecast forecast={weeklyForecast} />}
    </div>
  );
}

export default App;
