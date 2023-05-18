import React, { useState } from 'react';
import Calendar from 'react-calendar';
import '../schedule/Calendar.css';
import MainCSS from './Main.module.css';
import { NavLink } from 'react-router-dom';

function Main() {

    const [date, setDate] = useState(new Date());

    const handleDateChange = (selectedDate) => {
        setDate(selectedDate);
        // 선택된 날짜로 원하는 작업 수행하기
    };

    return (
        <div className={MainCSS.wrapper}>
            <div className={MainCSS.wrap}>
                <div className={MainCSS.payment}>
                    <div className={MainCSS.myWait}>
                        <div className={MainCSS.wait}>결재 대기</div>
                        <table className={MainCSS.waitList}>
                            <tbody>
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
                            </tbody>
                        </table>
                    </div>
                    <div className={MainCSS.myProg}>
                        <div className={MainCSS.prog}>결재 진행</div>
                        <table className={MainCSS.progList}>
                            <tbody>
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
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className={MainCSS.icon}>
                    <div>
                        <NavLink to="/">
                            <img src='/icon/icon1.png' alt='회원정보' />
                            <span>회원정보</span>
                        </NavLink>
                    </div>
                    <div>
                        <NavLink to="/">
                            <img src='/icon/icon2.png' alt='자유 게시판' />
                            <span>자유 게시판</span>
                        </NavLink>
                    </div>
                    <div>
                        <NavLink to="/">
                            <img src='/icon/icon3.png' alt='전자결재' />
                            <span>전자결재</span>
                        </NavLink>
                    </div>
                    <div>
                        <NavLink to="/">
                            <img src='/icon/icon4.png' alt='예약관리' />
                            <span>예약관리</span>
                        </NavLink>
                    </div>
                    <div>
                        <NavLink to="/">
                            <img src='/icon/icon5.png' alt='메신저' />
                            <span>메신저</span>
                        </NavLink>
                    </div>
                    <div>
                        <NavLink to="/">
                            <img src='/icon/icon6.png' alt='일정관리' />
                            <span>일정관리</span>
                        </NavLink>
                    </div>

                </div>
                <div className={MainCSS.program}>
                    <div className={MainCSS.project}>프로젝트</div>
                    <table className={MainCSS.myPrj}>
                        <tbody>
<<<<<<< HEAD
=======
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
>>>>>>> 127d7a6e326af20d9633c1731dd0cbd4e6b8cad0
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
<<<<<<< HEAD
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
=======
>>>>>>> 127d7a6e326af20d9633c1731dd0cbd4e6b8cad0
                        </tbody>
                    </table>
                </div>
            </div>
            <div className={MainCSS.wrap2}>
                <div className={MainCSS.notification}>
                    <div className={MainCSS.announcement}>공지사항</div>
<<<<<<< HEAD
                    <table className={MainCSS.notice}>
                        <tbody>
=======
                    <table>
                        <tbody>
                    <table className={MainCSS.notice}>
                        
>>>>>>> 127d7a6e326af20d9633c1731dd0cbd4e6b8cad0
                        <tr>
                            <th>날짜</th>
                            <th>분류</th>
                            <th>제목</th>
                        </tr>
                        <tr>
                            <td>2023.05.01</td>
                            <td>정부정책</td>
                            <td>공부하기 싫다</td>
                        </tr>
                        <tr>
                            <td>2023.05.01</td>
                            <td>정부정책</td>
                            <td>공부하기 싫다</td>
                        </tr>
                        <tr>
                            <td>2023.05.01</td>
                            <td>정부정책</td>
                            <td>냐냐냐냐뇨뇬ㄴ뇨뇬뇨뇨뇨뇨뇨링~</td>
                        </tr>
                        <tr>
                            <td>2023.05.01</td>
                            <td>정부정책</td>
                            <td>공부하기 싫다</td>
                        </tr>
                        </tbody>
                    </table>
                </div>
                <div className={MainCSS.calendar}>
                    <div className={MainCSS.schedule}>캘린더</div>
                    <Calendar 
                        onChange={handleDateChange} 
                        value={date}
                        calendarType={"US"}
                        next2Label={null}
                        prev2Label={null}
                        formatDay={(locale, date) =>
                            new Date(date).toLocaleDateString("en-us", {
                              day: "2-digit",
                        })} 
                    />
                </div>
            </div>
        </div>
    );
}

export default Main;