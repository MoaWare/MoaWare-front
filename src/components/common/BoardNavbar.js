import { useEffect, useState } from 'react';
import BoardPostModal from '../modal/boardPostModal/BoardPostModal';

import { useNavigate  } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import NavbarCSS from './BoardNavbar.module.css';
import { useDispatch, useSelector } from 'react-redux';
//s
function BoardNavbar() {




    return (
        <nav className={NavbarCSS.navbar}>
            <div className={NavbarCSS.wrap}>
                <div className={NavbarCSS.title}>게시판</div>
                <ul className={NavbarCSS.submenu}>
                    <li>
                        <NavLink to="/boardPosts/boards/1" activeclassname={NavbarCSS.active}>
                            공지사항
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/boardPosts/boards/2" activeclassname={NavbarCSS.active}>
                            자유 게시판
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/boardPosts/boards/3" activeclassname={NavbarCSS.active}>
                            부서&직급 게시판
                        </NavLink>
                    </li>
                
                </ul>
            
                    <div className={NavbarCSS.boardPostButtonDiv}>
                    <button>
                        <NavLink to="/boardPosts/regist">
                        글 작성
                        </NavLink>
                    </button>
                    </div>

                
              
            </div>
        </nav>
    );
}

export default BoardNavbar;