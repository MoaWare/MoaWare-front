import React, { useState } from 'react';
import Calendar from 'react-calendar';
import SchNavbarCSS from "./SchNavbar.module.css";
import SchInsertModal from '../../components/modal/scheduleModal/SchInsertModal';

function SchNavbar() {

    const [date, setDate] = useState(new Date());
    const [schInsertModal, setSchInsertModal] = useState(false);

    /* 일정 등록 */
    const EventInsertClick = () => {
        console.log('일정 등록할래ㅠ0ㅠ: ');
        setSchInsertModal(true); // schInsertModal 열기
        console.log('모달창 클릭티비:', schInsertModal);
    };

    return (
    <>
    {/* { schInsertModal ? <SchInsertModal setSchInsertModal={setSchInsertModal} schedule={schedule} /> : null} */}
    { schInsertModal ? <SchInsertModal setSchInsertModal={setSchInsertModal} /> : null}
        <nav className={SchNavbarCSS.navbar}>
            <div className={SchNavbarCSS.wrap}>
                <div className={SchNavbarCSS.title}>일정 관리</div>
                <div className={SchNavbarCSS.myCal}>
                    {/* <Calendar 
                        onChange={handleDateChange} 
                        value={date}
                        calendarType={"US"}
                        next2Label={null}
                        prev2Label={null}
                        formatDay={(locale, date) =>
                        new Date(date).toLocaleDateString("en-us", {
                        day: "2-digit",
                        })}
                    /> */}
                </div>
                {/* <div className={SchNavbarCSS.createSch}>
                    <button>+ 일정 생성</button>
                </div> */}
                <div className={SchNavbarCSS.share}>
                    <div className={SchNavbarCSS.type}>공유일정</div>
                    <div>회사 일정</div>
                    <div>프로젝트 일정</div>
                    <div>직급별 일정</div>
                    <div>부서별 일정</div>
                    <div>팀별 일정</div>
                </div>
                <div className={SchNavbarCSS.unshare}>
                <div className={SchNavbarCSS.type}>내 일정</div>
                    <div>개인 일정</div>
                </div>
                <button 
                    className={SchNavbarCSS.insert}
                    onClick={EventInsertClick}
                >+ 일정 생성
                </button>
            </div>
        </nav>
    </>
    );
    
}

export default SchNavbar;