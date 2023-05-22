import React, { useEffect, useState } from 'react';

import { Link, NavLink, useNavigate } from 'react-router-dom';
import './Header.css'
import HeaderCSS from './Header.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { getHeaderName } from '../../modules/EmployeeModule';
import { callHeaderNameAPI } from '../../apis/EmployeeAPICalls';

const Header = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { name } = useSelector(state=> state.employeeReducer);

  useEffect(() => {
    dispatch(callHeaderNameAPI(getHeaderName));
    console.log("Header name: ",name);
  }, [])


  const onClickLogoutHandler = () => {

    if (window.confirm('로그아웃 하시겠습니까?')) {
      window.localStorage.removeItem('accessToken');
      console.log('로그아웃 확인');
      navigate('/login');
      console.log('로그아웃 확인');
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
          <li><Link to="/board">게시판</Link></li>

          <li><Link to="/work">근태관리</Link></li>
          <li><Link to="/">메신저</Link></li>
          <li><Link to="/org">조직도</Link></li>
          <li><Link to="/admin">관리자</Link></li>
        </ul>
      </div>
      <div className={HeaderCSS.userInfo}>
          <span>{ name && name }님</span>
        <button className={HeaderCSS.logout} onClick={onClickLogoutHandler}>로그아웃</button>
      </div>
    </div>
  );

};

export default Header;