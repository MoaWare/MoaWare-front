import React from 'react';
import CSS from './Admin.module.css';

const Admin = () => {


  return (
    <div className={CSS.content}>
      <a className={CSS.cards} href="admin/emp/list">
        <i className="bi bi-file-earmark-person"></i>
        <div className={CSS.text}>계정 관리</div>
      </a>
      <a className={CSS.cards} href="admin/auth/list">
        <i className="bi bi-window"></i>
        <div className={CSS.text}>권한 관리</div>
      </a>
      <a className={CSS.cards} href="admin/board/list">
        <i className="bi bi-pencil-square"></i>
        <div className={CSS.text}>게시판 관리</div>
      </a>
      <a className={CSS.cards} href="admin/ref/list">
        <i className="bi bi-file-earmark-ppt"></i>
        <div className={CSS.text}>참고 문헌</div>
      </a>
    </div>
  );
};


export default Admin;
