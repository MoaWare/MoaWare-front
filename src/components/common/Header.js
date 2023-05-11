import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import HeaderCSS from './Header.module.css';

const Header = ({ empName, onLogout }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    onLogout(); // 로그아웃 이벤트 핸들러 호출
  };

  return (
    <div className={HeaderCSS.wrapper}>
      <button className={HeaderCSS.logo}>
        MOAWARE
      </button>
      <nav className={HeaderCSS.nav}>
        <ul className={`${HeaderCSS.menu} ${isMenuOpen ? HeaderCSS.open : ''}`}>
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
        <div className={HeaderCSS.menuToggle} onClick={handleMenuToggle}>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </nav>
      <div className={HeaderCSS.userInfo}>
        <span>{empName}님</span>
        <button className={HeaderCSS.headerBtn} onClick={handleLogout}>
          로그아웃
        </button>
      </div>
    </div>
  );

};

export default Header;