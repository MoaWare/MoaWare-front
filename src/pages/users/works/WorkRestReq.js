import React, { useState } from 'react';
import WorkRestReqCSS from './WorkRestReq.module.css';
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { useEffect } from 'react';
import moment from "moment";
import { callMemberInfoAPI } from '../../../apis/MemberAPICalls';
import { useDispatch, useSelector } from 'react-redux';
import { callLeaveRequestAPI } from '../../../apis/LeavePayAPICalls';
import { useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";

function WorkRestReq() {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [selectedStartDate, setSelectedStartDate] = useState(null)
    const [selectedEndDate, setSelectedEndDate] = useState(null)
    const [selectedOption, setSelectedOption] = useState("연차");
    const { info } = useSelector((state) => state.memberReducer);
    const { request } = useSelector((state) => state.leavePayReducer);
    const today = new Date().toISOString().slice(0, 10);
    const options = ["연차", "반차", "공무", "경조사"];

    const handleSelectChange = (e) => {
        const selectOption = e.target.value;
        setSelectedOption(selectOption);
    };

    const onStartDateHandler = startDate => {
        setSelectedStartDate(startDate);
    }

    const onEndeDateHandler = (endDate) => {
        setSelectedEndDate(endDate)
    }

    const onClickCreate = () => {

        if(selectedEndDate == null ){
            toast.success('날짜를 입력해주세요.', {
                position: toast.POSITION.TOP_CENTER, // 토스트 위치 (옵션)
                autoClose: 2000, // 자동으로 닫히는 시간 (ms) (옵션)
                hideProgressBar: false, // 진행 막대 숨김 여부 (옵션)
              });          
        } else if(selectedStartDate > selectedEndDate) {
            toast.success('종료일이 시작일 보다 빠릅니다.', {
                position: toast.POSITION.TOP_CENTER, // 토스트 위치 (옵션)
                autoClose: 2000, // 자동으로 닫히는 시간 (ms) (옵션)
                hideProgressBar: false, // 진행 막대 숨김 여부 (옵션)
              });    
            return;
        } else if(selectedStartDate == null) {
            toast.success('날짜를 입력해주세요.', {
                position: toast.POSITION.TOP_CENTER, // 토스트 위치 (옵션)
                autoClose: 2000, // 자동으로 닫히는 시간 (ms) (옵션)
                hideProgressBar: false, // 진행 막대 숨김 여부 (옵션)
              });    
            
        }
        /* 서버로 전달할 FormData 형태의 객체 설정 */
        const formData = new FormData();
        formData.append("leaveType", selectedOption);
        formData.append("leaveReqDate", moment(today).format('YYYY-MM-DD'));
        formData.append("leaveStartDay", moment(selectedStartDate).format('YYYY-MM-DD'));
        formData.append("leaveEndDate", moment(selectedEndDate).format('YYYY-MM-DD'));


        for (const entry of formData.entries()) {
        }

        dispatch(callLeaveRequestAPI(formData))
    }

    useEffect(()=>{

        dispatch(callMemberInfoAPI());

    },[]);
    
    useEffect(() => {

        if (request?.status === 200) {
            toast.success('신청 완료.', {
                position: toast.POSITION.TOP_CENTER, // 토스트 위치 (옵션)
                autoClose: 2000, // 자동으로 닫히는 시간 (ms) (옵션)
                hideProgressBar: false, // 진행 막대 숨김 여부 (옵션)
              });   
            navigate("/work/restReqList");
          } else if (request?.state === 400) {
            alert(request.message);
          }

    },[request])
    
    return (
        <>
            <div className={WorkRestReqCSS.main}>
                <p className={WorkRestReqCSS.p}>연차 신청</p>
                <hr className={WorkRestReqCSS.hr}></hr>
                <div className={WorkRestReqCSS.container}>
                    <span className={WorkRestReqCSS.span3}>연차 시작일</span>
                    <div className={WorkRestReqCSS.date}>
                        <DatePicker className={WorkRestReqCSS.datepicker}
                            name="leaveStartDay"
                            selected={selectedStartDate}
                            onChange={onStartDateHandler}
                            dateFormat='yyyy-MM-dd'
                        />
                    </div>
                    <span className={WorkRestReqCSS.span3}>연차 종료일</span>
                    <div className={WorkRestReqCSS.date}>
                        <DatePicker className={WorkRestReqCSS.datepicker}
                            name="leaveEndDate"
                            selected={selectedEndDate}
                            onChange={onEndeDateHandler}
                            dateFormat='yyyy-MM-dd'
                        />
                    </div>
                </div>
                <div className={WorkRestReqCSS.container}>
                    <span className={WorkRestReqCSS.span1}>부서</span>
                    <div className={WorkRestReqCSS.span2}>
                        {info?.dept?.deptName}
                    </div>
                </div>
                <div className={WorkRestReqCSS.container}>
                    <span className={WorkRestReqCSS.span1}>연차 사유</span>
                    <select value={selectedOption} onChange={handleSelectChange}
                        className={WorkRestReqCSS.selectBox}
                    >
                        {options.map((option) => (
                            <option key={option} value={option}>
                                {option}
                            </option>
                        ))}
                    </select>
                </div>
                <div className={WorkRestReqCSS.container}>
                    <span className={WorkRestReqCSS.span1}>직급</span>
                    <div className={WorkRestReqCSS.span2}>
                        {info?.job?.jobName}
                    </div>
                </div>
                <div className={WorkRestReqCSS.container}>
                    <span className={WorkRestReqCSS.span1}>이름</span>
                    <div className={WorkRestReqCSS.span2}>
                        {info?.empName}
                    </div>
                </div>
                <div className={WorkRestReqCSS.container}>
                    <span className={WorkRestReqCSS.span1}>신청 날짜</span>
                    <input className={WorkRestReqCSS.span2}
                        name="leaveReqDate"
                        value={today}
                        readOnly
                    >

                    </input>
                </div>
                <div className={WorkRestReqCSS.container}>
                    <span className={WorkRestReqCSS.span1}>결재</span>
                    <div className={WorkRestReqCSS.box}></div>
                    <div className={WorkRestReqCSS.box2}></div>
                </div>
                <div>
                    <button className={WorkRestReqCSS.workBtn1} onClick={onClickCreate}>신청하기</button>
                </div>
            </div>
        </>
    );
}

export default WorkRestReq;