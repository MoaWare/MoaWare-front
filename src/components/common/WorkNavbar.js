import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import WorkNavbarCSS from './WorkNavbar.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { callTimeInsertAPI, callTimeQuitAPI, } from '../../apis/WorkAPICalls';
import WorkTime from '../Work/WorkTime';
import { isAdmin } from '../../utils/TokenUtils';


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
  const location = useLocation();
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
    dispatch(callTimeQuitAPI({ quitTime }));
  }



  return (
    <nav className={WorkNavbarCSS.navbar}>
      <div className={WorkNavbarCSS.wrap}>
        <div className={WorkNavbarCSS.title}>근태 관리</div>
        <ul className={WorkNavbarCSS.submenu}>
          <NavLink to="/work" activeClassName="active" exact="true">
            <li className={location.pathname === '/work' ? WorkNavbarCSS.active : {}}>
              내 근태현황
            </li>
          </NavLink>
          {isAdmin() && (
            <NavLink to="/work/admin" activeClassName={WorkNavbarCSS.active} exact="ture">
              <li className={location.pathname === '/work/admin' ? WorkNavbarCSS.active : {}}>
                직원 일일 근태 현황
              </li>
            </NavLink>
          )}
          <NavLink to="/work/restReq" activeClassName={WorkNavbarCSS.active} exact="ture">
            <li className={location.pathname === '/work/restReq' ? WorkNavbarCSS.active : {}}>
              연차 신청
            </li>
          </NavLink>
          <NavLink to="/work/restReqList" activeClassName={WorkNavbarCSS.active} exact="ture">
            <li className={location.pathname === '/work/restReqList' ? WorkNavbarCSS.active : {}}>
              연차 신청 목록
            </li>
          </NavLink>
          <NavLink to="/work/restList" activeClassName={WorkNavbarCSS.active} exact="ture">
            <li className={location.pathname === '/work/restList' ? WorkNavbarCSS.active : {}}>
              연차 내역
            </li>
          </NavLink>
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
            </div>
          )}
      </div>
    </nav>
  );
}

export default WorkNavbar;
