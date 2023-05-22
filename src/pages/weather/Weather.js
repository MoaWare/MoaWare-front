import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { TiWeatherSunny, TiWeatherStormy, TiWeatherShower, TiWeatherDownpour, TiWeatherSnow, TiWeatherCloudy } from 'react-icons/ti';
import { BsCloudFog } from 'react-icons/bs';
import WeatherCSS from './Weather.module.css';

const Weather = () => {
  const [temp, setTemp] = useState(0);
  const [temp_max, setTempMax] = useState(0);
  const [temp_min, setTempMin] = useState(0);
  const [humidity, setHumidity] = useState(0);
  const [desc, setDesc] = useState('');
  const [icon, setIcon] = useState('');
  const [loading, setLoading] = useState(true);
  const [location, setLocation] = useState(null);
  const [address, setAddress] = useState('');
  const date = new Date();

  const getFormattedDate = () => {
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const dayOfWeek = date.toLocaleString('ko-US', { weekday: 'long' });
    return `${month}월 ${day}일 ${dayOfWeek}`;
  };

  // .substring(10,3).replace('-','.');
  const getCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        let lat = position.coords.latitude;
        let lon = position.coords.longitude;
        console.log("Current location", lat, lon);
        setLocation({ lat, lon });
      },
      (error) => {
        console.log(error);
      },
      { enableHighAccuracy: true, timeout: 10000 }
    );
  };

  useEffect(() => {
    getCurrentLocation();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const apiKey = process.env.REACT_APP_WEATHER_KEY;
      const lang = 'kr';

      if (location) {
        let url = `https://api.openweathermap.org/data/2.5/weather?lat=${location.lat}&lon=${location.lon}&appid=${apiKey}&lang=${lang}`;

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

          // Fetch address using Kakao Maps API
          const kakaoApiKey = process.env.REACT_APP_KAKAO_MAPS_KEY;
          const kakaoUrl = `https://dapi.kakao.com/v2/local/geo/coord2address.json?x=${location.lon}&y=${location.lat}&input_coord=WGS84`;
          const kakaoOptions = {
            headers: {
              Authorization: `KakaoAK ${kakaoApiKey}`,
            },
          };

          const kakaoResponse = await axios.get(kakaoUrl, kakaoOptions);
          const kakaoData = kakaoResponse.data;
          const fullAddress = kakaoData.documents[0].address.address_name;
          setAddress(fullAddress);
        } catch (error) {
          console.log(error);
        }
      }
    };

    fetchData();
  }, [location]);

  const selectIcon = () => {
    let iconId = parseInt(icon);

    switch (iconId) {
      case 800:
        return <TiWeatherSunny />;
      case 2:
        return <TiWeatherStormy />;
      case 3:
        return <TiWeatherShower />;
      case 5:
        return <TiWeatherDownpour />;
      case 6:
        return <TiWeatherSnow />;
      case 7:
        return <BsCloudFog />;
      default:
        return <TiWeatherCloudy />;
    }
  };

  // const imgSrc = `https://openweathermap.com/img/w/${icon}.png`;

  if (loading) {
    return <div className={WeatherCSS.loading}>Loading . . .</div>;
  } else {
    return (
      <>
        <div className={WeatherCSS.today}>{getFormattedDate()}</div>
        <div className={WeatherCSS.addr}>{address}</div>
        <div className={WeatherCSS.myWeather}>
          <div className={WeatherCSS.icon}>{selectIcon()}</div>
          <div className={WeatherCSS.temperature}>
            <div className={WeatherCSS.now}>{(temp - 273.15).toFixed(0)}°</div>
            {/* <div>▴{(temp_max - 273.15).toFixed(0)}°▾{(temp_min - 273.15).toFixed(0)}°</div> */}
          </div>
        </div>
        {/* <div>습도 : {humidity}</div> */}
        <div className={WeatherCSS.comment}>현재 날씨는... {desc}</div>
      </>
    );
  }
};

export default Weather;