import { NavLink } from 'react-router-dom';
import NavbarCSS from './Navbar.module.css';
import Weather from '../../pages/weather/Weather';

function Navbar() {
  return (
    <nav className={NavbarCSS.navbar}>
      <div className={NavbarCSS.wrap}>
        <div className={NavbarCSS.profile}>프로필</div>
        <div className={NavbarCSS.myInfo}>
          <img src="./icon/user.jpg" />
          {/* <img src="./icon/profile.jpg" /> */}
          <div className={NavbarCSS.team}>경영지원팀</div>
          <div className={NavbarCSS.name}>김모아님</div>
        </div>
          <div className={NavbarCSS.work}>근태관리</div>
          <div className={NavbarCSS.time}>0 1 : 2 3 : 4 5</div>
          <button className={NavbarCSS.workon}>출근하기</button>
          <button className={NavbarCSS.workdown}>퇴근하기</button>
        <div className={NavbarCSS.myWork}>
          <div className={NavbarCSS.worktime}>출근 시간</div>
          <div className={NavbarCSS.worktime}>퇴근 시간</div>
        </div>
      </div>
      <div className={NavbarCSS.wrap2}>
        <div className={NavbarCSS.weather}>오늘의 날씨</div>
        <div className={NavbarCSS.myWeather}>
          <Weather />
          {/* <div className={NavbarCSS.today}>5월 1일 월요일</div>
          <div className={NavbarCSS.local}>서울 특별시 종로구 인사동길 12</div>
          <div className={NavbarCSS.sky}>
            <img src="./icon/cloud.png"/>
            <div className={NavbarCSS.temperature}>16.8°<br/>구름 많음</div>
          </div>
          <div className={NavbarCSS.yesterday}>어제보다 1.2° 높아요</div> */}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;