import { NavLink } from 'react-router-dom';
import NavbarCSS from './PayNavbar.module.css';

function PayNavbar() {
  return (
    <nav className={NavbarCSS.navbar}>
      <div className={NavbarCSS.wrap}>
        <div className={NavbarCSS.title}>전자 결재</div>
        <ul className={NavbarCSS.submenu}>
          <li>
            <NavLink to="/pay" activeclassname={NavbarCSS.active} exact="ture">
                기안문 작성
            </NavLink>
          </li>
          <li>
            <NavLink to="/pay" activeclassname={NavbarCSS.active}>
                결재 대기함
            </NavLink>
          </li>
          <li>
            <NavLink to="/pay" activeclassname={NavbarCSS.active}>
                결재 진행함
            </NavLink>
          </li>
          <li>
            <NavLink to="/pay" activeclassname={NavbarCSS.active}>
                완료 문서함
            </NavLink>
          </li>
          <li>
            <NavLink to="/pay" activeclassname={NavbarCSS.active}>
                반려 문서함
            </NavLink>
          </li>
          <li>
            <NavLink to="/pay" activeclassname={NavbarCSS.active}>
                임시 저장함
            </NavLink>
          </li>
          <li>
            <NavLink to="/pay" activeclassname={NavbarCSS.active}>
                서명 관리
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default PayNavbar;