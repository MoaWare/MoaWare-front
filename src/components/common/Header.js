import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import './Header.css'
// import HeaderCSS from './Header.module.css';

const Header = ({ empName, onLogout }) => {

  const navigate = useNavigate();
    
  const onClickLogoutHandler = () => {
    
    if(window.confirm('로그아웃 하시겠습니까?')){
      console.log('로그아웃 확인');
      window.localStorage.removeItem('accessToken');
      navigate('/', { replace : true });
    } else{
      console.log('로그아웃 취소');
    }
  } 

  const onClickWorkHandler = () => {
    navigate("/work");
  }
  

  return (
    <div className="header">
        <div>
            <button className="logo">MOAWARE</button>
        </div>
        <div className="mainmenu">
            <ul className="menuList">
                <li><Link to="/">홈</Link></li>
                <li><Link to="/">프로젝트</Link></li>
                <li><Link to="/">전자결재</Link></li>
                <li><Link to="/">시설예약</Link></li>
                <li><Link to="/">일정관리</Link></li>
                <li><Link to="/">게시판</Link></li>
                <li><Link to="/">근태관리</Link></li>
                <li><Link to="/">메신저</Link></li>
                <li><Link to="/">조직도</Link></li>
            </ul>
        </div>
        <div className="userInfo">
            <span>홍길동님</span>        
            <button className="logout" onClick={onClickLogoutHandler}>로그아웃</button>
        </div>
    </div>
  );

};

export default Header;











{/* <li><button className={ HeaderCSS.btn}
                  onClick={ onClickWorkHandler }
                >근태관리</button> */}