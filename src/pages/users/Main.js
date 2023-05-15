import MainCSS from './Main.module.css';

function Main() {

    return (
        <div className={MainCSS.wrapper}>
            <div className={MainCSS.wrap}>
                <div className={MainCSS.payment}>결재</div>
                <div className={MainCSS.icon}>
                    <div>회원정보</div>
                    <div>자유게시판</div>
                    <div>전자결재</div>
                    <div>예약관리</div>
                    <div>메신저</div>
                    <div>일정관리</div>
                </div>
                <div className={MainCSS.project}>프로젝트</div>
            </div>
            <div className={MainCSS.wrap2}>
                <div className={MainCSS.notification}>공지사항</div>
                <div className={MainCSS.calendar}>달력</div>
            </div>
        </div>
    );
}

export default Main;