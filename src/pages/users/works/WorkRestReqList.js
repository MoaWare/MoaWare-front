import { useEffect, useState } from 'react';
import WorkRestReqListCSS from './WorkRestReqList.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { callMyLeaveRequestListAPI } from '../../../apis/LeavePayAPICalls';
import { callMemberInfoAPI } from '../../../apis/MemberAPICalls';
import PagingBar from '../../../components/common/PagingBar';
import WorkReqListItem from './WorkReqListItem';

function WorkRestReqList() {

    const [currentPage, setCurrentPage] = useState(1);
    const dispatch = useDispatch();
    const { rqList } = useSelector((state) => state.leavePayReducer);
    const { info } = useSelector((state) => state.memberReducer);
    const pageInfo = rqList && rqList ? rqList.data.pageInfo : null;
    const rqListItem = rqList && rqList.data ? rqList.data.data : '';
    const infoItem = info ? info : '';
    useEffect(() => {
        dispatch(callMyLeaveRequestListAPI({ currentPage }))
        dispatch(callMemberInfoAPI());
    },[])

    console.log(rqList);
    return(
        <>
        <div className={ WorkRestReqListCSS.main }>
            <div className={ WorkRestReqListCSS.restTable }>
            <p className={ WorkRestReqListCSS.p }>연차 신청 목록</p>
            <hr className={ WorkRestReqListCSS.hr }></hr>
                <table className={ WorkRestReqListCSS.table }>
                    <thead>
                        <tr className={ WorkRestReqListCSS.th }>
                            <th>신청 일자</th>
                            <th>부서</th>
                            <th>직급</th>
                            <th>이름</th>
                            <th>연차 사유</th>
                            <th>상태</th>
                            <th>사용기간</th>
                            <th>사용 일</th>
                        </tr>
                    </thead>
                    {rqListItem && <WorkReqListItem rqListItem={rqListItem} infoItem={infoItem}/>}
                </table>
                <div>
                    <button className={ WorkRestReqListCSS.workBtn1 }>취소하기</button>
                </div>
                <div>
                { pageInfo && <PagingBar pageInfo={ pageInfo } setCurrentPage={ setCurrentPage } /> }
                </div>
            </div>
        </div>
        </>
    );
}

export default WorkRestReqList;