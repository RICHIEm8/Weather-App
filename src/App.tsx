import React, { useState } from 'react';

const api = {
  key: 'f619044f2a7804b6aa0cef3ab613b56e',
  base: 'https://api.openweathermap.org/data/2.5/',
};

interface WeatherResponse {
  name: string;
  sys: { country: string };
  main: { temp: number };
  weather: [{ main: string }];
  cod: number;
  message?: string;
}

const App: React.FC = () => {
  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState<WeatherResponse | null>(null);
  const [error, setError] = useState<string | undefined>(undefined);

  const search = (evt: React.KeyboardEvent<HTMLInputElement>) => {
    if (evt.key === 'Enter') {
      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
        .then((res) => res.json())
        .then((result) => {
          if (result.cod !== 200) {
            setError(result.message);
          } else {
            setWeather(result);
          }
          setQuery('');
        });
    }
  };

  return (
    <div className="app">
      <main>
        <div className="search-box">
          <input
            type="text"
            className="search-bar"
            placeholder="Search..."
            onChange={(e) => setQuery(e.target.value)}
            value={query}
            onKeyPress={search}
          />
        </div>
        {weather ? (
          <div>
            <div className="location-box">
              <div className="location">
                {weather.name}, {weather.sys?.country}
              </div>
              <div className="date">{new Date().toDateString()}</div>
            </div>
            <div className="weather-box">
              <div className="temp">{Math.round(weather.main?.temp)}°c</div>
              <div className="weather">{weather?.weather[0]?.main}</div>
            </div>
          </div>
        ) : null}
        {error ? <div style={{ textAlign: 'center', fontSize: '50px' }}>{error}</div> : null}
      </main>
    </div>
  );
};

export default App;
