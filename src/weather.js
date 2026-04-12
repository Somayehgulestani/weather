import { useEffect, useState } from "react";
import { FaWind, FaTemperatureHigh, FaSun } from "react-icons/fa";

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
      <Weather query={query} weather={weather} />
    </>
  );
}

function CityName({ query, onSetQuery }) {
  const [cityName, setCityName] = useState("");

  function handleCityName(Value) {
    setCityName(Value);
  }
  function handleQuery() {
    onSetQuery(cityName);
    setCityName("");
  }
  return (
    <div>
      <input
        className="border border-gray-300 rounded-md p-2 m-5 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-fuchsia-700 focus:border-transparent"
        value={cityName}
        placeholder="Enter your city..."
        onChange={(e) => handleCityName(e.target.value)}
      ></input>
      <button onClick={handleQuery}>Search</button>
    </div>
  );
}

function Weather({ query, weather }) {
  console.log(weather);

  return (
    <div className="w-[400px] mx-auto p-2 shadow ">
      <div className=" ">
        <img
          className="rounded-xl h-[200px] w-full"
          src="/cities/kabul-2.jpg"
        ></img>
      </div>
      <div>
        <div
          key={weather?.id}
          className="flex gap-2 mt-3 text-sm p-1 justify-centerz"
        >
          <h2 className="bg-orange-100 rounded-xl p-1">
            City: {weather?.name}
          </h2>
          <h2 className="bg-orange-100 rounded-xl p-1">
            temp: {weather?.main?.feels_like}
          </h2>
          <h2 className="bg-orange-100 rounded-xl p-1">
            <FaWind />
            <FaTemperatureHigh />
            <FaSun />
            wind: {weather?.wind?.speed}
          </h2>
        </div>
      </div>
    </div>
  );
}
