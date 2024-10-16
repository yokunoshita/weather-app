import React from 'react';

function WeeklyForecast({ forecast }) {
  const getDayOfWeek = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { weekday: 'long' });
  };

  const dailyForecast = {};

  forecast.list.forEach((item) => {
    const date = item.dt_txt.split(' ')[0];
    if (!dailyForecast[date]) {
      dailyForecast[date] = [];
    }
    dailyForecast[date].push(item);
  });

  const getDailyData = (dayData) => {
    const temps = dayData.map((entry) => entry.main.temp);
    const avgTemp = (temps.reduce((a, b) => a + b, 0) / temps.length).toFixed(1);
    const description = dayData[0].weather[0].description;
    return { avgTemp, description };
  };

  return (
    <div className="mt-6 w-full max-w-md bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Weekly Forecast</h2>
      <div className="space-y-4">
        {Object.keys(dailyForecast).map((date) => {
          const dayData = getDailyData(dailyForecast[date]);
          return (
            <div key={date} className="flex justify-between items-center">
              <p className="text-lg font-medium">{getDayOfWeek(date)}</p>
              <p className="capitalize">{dayData.description}</p>
              <p className="text-lg">{dayData.avgTemp}°C</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default WeeklyForecast;