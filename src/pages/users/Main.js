import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Calendar from 'react-calendar';
import '../schedule/Calendar.css';
import MainCSS from './Main.module.css';
import { NavLink } from 'react-router-dom';
import { callProjectProgressListAPI } from '../../apis/ProjectAPICalls';
import { CallPaymentingListAPI, CallPaymentWaitListAPI } from '../../apis/PaymentAPICalls';
import ProjectList from "../project/ProjectList";
import PaymentBoardContext from '../payment/PaymentBoardContext';
import PaymentWaitBoardContext from '../payment/PaymentWaitBoardContext';

function Main() {
    const dispatch = useDispatch();
    const [date, setDate] = useState(new Date());
    const handleDateChange = (selectedDate) => {
        setDate(selectedDate); // 선택된 날짜로 원하는 작업 수행하기
    };

    /* 프로젝트 */
    const { progress } = useSelector(state => state.projectReducer);
    const projectList = progress && progress.data ? progress.data.data : '';
    const mainPrj = projectList && projectList.length > 0 ? projectList[0] : null;
    const [selectPorjCode, setSeletProjCode] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        dispatch(callProjectProgressListAPI({ currentPage }))
    }, [currentPage, dispatch]);

    const onSelectHandler = (projCode) => {
        setSeletProjCode(projCode)
        console.log(projCode);
    }

    /* 결재 사항 - 대기 */
    const { isPayment } = useSelector(state => state.paymentReducer);
    const paymentWait = useSelector(state => state.paymentReducer);
    const payWait = paymentWait.data && paymentWait.data.content;

    useEffect(() => {
        dispatch(CallPaymentWaitListAPI(currentPage));
    }, [currentPage, isPayment]);

    /* 결재 사항 - 진행 */
    const paymentProg = useSelector(state => state.paymentReducer);
    const payProg = paymentProg.data && paymentProg.data.content ? paymentProg.data.content.slice(0, 4) : [];

    useEffect(() => {
        dispatch(CallPaymentingListAPI(currentPage));
    }, [currentPage]);

    return (
        <div className={MainCSS.wrapper}>
            <div className={MainCSS.wrap}>
                <div className={MainCSS.payment}>
                    {/* <div className={MainCSS.myWait}>
                        <div className={MainCSS.wait}>결재 대기</div>
                        <div className={MainCSS.waitList}>
                            <PaymentWaitBoardContext pay={payWait} setCurrentPage={setCurrentPage} />
                        </div>
                    </div> */}
                    <div className={MainCSS.myProg}>
                        <div className={MainCSS.prog}>결재 진행</div>
                        <div className={MainCSS.progList}>
                            <PaymentBoardContext pay={payProg} setCurrentPage={setCurrentPage} />
                        </div>
                    </div>
                </div>
                <div className={MainCSS.icon}>
                    <div>
                        <NavLink to="/member">
                            <img src='/icon/icon1.png' alt='회원정보' />
                            <span>회원정보</span>
                        </NavLink>
                    </div>
                    <div>
                        <NavLink to="/boardPosts/boards/2">
                            <img src='/icon/icon2.png' alt='자유 게시판' />
                            <span>자유 게시판</span>
                        </NavLink>
                    </div>
                    <div>
                        <NavLink to="/pay">
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
                        <NavLink to="/schedule">
                            <img src='/icon/icon6.png' alt='일정관리' />
                            <span>일정관리</span>
                        </NavLink>
                    </div>
                </div>
                <div className={MainCSS.program}>
                    <div className={MainCSS.project}>프로젝트</div>
                    <table className={MainCSS.myPrj}>
                        <thead>
                            <tr className={MainCSS.prjth}>
                                <th>프로젝트 번호</th>
                                <th>프로젝트 제목</th>
                                <th>프로젝트 기간</th>
                                <th>상태</th>
                                <th>담당자</th>
                                <th>참여자 수</th>
                            </tr>
                        </thead>
                        {projectList && (<ProjectList
                            projectList={projectList.slice(0, 6)}
                            onProjectSelectHandler={onSelectHandler}
                        />)}
                    </table>
                </div>
            </div>
            <div className={MainCSS.wrap2}>
                <div className={MainCSS.notification}>
                    <div className={MainCSS.announcement}>공지사항</div>
                    <table className={MainCSS.notice}>
                        <tbody>
                            <tr>
                                <th>날짜</th>
                                <th>분류</th>
                                <th>제목</th>
                            </tr>
                            <tr>
                                <td>2023.06.04</td>
                                <td>부서</td>
                                <td>내일 회식입니다.</td>
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
