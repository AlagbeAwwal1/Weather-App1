import { useState } from "react";
import axios from "axios";
import WeatherForm from "./components/WeatherForm";
import WeatherDisplay from "./components/WeatherDisplay";
import ErrorMessage from "./components/ErrorMessage";
import { Circles } from "react-loader-spinner";

const App = () => {
    const [weather, setWeather] = useState(null);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const fetchWeather = async (city) => {
      const apiKey = "435a722f64e400921d09211c0d4215cf";
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

      try {
          setLoading(true);
          const response = await axios.get(url);
          setWeather(response.data);
          setError("");
      } catch {
          setWeather(null);
          setError("City not found. Please try again.");
      } finally {
          setLoading(false);
      }
  };
    const fetchWeatherByLocation = () => {
      if (!navigator.geolocation) {
          setError("Geolocation is not supported by your browser.");
          return;
      }
  
      navigator.geolocation.getCurrentPosition(async (position) => {
          const { latitude, longitude } = position.coords;
          const apiKey = "435a722f64e400921d09211c0d4215cf"; // Replace with your actual API key
          const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`;
  
          try {
              setLoading(true);
              const response = await axios.get(url);
              console.log("Weather Data:", response.data); // For debugging
              setWeather(response.data);
              setError("");
          } catch (error) {
              console.error("Error fetching weather:", error.message);
              setWeather(null);
              setError(error.response?.data?.message || "Unable to fetch weather data.");
          } finally {
              setLoading(false);
          }
      });
  };
  
  const getBackgroundClass = () => {
    if (!weather || !weather.weather || weather.weather.length === 0) {
        return "bg-gray-100"; // Default background class
    }

    const mainWeather = weather.weather[0].main.toLowerCase();

    // Add more cases as needed
    switch (mainWeather) {
        case "clear":
            return "bg-blue-500"; // Clear weather background
        case "clouds":
            return "bg-gray-400"; // Cloudy weather background
        case "rain":
            return "bg-blue-800"; // Rainy weather background
        case "snow":
            return "bg-white"; // Snowy weather background
        default:
            return "bg-gray-100"; // Default background
    }
};

    return (
    <div className={`min-h-screen flex flex-col items-center justify-center p-4 ${getBackgroundClass()}`}>
        {loading && (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
                <Circles color="#4A90E2" height={80} width={80} />
            </div>
        )}
        <h1 className="text-2xl font-semibold mb-6">Simple Weather App</h1>
        <WeatherForm onCityChange={fetchWeather} />
        <button
            onClick={fetchWeatherByLocation}
            className="px-4 py-2 mt-4 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
        >
            Use My Location
        </button>
        {error && <ErrorMessage message={error} />}
        <WeatherDisplay weather={weather} />
    </div>
);
    
};

export default App;
