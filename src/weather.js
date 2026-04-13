import { useEffect, useState } from "react";
import {
  FaWind,
  FaSun,
  FaMoon,
  FaTint,
  FaEye,
  FaCompressArrowsAlt,
} from "react-icons/fa";

export default function App() {
  const [query, setQuery] = useState("kabul");
  const [weather, setWeather] = useState(null);

  useEffect(
    function () {
      async function fetchData() {
        const res = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=cf99de316a3e5a389fcf130d6ac53011&units=metric`,
        );
        const data = await res.json();
        setWeather(data);
        console.log(data);
      }
      fetchData();
    },
    [query, setWeather],
  );
  return (
    <>
      <CityName query={query} onSetQuery={setQuery} />
      <WeatherBox query={query} weather={weather} />
    </>
  );
}

function CityName({ onSetQuery }) {
  const [cityName, setCityName] = useState("");

  function handleCityName(Value) {
    setCityName(Value);
  }
  function handleQuery() {
    onSetQuery(cityName);
    setCityName("");
  }
  return (
    <div className="flex justify-center  w-1/2 mx-auto m-5">
      <input
        className="border border-gray-300 w-full rounded-l-md p-2 placeholder-gray-400 focus:outline-none  "
        value={cityName}
        placeholder="search the city..."
        onChange={(e) => handleCityName(e.target.value)}
      ></input>
      <button
        className="text-sm text-white pl-2 pr-2 bg-orange-500 font-semibold rounded-r-md hover:bg-orange-600 transition-colors duration-300"
        onClick={handleQuery}
      >
        Search
      </button>
    </div>
  );
}

function WeatherBox({ weather }) {
  console.log(weather);

  return (
    <div className="w-[400px] mx-auto p-2 shadow rounded-2xl ">
      <MainTemp weather={weather} />
      <WeatherDetails weather={weather} />
    </div>
  );
}

function MainTemp({ weather }) {
  return (
    <div className=" relative">
      <img
        className="rounded-xl h-[200px] w-full"
        src="/cities/kabul-2.jpg"
      ></img>
      <div className="absolute bottom-3 left-4 text-white font-semibold flex justify-between w-full ">
        <h2 className="text-5xl ">{Math.round(weather?.main?.temp)}°</h2>

        <div className="pr-7 text-xl font-medium">
          <p className="">
            {weather?.weather?.map((item) => item.description)}
          </p>
          <p>Feels like {Math.round(weather?.main?.feels_like)}°</p>
        </div>
      </div>
      <p className="absolute top-5 right-4 text-white text-sm font-medium ">
        {new Date(weather?.dt * 1000).toLocaleTimeString()}
      </p>
    </div>
  );
}

function WeatherDetails({ weather }) {
  return (
    <div
      key={weather?.id}
      className="grid grid-cols-3 gap-2 mt-3 text-sm p-1 justify-center text-center font-medium text-slate-600"
    >
      <p className="bg-orange-100 rounded-xl p-1 ">
        <span className="block text-stone-600  text-sm">
          <FaWind className="inline pr-1 text-lg" />
          Wind
        </span>
        {weather?.wind.speed} m/s
      </p>
      <p className="bg-orange-100 rounded-xl p-1 ">
        <span className="block text-stone-600  text-sm">
          <FaTint className="inline pr-1 text-base" />
          Humidity
        </span>
        {weather?.main?.humidity} %
      </p>
      <p className="bg-orange-100 rounded-xl p-1">
        <span className="block text-stone-600  text-sm">
          <FaEye className="inline pr-1 text-lg" />
          Visibility
        </span>
        {weather?.visibility / 1000} km
      </p>
      <p className="bg-orange-100 rounded-xl p-1">
        <span className="block text-stone-600  text-sm">
          <FaCompressArrowsAlt className="inline pr-1 text-base" />
          Pressure
        </span>
        {weather?.main?.pressure} hPa
      </p>
      <p className="bg-orange-100 rounded-xl p-1">
        <span className="block text-stone-600  text-sm">
          <FaSun className="inline pr-1 text-lg" />
          Sunrise
        </span>
        {new Date(weather?.sys?.sunrise * 1000).toLocaleTimeString()}
      </p>
      <p className="bg-orange-100 rounded-xl p-1">
        <span className="block text-stone-600  text-sm">
          <FaMoon className="inline pr-1 text-base" />
          Sunset
        </span>
        {new Date(weather?.sys?.sunset * 1000).toLocaleTimeString()}
      </p>
    </div>
  );
}
