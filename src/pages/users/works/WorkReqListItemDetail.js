import { useEffect } from "react";
import { useParams } from "react-router-dom";
import WorkRestReqListDetailCSS from './WorkRestReqListDetail.module.css';
import { callLeaveRestDetailAPI } from "../../../apis/LeavePayAPICalls";
import { useDispatch, useSelector } from "react-redux";

function WorkReqListItemDetail() {

    const dispatch = useDispatch();
    const params = useParams();
    const leaveCode = params.leaveCode;
    const { rDetail } = useSelector((state) => state.leavePayReducer);

    useEffect(() => {
        dispatch(callLeaveRestDetailAPI({ leaveCode }));
    }, []);

    console.log(leaveCode);
    console.log(rDetail);

    return(
        <>  
            <div className={WorkRestReqListDetailCSS.main}>
                <p className={WorkRestReqListDetailCSS.p}>연차 신청</p>
                <hr className={WorkRestReqListDetailCSS.hr}></hr>
                <div className={WorkRestReqListDetailCSS.container}>
                    <span className={WorkRestReqListDetailCSS.span3}>연차 시작일</span>
                    <div className={WorkRestReqListDetailCSS.date}>
                        {rDetail? rDetail.leaveStartDay.substring(0,10) : ""}
                    </div>
                    <span className={WorkRestReqListDetailCSS.span3}>연차 종료일</span>
                    <div className={WorkRestReqListDetailCSS.date}>
                        {rDetail? rDetail.leaveEndDate.substring(0,10) : ""}
                    </div>
                </div>
                <div className={WorkRestReqListDetailCSS.container}>
                    <span className={WorkRestReqListDetailCSS.span1}>부서</span>
                    <div className={WorkRestReqListDetailCSS.span2}>
                    </div>
                </div>
                <div className={WorkRestReqListDetailCSS.container}>
                    <span className={WorkRestReqListDetailCSS.span1}>연차 사유</span>
                    <div className={WorkRestReqListDetailCSS.selectBox}>
                        {rDetail? rDetail.leaveType : ""}
                    </div>
                </div>
                <div className={WorkRestReqListDetailCSS.container}>
                    <span className={WorkRestReqListDetailCSS.span1}>직급</span>
                    <div className={WorkRestReqListDetailCSS.span2}>
                       
                    </div>
                </div>
                <div className={WorkRestReqListDetailCSS.container}>
                    <span className={WorkRestReqListDetailCSS.span1}>이름</span>
                    <div className={WorkRestReqListDetailCSS.span2}>
                     
                    </div>
                </div>
                <div className={WorkRestReqListDetailCSS.container}>
                    <span className={WorkRestReqListDetailCSS.span1}>신청 날짜</span>
                    <div className={WorkRestReqListDetailCSS.span2}
                    >
                        {rDetail? rDetail.leaveReqDate.substring(0,10) : ""}
                    </div>
                </div>
                <div className={WorkRestReqListDetailCSS.container}>
                    <span className={WorkRestReqListDetailCSS.span1}>결재</span>
                    <div className={WorkRestReqListDetailCSS.box}></div>
                    <div className={WorkRestReqListDetailCSS.box2}></div>
                </div>
                <div>
                    <button className={WorkRestReqListDetailCSS.workBtn1}>승인하기</button>
                    <button className={WorkRestReqListDetailCSS.workBtn2}>반려하기</button>
                </div>
            </div>
        </>
    );
}

export default WorkReqListItemDetail;