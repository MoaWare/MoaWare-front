import { NavLink, useNavigate } from 'react-router-dom';
import WorkNavbarCSS from './WorkNavbar.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { callTimeInsertAPI, callTimeQuitAPI, } from '../../apis/WorkAPICalls';
import WorkTime from '../Work/WorkTime';
import { isAdmin } from '../../utils/TokenUtils';
// import { setBtnState } from '../../modules/WorkTimeModule';

function WorkNavbar() {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { myWork } = useSelector(state => state.workReducer);
  // const [ btn, setBtn ] = useState(false);
  // true와 비교했을대 true라면 true 반환 아니라면false 반환
  // const [btn, setBtn] = useState(localStorage.getItem('btn') === 'true' || false);
  const btn = useSelector(state => state.workTimeReducer.btn);
  const { insert } = useSelector(state => state.workReducer);
  const { quit } = useSelector(state => state.workReducer);
  //변수를 함수 안에 넣은 이유 함수 밖에서 같이 쓰면 오류남
  const onClickStartTime = () => {

    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0")
    const workDate = `${year}-${month}-${day}`
    dispatch(callTimeInsertAPI({ workDate }));
  }
  const onClickEndTime = () => {

    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const min = now.getMinutes().toString().padStart(2, '0');
    const sec = now.getSeconds().toString().padStart(2, '0');

    const quitTime = new Date().toISOString().substr(0, 11) + `${hours}:${min}:${sec}`;
    console.log(quitTime);
    dispatch(callTimeQuitAPI({ quitTime }));
  }

  // useEffect(
  //   () => {
  //     if (insert?.status === 200) {
  //       alert('출근 등록 되었습니다.')
  //       navigate("/work");
  //     } else if (insert?.state === 400) {
  //       alert(insert.message);
  //     }

  //     if (quit?.status === 200) {
  //       alert('퇴근 등록 되었습니다.')
  //       navigate("/work")
  //     } else if (quit?.state === 400) {
  //       alert(quit.message);
  //     }
  //   }, [insert, quit]
  // )

  console.log('insert : ', insert);
  console.log('btn : ', btn);

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
          {isAdmin() && (
            <li>
              <NavLink to="/work/admin" activeclassname="active">
                직원 일일 근태 현황
              </NavLink>
            </li>
          )}
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
        {/* myWork객체가 있다면  */}
        {myWork ? (
          <div>
            <p className={WorkNavbarCSS.p}>[ 근태 관리 ]</p>
            <div className={WorkNavbarCSS.ptime}></div>
            <div className={WorkNavbarCSS.workBtn}>
              <WorkTime
                onClickStartHandler={onClickStartTime}
                onClickEndHandler={onClickEndTime}
              // btn={btn}
              />
            </div>
            {/* data 객체가 있다면 */}
            {myWork.data && myWork.data.length > 0 ? (
            /* 원래 유명님의 코드 */
              // <div className={WorkNavbarCSS.p2} key={myWork.data[0].workPk.workTime}>
              //   <p className={WorkNavbarCSS.ptime2}>출근 시간 {myWork.data[0].workTime ? myWork.data[0].workTime.substring(11, 19) : ""}</p>
              //   <p className={WorkNavbarCSS.ptime2}>퇴근 시간 {myWork.data[0].quitTime ? myWork.data[0].quitTime.substring(11, 19) : ""}</p>
              // </div>
            /* 효진 수정 코드 */
            <div className={WorkNavbarCSS.p2} key={myWork.data[0].workPk.workTime}>
              <div>
                <p className={WorkNavbarCSS.ptime2}>출근시간</p>
                <p className={WorkNavbarCSS.ptime2}>{myWork.data[0].workTime ? myWork.data[0].workTime.substring(11, 19) : ""}</p>
              </div>
              <div>
                <p className={WorkNavbarCSS.ptime2}>퇴근시간</p>
                <p className={WorkNavbarCSS.ptime2}>{myWork.data[0].quitTime ? myWork.data[0].quitTime.substring(11, 19) : ""}</p>
              </div>
            </div>
            ) : 
            // data객체가 없다면
            (
              <div>
                <p></p>
              </div>
            )}
          </div>
        ) : 
        // mywork 가없다면
        (
          <div>
            {/* <p className={WorkNavbarCSS.p}>근태 관리</p>
            <div className={WorkNavbarCSS.ptime}></div>
            <div className={WorkNavbarCSS.workBtn}>
              <WorkTime
                onClickStartHandler={onClickStartTime}
                onClickEndHandler={onClickEndTime}
              // btn={btn}
              />
            </div>
              <div className={WorkNavbarCSS.p2}>
                <p className={WorkNavbarCSS.ptime2}>출근 시간</p>
                <p className={WorkNavbarCSS.ptime2}>퇴근 시간</p>
              </div> */}
          </div>
        )}
      </div>
    </nav>
  );
}

export default WorkNavbar;