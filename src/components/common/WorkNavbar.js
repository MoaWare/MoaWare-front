import { NavLink, useNavigate } from 'react-router-dom';
import WorkNavbarCSS from './WorkNavbar.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { callTimeInsertAPI, callTimeQuitAPI,  } from '../../apis/WorkAPICalls';

function Navbar() {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { myWork } = useSelector(state => state.workReducer);

  console.log('myWork 네브바에서 콘솔', myWork);
  // const [ btn, setBtn ] = useState(0);
  const { insert } = useSelector(state => state.workReducer);
  const { quit } = useSelector(state => state.workReducer);

  let startTime;
  
  const onClickStartTime = () => {
    
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0")

    startTimer();
    const workDate = `${year}-${month}-${day}`
        dispatch(callTimeInsertAPI( {workDate} ));
  }

  useEffect(
    () => {
      if(insert?.status === 200) {
        alert('출근 등록 되었습니다.')
        navigate("/work");
      } else if (insert?.state === 400) {
        alert(insert.message);
      }

      if(quit?.status === 200) {
        alert('퇴근 등록 되었습니다.')
        navigate("/work")
      } else if (quit?.state === 400) {
        alert(quit.message);
      }
    }, [insert, quit ]
    )

    function startTimer() {
      let seconds = 0;
    
      setInterval(() => {
        const hours = Math.floor(seconds / 3600).toString().padStart(2, "0");
        const minutes = Math.floor((seconds % 3600) / 60).toString().padStart(2, "0");
        const formattedSeconds = (seconds % 60).toString().padStart(2, "0");
    
        console.log(`${hours}:${minutes}:${formattedSeconds}`);
    
        seconds++;
      }, 1000);
    }
    


  console.log('insert : ', insert);

  const onClickEndTime = () => {

    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const min = now.getMinutes().toString().padStart(2, '0');
    const sec = now.getSeconds().toString().padStart(2, '0');
    
    const quitTime = new Date().toISOString().substr(0, 11) + `${hours}:${min}:${sec}`;
    console.log(quitTime);
    dispatch(callTimeQuitAPI( {quitTime} ));
  }
  


  return (
    <nav className={WorkNavbarCSS.navbar}>
      <div className={WorkNavbarCSS.wrap}>
        <div className={WorkNavbarCSS.title}>근태 관리</div>
        <ul className={WorkNavbarCSS.submenu}>
          <li>
            <NavLink to="/work" activeclassname="active" exact="true">
              내 근태현황
            </NavLink>
          </li>
          <li>
            <NavLink to="/work/restReq" activeclassname="active">
              연차 신청
            </NavLink>
          </li>
          <li>
            <NavLink to="/work/restReqList" activeclassname="active">
              연차 신청 목록
            </NavLink>
          </li>
          <li>
            <NavLink to="/work/restList" activeclassname="active">
              연차 내역
            </NavLink>
          </li>
        </ul>
      </div>
      <div className={WorkNavbarCSS.wrap2}>
      {myWork && myWork.data && (
        <div>
          <p className={WorkNavbarCSS.p}>근태 관리</p>
          <p className={WorkNavbarCSS.ptime}>{}</p>
          <div className={WorkNavbarCSS.workBtn}>
          <button className={WorkNavbarCSS.workBtn1}

            onClick={ onClickStartTime }

          >
            출근하기
          </button>
          <button className={WorkNavbarCSS.workBtn2}
          
            onClick={ onClickEndTime }

          >
          
          퇴근하기
          
          </button>
          </div>
          {/* {myWork && myWork.data && ( */}
            <div className={WorkNavbarCSS.p2} key={myWork.data[0].workPk.workTime}>
              <p className={WorkNavbarCSS.ptime2}>출근 시간 {myWork.data[0].workTime.substring(11, 19)}</p>
              <p className={WorkNavbarCSS.ptime2}>퇴근 시간 { myWork.data[0].quitTime ? myWork.data[0].quitTime.substring(11, 19) : ""}</p>
              <p className={WorkNavbarCSS.ptime2}>필요 근무 시간 99:99:99</p>
            </div>
        </div>
          )}
      </div>
    </nav>
  );
}

export default Navbar;