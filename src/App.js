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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-200 to-blue-300">
      <div className="bg-white rounded-lg shadow-md p-6 sm:p-10 lg:p-10 bg-gradient-to-r from-blue-400 to-blue-300-300 text-gray-black">
        {weatherData ? (
          <div>
            <p className="text-sm md:text-base lg:text-lg">
              Location: {weatherData.name}
            </p>
            {weatherData.main ? (
              <div>
                <p className="text-sm md:text-base lg:text-lg">
                  Temperature: {weatherData.main.temp} °C
                </p>
                <p className="text-sm md:text-base lg:text-lg">
                  Humidity: {weatherData.main.humidity}%
                </p>
                <p className="text-sm md:text-base lg:text-lg">
                  Description: {weatherData.weather[0].description}
                </p>
              </div>
            ) : null}
          </div>
        ) : (
          <p className="text-sm md:text-base lg:text-lg">
            Loading weather data...
          </p>
        )}
      </div>
    </div>
  );
}

export default App;
