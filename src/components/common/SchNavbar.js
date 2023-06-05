import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import Calendar from 'react-calendar';
import SchNavbarCSS from "./SchNavbar.module.css";
import SchInsertModal from '../../components/modal/scheduleModal/SchInsertModal';

function SchNavbar() {

    const [date, setDate] = useState(new Date());
    const [schInsertModal, setSchInsertModal] = useState(false);
    // const { schedules, schedule } = useSelector(state => state.scheduleReducer);

    const handleDateChange = (selectedDate) => {
        setDate(selectedDate);
        // 선택된 날짜로 원하는 작업 수행하기
    };

    return (
    <>
    {/* { schInsertModal ? <SchInsertModal setSchInsertModal={setSchInsertModal} schedule={schedule} /> : null} */}
    { schInsertModal ? <SchInsertModal setSchInsertModal={setSchInsertModal} /> : null}
        <nav className={SchNavbarCSS.navbar}>
            <div className={SchNavbarCSS.wrap}>
                <div className={SchNavbarCSS.title}>일정 관리</div>
                <div className={SchNavbarCSS.myCal}>
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
                {/* <div className={SchNavbarCSS.createSch}>
                    <button>+ 일정 생성</button>
                </div> */}
                <div className={SchNavbarCSS.share}>
                    <div className={SchNavbarCSS.type}>공유일정</div>
                    <div className={SchNavbarCSS.boxwrap}>
                        <span>회사 일정</span>
                        <div className={SchNavbarCSS.box1}></div>
                    </div>
                    <div className={SchNavbarCSS.boxwrap}>
                        <span>프로젝트 일정</span>
                        <div className={SchNavbarCSS.box2}></div>
                    </div>
                    <div className={SchNavbarCSS.boxwrap}>
                        <span>직급별 일정</span>
                        <div className={SchNavbarCSS.box3}></div>
                    </div>
                    <div className={SchNavbarCSS.boxwrap}>
                        <span>부서별 일정</span>
                        <div className={SchNavbarCSS.box4}></div>
                    </div>
                    <div className={SchNavbarCSS.boxwrap}>
                        <span>팀별 일정</span>
                        <div className={SchNavbarCSS.box5}></div>
                    </div>
                </div>
                <div className={SchNavbarCSS.unshare}>
                <div className={SchNavbarCSS.type}>내 일정</div>
                    <div className={SchNavbarCSS.boxwrap}>
                        <span>개인 일정</span>
                        <div className={SchNavbarCSS.box6}></div>
                    </div>
                </div>
            </div>
        </nav>
    </>
    );
    
}

export default SchNavbar;