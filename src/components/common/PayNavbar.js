import { NavLink, useLocation } from 'react-router-dom';
import NavbarCSS from './PayNavbar.module.css';

function PayNavbar() {

  const location = useLocation();

  return (
    <nav className={NavbarCSS.navbar}>
      <div className={NavbarCSS.wrap}>
        <NavLink to="/pay" activeclassname={NavbarCSS.active} exact="ture">
          <div className={NavbarCSS.title}>전자 결재</div>
        </NavLink>
        <ul className={NavbarCSS.submenu}>

          <NavLink to="/pay/draft" activeclassname={NavbarCSS.active} exact="ture">
            <li className={location.pathname === '/pay/draft' ? NavbarCSS.active : {}}>
                  기안문 작성
            </li>
          </NavLink>

          <NavLink to="/pay/wait" activeclassname={NavbarCSS.active}>
            <li className={location.pathname === '/pay/wait/' || location.pathname.includes('/pay/PaymentWaitDetail') ? NavbarCSS.active : {}}>
                  결재 대기함
            </li>
          </NavLink>

          <NavLink to="/pay/paying" activeclassname={NavbarCSS.active}>
            <li className={location.pathname === '/pay/paying' || location.pathname.includes('/pay/payPayingDetail') ? NavbarCSS.active : {}}>
                  결재 진행함
            </li>
          </NavLink>
            
          <NavLink to="/pay/completed" activeclassname={NavbarCSS.active}>
            <li className={location.pathname === '/pay/completed' || location.pathname.includes('/pay/payCompletedDetail') ? NavbarCSS.active : {}}>
                  완료 문서함
            </li>
          </NavLink>

            <NavLink to="/pay/refuse" activeclassname={NavbarCSS.active}>
          <li className={location.pathname === '/pay/refuse' || location.pathname.includes('/pay/payRefuseDetail') ? NavbarCSS.active : {}}>
                반려 문서함
          </li>
            </NavLink>

          <NavLink to="/pay/storage" activeclassname={NavbarCSS.active}>
            <li className={location.pathname === '/pay/storage' || location.pathname.includes('/pay/payStorageDetail') ? NavbarCSS.active : {}}>
                  임시 저장함
            </li>
          </NavLink>

          <NavLink to="/pay/sign" activeclassname={NavbarCSS.active}>
            <li className={location.pathname === '/pay/sign' ? NavbarCSS.active : {}}>
                  서명 관리
            </li>
          </NavLink>
        </ul>
      </div>
    </nav>
  );
}

export default PayNavbar;