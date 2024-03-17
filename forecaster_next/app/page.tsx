'use client';

import { useState } from 'react';
import 'tailwindcss/tailwind.css';

interface WeatherData { // to define it's type  // setData is a function which take data parameter which can be WeatherData or null and return void
  name: string;
  main: {
    temp: number;
  };
}

const apiKey = "312abfd953c970ceaf81f671079f6e22";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

async function checkWeather(city: string, setData: (data: WeatherData | null) => void, setError: (error: string | null) => void) {
  try {
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
    
    if (response.status === 404) {
      setError("City not found");
      setData(null); // change it to null so weatherData won't run
    } 
    else {
      const data: WeatherData = await response.json();
      setData(data);
      setError(null); // change it to null so error won't run
    }
  } catch (error) {
    console.error("Error fetching data:", error);
    setError("Error fetching data");
    setData(null); // Clear the data
  }
}  

export default function Home() {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [error, setError] = useState<string | null>(null);


  return (
    <>
    <div className="container mx-auto">
      <p className="text-2xl font-bold">Check City Weather</p>
      <input
        className="border border-gray-300 rounded-md p-2 mt-2"
        type='text'
        placeholder='Enter City Name'
        value={city}
        onChange={(event) => setCity(event.target.value)}
      />
      <button 
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-2"
        onClick={() => {checkWeather(city, setWeatherData, setError)}}
      >
        Search
      </button>

      {error ? ( <p className="text-red-500">{error}</p> ) : weatherData ? 
      (
        <div className="mt-2">
          <p className="font-semibold">{weatherData.name}</p>
          <p className="text-xl">{Math.round(weatherData.main.temp)}°C</p>
        </div>
      ) : null}
        
    </div>
  </>
  );
}
