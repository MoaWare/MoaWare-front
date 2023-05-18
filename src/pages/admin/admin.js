import React from 'react';
import ReactDOM from 'react-dom';
import './Admin.module.css';


const Admin = () => {
    return (
        <div className="main">
            <div className="content">
                <a className="cards employee" href="admin/employee/list">
                    <i className="bi bi-file-earmark-person"></i>
                    <div className="text">계정 관리</div>
                </a>
                <a className="cards auth" href="admin/auth/list">
                    <i className="bi bi-window"></i>
                    <div className="text">권한 관리</div>
                </a>
                <a className="cards board" href="admin/board/list">
                    <i className="bi bi-pencil-square"></i>
                    <div className="text">게시판 관리</div>
                </a>
                <a className="cards ref" href="admin/ref/list">
                    <i className="bi bi-file-earmark-ppt"></i>
                    <div className="text">참고 문헌</div>
                </a>
            </div>
        </div>
    );
};

ReactDOM.render(<Admin />, document.getElementById('root'));

export default Admin;