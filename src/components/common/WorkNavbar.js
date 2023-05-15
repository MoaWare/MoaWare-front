import { NavLink } from 'react-router-dom';
import WorkNavbarCSS from './WorkNavbar.module.css';

function Navbar() {
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
        <div>
          <p className={WorkNavbarCSS.p}>근태 관리</p>
          <p className={WorkNavbarCSS.ptime}>01 : 23 : 45</p>
          <div className={WorkNavbarCSS.workBtn}>
          <button className={WorkNavbarCSS.workBtn1}>출근하기</button>
          <button className={WorkNavbarCSS.workBtn2}>퇴근하기</button>
          </div>
          <div className={WorkNavbarCSS.p2}>
          <p className={WorkNavbarCSS.ptime2}>출근 시간 09:00:00</p>
          <p className={WorkNavbarCSS.ptime2}>퇴근 시간 미등록</p>
          <p className={WorkNavbarCSS.ptime2}>필요 근무 시간 99:99:99</p>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;