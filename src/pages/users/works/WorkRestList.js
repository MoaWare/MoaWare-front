import { useState } from 'react';
import DateSelect from '../../../components/Work/DateSelect';
import WorkRestListCSS from './WorkRestList.module.css';
// import PagingBar from "../../components/common/PagingBar";

function WorkRestList() {

    const [selectedDate, setSelectedDate] = useState(null)
    const [year, setYear] = useState(new Date().getFullYear());
    const [month, setMonth] = useState(new Date().getMonth() + 1);
    const [currentPage, setCurrentPage] = useState(1);
    // const pageInfo = products.pageInfo; 나중에 수정

    const handleDateChange = (year, month) => {

      };

    return(
        <>
            <div className={ WorkRestListCSS.main }>
                <p className={ WorkRestListCSS.p }>근태 관리</p>
                <div className={ WorkRestListCSS.btnContainer }>
                <button className={ WorkRestListCSS.btn }>&lt;</button>
                <p className={ WorkRestListCSS.pMonth }>2023-05</p>
                <button className={ WorkRestListCSS.btn2 }>&gt;</button>
                <button className={ WorkRestListCSS.btn3 }>Today</button>
                </div>
                <hr className={ WorkRestListCSS.hr }></hr>
                <div className={ WorkRestListCSS.btnContainer2 }>
                    <div className={ WorkRestListCSS.dateSelect }>
                        <DateSelect onDateChange={handleDateChange} />
                        {/* <input className={ WorkRestListCSS.inputBox }></input> */}
                    </div>
                </div>
                <hr className={ WorkRestListCSS.hr }></hr>
                <table className={ WorkRestListCSS.table }>
                    <tr className={ WorkRestListCSS.th }>
                        <th>신청 일자</th>
                        <th>부서</th>
                        <th>직급</th>
                        <th>이름</th>
                        <th>상태</th>
                        <th>연차 사유</th>
                        <th>사용 기간</th>
                        <th>사용 일</th>
                    </tr>
                    <tr className={ WorkRestListCSS.td }>
                        <td>2020-12-12</td>
                        <td>금쪽같은</td>
                        <td>대리</td>
                        <td>김길동</td>
                        <td>승인</td>
                        <td>경조사</td>
                        <td>2020-08-08~2020-08-11</td>
                        <td>3</td>
                    </tr>
                </table>
                <div>
                {/* { pageInfo && <PagingBar pageInfo={ pageInfo } setCurrentPage={ setCurrentPage } /> } */}
                </div>
            </div>
        </>
    );
}

export default WorkRestList;