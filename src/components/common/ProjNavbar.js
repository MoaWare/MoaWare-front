import { NavLink } from 'react-router-dom';
import NavbarCSS from './ProjNavbar.module.css';

function ProjNavbar() {
  return (
    <nav className={NavbarCSS.navbar}>
      <div className={NavbarCSS.wrap}>
        <div className={NavbarCSS.title}>프로젝트</div>
        <ul className={NavbarCSS.submenu}>
          <li>
            <NavLink to="/" activeclassname={NavbarCSS.active}>
              프로젝트 생성
            </NavLink>
          </li>
          <li>
            <NavLink to="/" activeclassname={NavbarCSS.active} exact="ture">
              진행 중 프로젝트 {}
            </NavLink>
          </li>
          <li>
            <NavLink to="/" activeclassname={NavbarCSS.active}>
              완료한 프로젝트 {}
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default ProjNavbar;