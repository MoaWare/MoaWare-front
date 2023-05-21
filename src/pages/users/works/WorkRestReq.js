import React, { useState } from 'react';
import WorkRestReqCSS from './WorkRestReq.module.css';
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { useEffect } from 'react';

function WorkRestReq() {

    const [selectedStartDate, setSelectedStartDate] = useState(null)
    const [selectedEndDate, setSelectedEndDate] = useState(null)
    const [selectedOption, setSelectedOption] = useState("");
    const today = new Date().toISOString().slice(0, 10);
    // 현재 시간
    // const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString());
    
    // useEffect(() => {
    //     const interval = setInterval(() => {
    //       setCurrentTime(new Date().toLocaleTimeString());
    //     }, 1000);
    //     return () => clearInterval(interval);
    //   }, []);


    const handleDateChange = (date) => {
        setSelectedDate(date.toISOString());
      };

    const options = ["연차", "반차", "공무","경조사"];
    
    const handleSelectChange = (event) => {
        setSelectedOption(event.target.value);
      };

    return(
        <>
        <div className={ WorkRestReqCSS.main }>
            <p className={ WorkRestReqCSS.p }>연차 신청</p>
            <hr className={ WorkRestReqCSS.hr }></hr>
            <div className={ WorkRestReqCSS.container }>
                <span className={ WorkRestReqCSS.span1 }>연차 시작일</span>
                <div className={ WorkRestReqCSS.date }>
                <DatePicker className={ WorkRestReqCSS.datepicker }
                    selected={selectedStartDate}
                    onChange={(startDate) => setSelectedStartDate(startDate.toISOString())}
                    dateFormat='yyyy-MM-dd'
                />
                </div>
                <span className={ WorkRestReqCSS.span1 }>연차 종료일</span>
                <div className={ WorkRestReqCSS.date }>
                <DatePicker className={ WorkRestReqCSS.datepicker }
                    selected={selectedEndDate}
                    onChange={(endDate) => setSelectedEndDate(endDate.toISOString())}
                    dateFormat='yyyy-MM-dd'
                />
                </div>
            </div>
            <div className={ WorkRestReqCSS.container }>
                <span className={ WorkRestReqCSS.span1 }>부서</span>
                <div className={ WorkRestReqCSS.span2 }>
                    아
                </div>
            </div>
            <div className={ WorkRestReqCSS.container }>
                <span className={ WorkRestReqCSS.span1 }>연차 사유</span>
                <select value={selectedOption} onChange={handleSelectChange}
                className={ WorkRestReqCSS.selectBox }
                >
                <option value="">선택</option>
                {options.map((option) => (
                    <option key={option} value={option}>
                    {option}
                    </option>
                ))}
                </select>
            </div>
            <div className={ WorkRestReqCSS.container }>
                <span className={ WorkRestReqCSS.span1 }>직급</span>
                <div className={ WorkRestReqCSS.span2 }>
                    아
                </div>
            </div>
            <div className={ WorkRestReqCSS.container }>
                <span className={ WorkRestReqCSS.span1 }>신청 날짜</span>
                <div className={ WorkRestReqCSS.span2 }>
                    { today }
                </div>
            </div>
            <div className={ WorkRestReqCSS.container }>
                <span className={ WorkRestReqCSS.span1 }>1차 결재</span>
                <div className={ WorkRestReqCSS.box }></div>
                <div className={ WorkRestReqCSS.box2 }></div>
                <span className={ WorkRestReqCSS.span1 }>최종 결재</span>
                <div className={ WorkRestReqCSS.box }></div>
                <div className={ WorkRestReqCSS.box2 }></div>
            </div>
            <div>
                <button className={ WorkRestReqCSS.workBtn1 }>신청하기</button>
                <button className={ WorkRestReqCSS.workBtn2 }>신청하기</button>
            </div>
        </div>
        </>
    );
}

export default WorkRestReq;