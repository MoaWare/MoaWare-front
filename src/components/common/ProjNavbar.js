import { NavLink, useLocation } from 'react-router-dom';
import NavbarCSS from './ProjNavbar.module.css';

function ProjNavbar() {

  const location = useLocation();

  return (
    <nav className={NavbarCSS.navbar}>
      <div className={NavbarCSS.wrap}>
        <div className={NavbarCSS.title}>프로젝트</div>
        <ul className={NavbarCSS.submenu}>
          <NavLink to="/project/createProject" activeclassname={NavbarCSS.active}>
            <li className={location.pathname === '/project/createProject' ? NavbarCSS.active : {}}>
              프로젝트 생성
            </li>
          </NavLink>
          <NavLink to="/project" activeclassname={NavbarCSS.active} exact="ture">
            <li className={location.pathname === '/project' ? NavbarCSS.active : {}}>
              진행 중 프로젝트 { }
            </li>
          </NavLink>
          <NavLink to="/project/done" activeclassname={NavbarCSS.active}>
            <li className={location.pathname === '/project/done' ? NavbarCSS.active : {}}>
              완료한 프로젝트 { }
            </li>
          </NavLink>
        </ul>
      </div>
    </nav>
  );
}

export default ProjNavbar;