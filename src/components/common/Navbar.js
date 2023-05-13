import { NavLink } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  return (
    <nav className="navbar">
      <div className='wrap'>
        <div className='title'>근태 관리</div>
        <ul className="submenu">
          <li>
            <NavLink to="/" activeclassname="active" exact='true' >
              내 근태현황
            </NavLink>
          </li>
          <li>
            <NavLink to="/" activeclassname="active">
              연차 신청
            </NavLink>
          </li>
          <li>
            <NavLink to="/" activeclassname="active">
              연차 신청 목록
            </NavLink>
          </li>
          <li>
            <NavLink to="/" activeclassname="active">
              연차 내역
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;