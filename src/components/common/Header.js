import React, { useEffect, useState } from 'react';

import { Link, NavLink, useNavigate } from 'react-router-dom';
import HeaderCSS from './Header.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { getHeaderName } from '../../modules/EmployeeModule';
import { callHeaderNameAPI } from '../../apis/EmployeeAPICalls';
import { setBtnState } from '../../modules/WorkTimeModule';

const Header = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { name } = useSelector(state=> state.employeeReducer);
  const btn = useSelector(state => state.workTimeReducer.btn);

  useEffect(() => {
    dispatch(callHeaderNameAPI());
  }, [])


  const onClickLogoutHandler = () => {

    if (window.confirm('로그아웃 하시겠습니까?')) {
      window.localStorage.removeItem('accessToken');
      localStorage.removeItem('clickTime');
      localStorage.removeItem('workbtn');
      dispatch(setBtnState(!btn));
      navigate('/login');
    }
  }



  return (
    <div className={HeaderCSS.header}>
      <div>
        <button className={HeaderCSS.logo}>
          <Link to="/">MOAWARE</Link>
        </button>
      </div>
      <div className={HeaderCSS.mainmenu}>
        <ul className={HeaderCSS.menuList}>
          <li><Link to="/">홈</Link></li>
          <li><Link to="/project">프로젝트</Link></li>
          <li><Link to="/pay">전자결재</Link></li>
          <li><Link to="/">시설예약</Link></li>

          <li><Link to="/schedule">일정관리</Link></li>
          <li><Link to="/boardPosts">게시판</Link></li>

          <li><Link to="/work">근태관리</Link></li>
          <li><Link to="/">메신저</Link></li>
          <li><Link to="/org">조직도</Link></li>
          <li><Link to="/admin">관리자</Link></li>
        </ul>
      </div>
      <div className={HeaderCSS.userInfo}>
          { name && <span> {name}님</span> }
        <button className={HeaderCSS.logout} onClick={onClickLogoutHandler}>로그아웃</button>
      </div>
    </div>
  );

};

export default Header;