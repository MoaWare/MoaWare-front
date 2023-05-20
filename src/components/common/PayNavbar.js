import { NavLink, useLocation } from 'react-router-dom';
import NavbarCSS from './PayNavbar.module.css';

function PayNavbar() {

  const location = useLocation();

  return (
    <nav className={NavbarCSS.navbar}>
      <div className={NavbarCSS.wrap}>
        <div className={NavbarCSS.title}>전자 결재</div>
        <ul className={NavbarCSS.submenu}>

          <li className={location.pathname === '/pay/draft' ? NavbarCSS.active : {}}>
            <NavLink to="/pay/draft" activeclassname={NavbarCSS.active} exact="ture">
                기안문 작성
            </NavLink>
          </li>
          <li className={location.pathname === '/pay/wait' ? NavbarCSS.active : {}}>
            <NavLink to="/payWait" activeclassname={NavbarCSS.active}>
                결재 대기함
            </NavLink>
          </li>
          <li className={location.pathname === '/pay/ing' ? NavbarCSS.active : {}}>
            <NavLink to="/pay/paying" activeclassname={NavbarCSS.active}>
                결재 진행함
            </NavLink>
          </li>
          <li className={location.pathname === '/pay/completed' ? NavbarCSS.active : {}}>
            <NavLink to="/pay/completed" activeclassname={NavbarCSS.active}>
                완료 문서함
            </NavLink>
          </li>
          <li className={location.pathname === '/pay/refuse' ? NavbarCSS.active : {}}>
            <NavLink to="/pay/refuse" activeclassname={NavbarCSS.active}>
                반려 문서함
            </NavLink>
          </li>
          <li className={location.pathname === '/pay/storage' ? NavbarCSS.active : {}}>
            <NavLink to="/pay/storage" activeclassname={NavbarCSS.active}>
                임시 저장함
            </NavLink>
          </li>
          <li className={location.pathname === '/pay/sign' ? NavbarCSS.active : {}}>
            <NavLink to="/pay/sign" activeclassname={NavbarCSS.active}>
                서명 관리
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default PayNavbar;