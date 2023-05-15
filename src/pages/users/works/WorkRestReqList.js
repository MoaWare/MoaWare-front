import { useState } from 'react';
import WorkRestReqListCSS from './WorkRestReqList.module.css';
// import PagingBar from "../../components/common/PagingBar";

function WorkRestReqList() {

    const [currentPage, setCurrentPage] = useState(1);
    // const pageInfo = products.pageInfo; 나중에 수정
    return(
        <>
        <div className={ WorkRestReqListCSS.main }>
            <div className={ WorkRestReqListCSS.restTable }>
            <p className={ WorkRestReqListCSS.p }>연차 신청 목록</p>
            <hr className={ WorkRestReqListCSS.hr }></hr>
                <table className={ WorkRestReqListCSS.table }>
                    <tr className={ WorkRestReqListCSS.th }>
                        <th></th>
                        <th>신청 일자</th>
                        <th>부서</th>
                        <th>직급</th>
                        <th>이름</th>
                        <th>연차 사유</th>
                        <th>상태</th>
                        <th>사용기간</th>
                        <th>사용 일</th>
                    </tr>
                    <tr className={ WorkRestReqListCSS.td }>
                        <td><input type="checkbox" /></td>
                        <td>2020-12-12</td>
                        <td>경영관리</td>
                        <td>대리</td>
                        <td>홍길동</td>
                        <td>연차</td>
                        <td>대기중</td>
                        <td>2020-12-12~2020-12-15</td>
                        <td>3</td>
                    </tr>
                </table>
                <div>
                    <button className={ WorkRestReqListCSS.workBtn1 }>취소하기</button>
                </div>
                <div>
                {/* { pageInfo && <PagingBar pageInfo={ pageInfo } setCurrentPage={ setCurrentPage } /> } */}
                </div>
            </div>
        </div>
        </>
    );
}

export default WorkRestReqList;