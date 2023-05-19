import { NavLink, useLocation } from 'react-router-dom';
import NavbarCSS from './OrgNavbar.module.css';

function OrgNavbar() {

  const location = useLocation();


  return (
    <nav className={NavbarCSS.navbar}>
      <div className={NavbarCSS.wrap}>
        <div className={NavbarCSS.title}>조직도</div>
        <ul className={NavbarCSS.submenu}>
        <li className={NavbarCSS.active}>
            <NavLink to="/org" activeclassname={NavbarCSS.active}>
              조직도
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default OrgNavbar;