import { NavLink } from 'react-router-dom';
import NavbarCSS from './Navbar.module.css';

function Navbar() {
  return (
    <nav className={NavbarCSS.navbar}>
      <div className={NavbarCSS.wrap}>
        <div className={NavbarCSS.title}>근태 관리</div>
        <ul className={NavbarCSS.submenu}>
          <li>
            <NavLink to="/" activeClassName={NavbarCSS.active} exact>
              내 근태현황
            </NavLink>
          </li>
          <li>
            <NavLink to="/" activeClassName={NavbarCSS.active}>
              연차 신청
            </NavLink>
          </li>
          <li>
            <NavLink to="/" activeClassName={NavbarCSS.active}>
              연차 신청 목록
            </NavLink>
          </li>
          <li>
            <NavLink to="/" activeClassName={NavbarCSS.active}>
              연차 내역
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;