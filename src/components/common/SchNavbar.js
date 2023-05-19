import React, { useState } from 'react';
import Calendar from 'react-calendar';
import SchNavbarCSS from "./SchNavbar.module.css";

function SchNavbar() {

    const [date, setDate] = useState(new Date());

    const handleDateChange = (selectedDate) => {
        setDate(selectedDate);
        // 선택한 날짜로 원하는 작업 수행하기
    };

    return (
    <nav className={SchNavbarCSS.navbar}>
      <div className={SchNavbarCSS.wrap}>
            <div className={SchNavbarCSS.title}>일정 관리</div>
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
            <div className={SchNavbarCSS.createSch}>
                <button>+ 일정 생성</button>
            </div>
            <div>
                <div>회사 일정</div>
                <div>프로젝트 일정</div>
                <div>직급별 일정</div>
                <div>직급별 일정</div>
                <div>부서별 일정</div>
                <div>팀별 일정</div>
            </div>
      </div>
    </nav>
    );
    
}

export default SchNavbar;