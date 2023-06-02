import NavbarCSS from './Navbar.module.css';
import Weather from '../../pages/weather/Weather';

import WorkBtn from '../Work/WorkBtn';
import { callWorkMyListAPI } from '../../apis/WorkAPICalls';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { callMyWorkAPI } from '../../apis/WorkStatusAPICalls';

function Navbar() {

  const [currentPage, setCurrentPage] = useState(1);
  const [year2, setYear2] = useState(new Date().getFullYear());
  const [month2, setMonth2] = useState(new Date().getMonth() + 1);
  const dispatch = useDispatch();
  const { work } = useSelector(state => state.workReducer);

  const { wDay } = useSelector(state => state.workStatusReducer);
  const today = new Date();

  const formattedDate = formatDate(today);
  // const [formattedDate, setFormattedDate] = useState(null);

  function formatDate(date) {
      const year = date.getFullYear();
      //월은 더하기 1 .padStart는 ???
      const month = String(date.getMonth() + 1).padStart(2, "0"); // 월은 0부터 시작하므로 +1을 해줌
      const day = String(date.getDate()).padStart(2, "0");

      return `${year}-${month}-${day}`;
  }

  useEffect(() => {
      dispatch(callMyWorkAPI({ workDate : formattedDate }));
  },[])

  console.log(wDay);
  useEffect(() => {
    if (wDay && wDay.data) {
      console.log('1번');
      if (wDay.data.workTime && !wDay.data.quitTime) {
        const timeString = new Date(wDay.data.workTime);
        localStorage.setItem('clickTime', timeString);
        localStorage.setItem('workbtn', true);
        console.log('2번');
      } else if (wDay.data.workTime && wDay.data.quitTime) {
        console.log('3번');
        localStorage.removeItem('clickTime');
        localStorage.removeItem('workbtn');
      } else {
        return;
      }
    } else {
      return;
    }
  }, [wDay, formattedDate, currentPage]);
  
  useEffect(() => {

    if (year2 && month2) {
        if (month2 < 10) {
            const month = '0' + month2.toString()
            const workDate = year2.toString() + '-' + month;
            console.log(workDate);
            dispatch(callWorkMyListAPI({ workDate, currentPage }));
        } else {
            const workDate = year2.toString() + month2.toString();
            console.log(workDate);
            dispatch(callWorkMyListAPI({ workDate, currentPage }));
        }
    }

}, [currentPage, formattedDate, wDay]);


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