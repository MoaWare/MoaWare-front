import { useEffect, useState } from 'react';
import WorkCSS from './Work.module.css';
import DateSelect from '../../../components/Work/DateSelect';
import PagingBar from "../../../components/common/PagingBar";
import { useDispatch, useSelector } from 'react-redux';
import { callWorkMyListAPI } from '../../../apis/WorkAPICalls';

function Work() {

    const dispatch = useDispatch();
    const works = useSelector(state => state.workReducer);
    const [selectedDate, setSelectedDate] = useState(null)
    const [year, setYear] = useState(new Date().getFullYear());
    const [month, setMonth] = useState(new Date().getMonth() + 1);
    const [currentPage, setCurrentPage] = useState(1);
    const [isFirstRender, setFirstRender] = useState(true);
    const pageInfo = works.pageInfo; 
    // 나중에 수정
    
    console.log('works :', works);

    useEffect(
        () => {
            const today = new Date();
            const formattedDate = formatDate(today);
            // const workDate = { formattedDate };
            // console.log(workDate);

            // callAPI({ data: formattedDate})
            //     .then(response => {
            //     // API 호출 성공 시 처리 로직
            //     })
            //     . catch(error => {
            //     // API 호출 실패 시 처리 로직    
            //     });

            if (isFirstRender) {
                dispatch(callWorkMyListAPI({ workDate: formattedDate, currentPage }));
                setFirstRender(false);
              }
        }, [isFirstRender, currentPage]);
    
    function formatDate(date) {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0"); // 월은 0부터 시작하므로 +1을 해줌

        return `${year}-${month}`;
    }
    const handleDateChange = (year, month) => {

    };

    
      

    return (
        <>
            
            <div className={ WorkCSS.main }>
                <p className={ WorkCSS.p }>근태 관리</p>
                <div className={ WorkCSS.btnContainer }>
                <button className={ WorkCSS.btn }>&lt;</button>
                <p className={ WorkCSS.pMonth }>2023-05</p>
                <button className={ WorkCSS.btn2 }>&gt;</button>
                <button className={ WorkCSS.btn3 }>Today</button>
                </div>
                <hr className={ WorkCSS.hr }></hr>
                <div className={ WorkCSS.btnContainer2 }>
                    <div className={ WorkCSS.dateSelect }>
                        <DateSelect onDateChange={handleDateChange} />
                        <input className={ WorkCSS.inputBox }></input>
                    </div>
                </div>
                <hr className={ WorkCSS.hr }></hr>
                <table className={ WorkCSS.table }>
                    <tr className={ WorkCSS.th }>
                        <th>날짜</th>
                        <th>출근 시간</th>
                        <th>퇴근 시간</th>
                        <th>근무 시간</th>
                        <th>연장 시간</th>
                        <th>상태</th>
                    </tr>
                    <tr className={ WorkCSS.td }>
                        <td>09:00:00</td>
                        <td>09:00:00</td>
                        <td>09:00:00</td>
                        <td>09:00:00</td>
                        <td>09:00:00</td>
                        <td>지각</td>
                    </tr>
                </table>
                <div>
                { pageInfo && <PagingBar pageInfo={ pageInfo } setCurrentPage={ setCurrentPage } /> }
                </div>
            </div>
        </>
    );
}

export default Work;