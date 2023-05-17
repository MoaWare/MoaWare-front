import MainCSS from './Main.module.css';

function Main() {

    return (
        <div className={MainCSS.wrapper}>
            <div className={MainCSS.wrap}>
                <div className={MainCSS.payment}>
                    <div className={MainCSS.myWait}>
                        <div className={MainCSS.wait}>결재 대기</div>
                        <table className={MainCSS.waitList}>
                            <tr>
                                <td>2023.05.01</td>
                                <td>회계품의서</td>
                                <td>최신 노트북 추가구매</td>
                                <td>0004</td>
                                <td>홍길동</td>
                            </tr>
                            <tr>
                                <td>2023.05.01</td>
                                <td>회계품의서</td>
                                <td>최신 노트북 추가구매</td>
                                <td>0004</td>
                                <td>홍길동</td>
                            </tr>
                            <tr>
                                <td>2023.05.01</td>
                                <td>회계품의서</td>
                                <td>최신 노트북 추가구매</td>
                                <td>0004</td>
                                <td>홍길동</td>
                            </tr>
                            <tr>
                                <td>2023.05.01</td>
                                <td>회계품의서</td>
                                <td>최신 노트북 추가구매</td>
                                <td>0004</td>
                                <td>홍길동</td>
                            </tr>
                        </table>
                    </div>
                    <div className={MainCSS.myProg}>
                        <div className={MainCSS.prog}>결재 진행</div>
                        <table className={MainCSS.progList}>
                            <tr>
                                <td>2023.05.01</td>
                                <td>회계품의서</td>
                                <td>최신 노트북 추가구매</td>
                                <td>0004</td>
                                <td>홍길동</td>
                            </tr>
                            <tr>
                                <td>2023.05.01</td>
                                <td>회계품의서</td>
                                <td>최신 노트북 추가구매</td>
                                <td>0004</td>
                                <td>홍길동</td>
                            </tr>
                            <tr>
                                <td>2023.05.01</td>
                                <td>회계품의서</td>
                                <td>최신 노트북 추가구매</td>
                                <td>0004</td>
                                <td>홍길동</td>
                            </tr>
                            <tr>
                                <td>2023.05.01</td>
                                <td>회계품의서</td>
                                <td>최신 노트북 추가구매</td>
                                <td>0004</td>
                                <td>홍길동</td>
                            </tr>
                        </table>
                    </div>
                </div>
                <div className={MainCSS.icon}>
                    <div>
                        <a href=''>
                            <img src='./icon/icon1.png'/>
                            <span>회원정보</span>
                        </a>
                    </div>
                    <div>
                        <a href=''>
                            <img src='./icon/icon2.png'/>
                            <span>자유 게시판</span>
                        </a>
                    </div>
                    <div>
                        <a href=''>
                            <img src='./icon/icon3.png'/>
                            <span>전자결재</span>
                        </a>
                    </div>
                    <div>
                        <a href=''>
                            <img src='./icon/icon4.png'/>
                            <span>예약관리</span>
                        </a>
                    </div>
                    <div>
                        <a href=''>
                            <img src='./icon/icon5.png'/>
                            <span>메신저</span>
                        </a>
                    </div>
                    <div>
                        <a href=''>
                            <img src='./icon/icon6.png'/>
                            <span>일정관리</span>
                        </a>
                    </div>

                </div>
                <div className={MainCSS.program}>
                    <div className={MainCSS.project}>프로젝트</div>
                    <table className={MainCSS.myPrj}>
                        <tr>
                            <th>업무 번호</th>
                            <th>업무 제목</th>
                            <th>완료기한</th>
                            <th>진행률</th>
                            <th>상태</th>
                            <th>담당자</th>
                        </tr>
                        <tr>
                            <td>0001</td>
                            <td>모아웨어 프로젝트</td>
                            <td>~ 2023.06.09</td>
                            <td>
                                <progress className={MainCSS.progress} value={50} min={0} max={100}></progress>
                            </td>
                            <td>진행중</td>
                            <td>홍길동 이사</td>
                        </tr>
                        <tr>
                            <td>0001</td>
                            <td>모아웨어 프로젝트</td>
                            <td>~ 2023.06.09</td>
                            <td>
                                <progress className={MainCSS.progress} value={50} min={0} max={100}></progress>
                            </td>
                            <td>진행중</td>
                            <td>홍길동 이사</td>
                        </tr>
                        <tr>
                            <td>0001</td>
                            <td>모아웨어 프로젝트</td>
                            <td>~ 2023.06.09</td>
                            <td>
                                <progress className={MainCSS.progress} value={50} min={0} max={100}></progress>
                            </td>
                            <td>진행중</td>
                            <td>홍길동 이사</td>
                        </tr>
                    </table>
                </div>
            </div>
            <div className={MainCSS.wrap2}>
                <div className={MainCSS.notification}>
                    <div className={MainCSS.announcement}>공지사항</div>
                    <table>
                        <tr>
                            <th>날짜</th>
                            <th>제목</th>
                            <th>작성자</th>
                        </tr>
                        <tr>
                            <td>2023.05.01</td>
                            <td>공부하기 싫다..</td>
                            <td>홍길동</td>
                        </tr>
                        <tr>
                            <td>2023.05.01</td>
                            <td>공부하기 싫다..</td>
                            <td>홍길동</td>
                        </tr>
                        <tr>
                            <td>2023.05.01</td>
                            <td>공부하기 싫다..</td>
                            <td>홍길동</td>
                        </tr>
                        <tr>
                            <td>2023.05.01</td>
                            <td>공부하기 싫다..</td>
                            <td>홍길동</td>
                        </tr>
                    </table>
                </div>
                <div className={MainCSS.calendar}>달력</div>
            </div>
        </div>
    );
}

export default Main;