import { NavLink } from 'react-router-dom';
import NavbarCSS from './OrgNavbar.module.css';

function OrgNavbar() {
  return (
    <nav className={NavbarCSS.navbar}>
      <div className={NavbarCSS.wrap}>
        <div className={NavbarCSS.title}>조직도</div>
        <ul className={NavbarCSS.submenu}>
          <li>
            <NavLink to="/org" activeclassname={NavbarCSS.active} exact="ture">
              조직도
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default OrgNavbar;