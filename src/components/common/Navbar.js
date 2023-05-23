import NavbarCSS from './Navbar.module.css';
import Weather from '../../pages/weather/Weather';

import WorkBtn from '../Work/WorkBtn';

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
        <WorkBtn />
      </div>

      <div className={NavbarCSS.wrap2}>
        <div className={NavbarCSS.weather}>오늘의 날씨</div>
        <div className={NavbarCSS.myWeather}>
          <Weather />
        </div>
      </div>
    </nav>
  );
}

export default Navbar;