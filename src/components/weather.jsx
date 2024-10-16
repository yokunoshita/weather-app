import React from 'react';

function Weather({ data }) {
  const { name, main, weather, wind } = data;

  return (
    <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md text-center">
      <h2 className="text-2xl font-bold mb-2">{name}</h2>
      <p className="text-lg capitalize">{weather[0].description}</p>
      <p className="text-lg">Temperature: {main.temp} °C</p>
      <p className="text-lg">Humidity: {main.humidity}%</p>
      <p className="text-lg">Wind Speed: {wind.speed} m/s</p>
    </div>
  );
}

export default Weather;