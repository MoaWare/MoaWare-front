import { NavLink } from 'react-router-dom';
import NavbarCSS from './AdminNavbar.module.css';

function AdminNavbar() {
    return (
        <nav className={NavbarCSS.navbar}>
            <div className={NavbarCSS.wrap}>
                <div className={NavbarCSS.title}>관리자</div>
                <ul className={NavbarCSS.submenu}>
                    <li>
                        <NavLink to="" activeclassname={NavbarCSS.active} exact="ture">
                            Home
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/admin/emp/list" activeclassname={NavbarCSS.active}>
                            계정 관리
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/" activeclassname={NavbarCSS.active}>
                            권한 관리
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/admin/board/list" activeclassname={NavbarCSS.active}>
                            게시판 관리
                        </NavLink>
                    </li>

                </ul>
            </div>
        </nav>
    );
}

export default AdminNavbar;