import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Weather = () => {
  const [temp, setTemp] = useState(0);
  const [temp_max, setTempMax] = useState(0);
  const [temp_min, setTempMin] = useState(0);
  const [humidity, setHumidity] = useState(0);
  const [desc, setDesc] = useState('');
  const [icon, setIcon] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const cityName = 'Seoul';
      const apiKey = process.env.REACT_APP_WEATHER_KEY;
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}`;

      try {
        const response = await axios.get(url);
        const data = response.data;
        setTemp(data.main.temp);
        setTempMax(data.main.temp_max);
        setTempMin(data.main.temp_min);
        setHumidity(data.main.humidity);
        setDesc(data.weather[0].description);
        setIcon(data.weather[0].icon);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  const imgSrc = `https://openweathermap.com/img/w/${icon}.png`;

  if (loading) {
    return <p>Loading</p>;
  } else {
    return (
      <>
        <div>
          오늘의 온도 : {(temp - 273.15).toFixed(0)}°
        </div>
        <div>
            <img src={imgSrc} />
            {/* 날씨 표현 */}
            {desc}
        </div>
        <div>
            최고: {(temp_max - 273.15).toFixed(0)}° 최저: {(temp_min - 273.15).toFixed(0)}°
        </div>
        <div>
            {/* 습도 */}
            {humidity}
        </div>
      </>
    );
  }
};

export default Weather;
