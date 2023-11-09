import React, { useEffect, useState } from "react";

function App() {
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    const fetchWeatherData = async () => {
      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(
          async (position) => {
            const { latitude, longitude } = position.coords;
            const apiKey = "e6d9f3b454f6acde9ae67aaad767a5fb"; // Replace with your OpenWeatherMap API key
            const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`;

            try {
              const response = await fetch(apiUrl);
              const data = await response.json();
              // Round up the temperature
              data.main.temp = Math.ceil(data.main.temp);
              setWeatherData(data);
            } catch (error) {
              console.error("Error fetching weather data", error);
              setWeatherData(null);
            }
          },
          (error) => {
            console.error("Geolocation error:", error);
            setWeatherData(null);
          }
        );
      } else {
        console.log("Geolocation is not available in this browser.");
        setWeatherData(null);
      }
    };

    fetchWeatherData();
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-200 to-blue-400">
      <div className="bg-white rounded-lg shadow-md p-9 w-1/6 transform transition-transform duration-500 hover:scale-105 bg-gradient-to-r from-gray-50-500 to-gray-600-700 text-black">
        {weatherData ? (
          <div>
            <p>Location: {weatherData.name}</p>
            {weatherData.main ? (
              <div>
                <p>Temperature: {weatherData.main.temp} °C</p>
                <p>Humidity: {weatherData.main.humidity}%</p>
                <p>Description: {weatherData.weather[0].description}</p>
              </div>
            ) : null}
          </div>
        ) : (
          <p>Loading weather data...</p>
        )}
      </div>
    </div>
  );
}

export default App;
