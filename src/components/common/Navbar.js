import NavbarCSS from './Navbar.module.css';
import Weather from '../../pages/weather/Weather';

import WorkBtn from '../Work/WorkBtn';
import { callWorkMyListAPI } from '../../apis/WorkAPICalls';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { callMyWorkAPI } from '../../apis/WorkStatusAPICalls';
import { callHeaderNameAPI } from '../../apis/EmployeeAPICalls';
import { callMemberInfoAPI } from "../../apis/MemberAPICalls";
import { setBtnState } from '../../modules/WorkTimeModule';

function Navbar() {

  const dispatch = useDispatch();
  const { name } = useSelector(state=> state.employeeReducer);
    
  useEffect(() => {
    dispatch(callHeaderNameAPI());
    console.log("Header name: ",name);
  }, [])

  // const { member } = useSelector((state) => state.memberReducer);
  const { info } = useSelector((state) => state.memberReducer);

  /* 회원 정보 조회 */
  useEffect(() => {
    dispatch(callMemberInfoAPI());
  },[]);

  const [imageUrl, setImageUrl] = useState('');
  const [ file, setFile ] = useState({ });

  useEffect(() => {
    
    if(info){
        info.fileCategory.forEach((file) => {
            if(file.fcategoryType === 'emp'){
                setFile(file);
                return;
            }
        });
    }
  }, [info]);

  console.log("file",file?.file?.filePath);

  const [currentPage, setCurrentPage] = useState(1);
  const [year2, setYear2] = useState(new Date().getFullYear());
  const [month2, setMonth2] = useState(new Date().getMonth() + 1);
  const { work } = useSelector(state => state.workReducer);
  const { login } = useSelector(state => state.employeeReducer);
  const { wDay } = useSelector(state => state.workStatusReducer);
  const today = new Date();
  const btn = useSelector(state => state.workTimeReducer.btn);

  const formattedDate = formatDate(today);


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

  useEffect(() => {
    if (wDay && wDay.data !== null && wDay.data !== undefined) {
      if (wDay.data.workTime && !wDay.data.quitTime) {
        const timeString = new Date(wDay.data.workTime);
        localStorage.setItem('clickTime', timeString);
        localStorage.setItem('workbtn', true);
      } else if (wDay.data.workTime && wDay.data.quitTime) {
        localStorage.removeItem('clickTime');
        localStorage.removeItem('workbtn');
      } else {
        return;
      }
    } else {
      localStorage.setItem('workbtn', false);
      return; // data가 null인 경우 리턴문 실행
    }
  }, [wDay, formattedDate, currentPage]);
  
  useEffect(() => {

    if (year2 && month2) {
      if (month2 < 10) {
          const month = '0' + month2.toString()
          const workDate = year2.toString() + '-' + month;
          dispatch(callWorkMyListAPI({ workDate, currentPage }));
      } else {
          const workDate = year2.toString() + month2.toString();
          dispatch(callWorkMyListAPI({ workDate, currentPage }));
      }
    }

  }, [currentPage, formattedDate, wDay]);


  // return info && (
  return (
    <nav className={NavbarCSS.navbar}>
      <div className={NavbarCSS.wrap}>
        <div className={NavbarCSS.profile}>프로필</div>
        <div className={NavbarCSS.myInfo}>
          <div className={NavbarCSS.proimg}>
            <img 
              src={ !imageUrl ? file?.file?.filePath : imageUrl } 
              className={ NavbarCSS.memberImage } 
              alt="profile"
            />
          </div>
          {/* <img src="./icon/user.jpg" /> */}
          {/* <img src="./icon/profile.jpg" /> */}
          <div className={NavbarCSS.team}>{ info?.dept?.deptName }</div>
          {/* <div className={NavbarCSS.name}>{ name && <span> {name}님</span> }</div> */}
          <div className={NavbarCSS.name}>{ info?.empName } { info?.job?.jobName }</div>
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