import { useEffect, useState } from 'react';
import WorkCSS from './Work.module.css';
import PagingBar from "../../../components/common/PagingBar";
import { useDispatch, useSelector } from 'react-redux';
import { callWorkMyListAPI } from '../../../apis/WorkAPICalls';
import { callAdminWorkListAPI, putWorkStatusModifyAPI } from '../../../apis/AdminWorkAPICalls';
import { callWorkstatusAPI } from '../../../apis/WorkStatusAPICalls';
import { useNavigate } from 'react-router-dom';
import DateSelect from '../../../components/Work/DateSelect';

function WorkAdminMonth({ adminList }) {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { myWork } = useSelector(state => state.workReducer);
    const [selectedDate, setSelectedDate] = useState(null)
    const [year, setYear] = useState(new Date().getFullYear());
    const [month, setMonth] = useState(new Date().getMonth() + 1);
    const [currentPage, setCurrentPage] = useState(1);
    const [year2, setYear2] = useState(new Date().getFullYear());
    const [month2, setMonth2] = useState(new Date().getMonth() + 1);
    const [form, setForm] = useState({});
    //nabvar 에서의 변경값이 있을 떄 변경 해주기 위한 설정 
    const { status } = useSelector(state => state.workStatusReducer);
    const { work } = useSelector(state => state.workReducer);
    
    // const [isFirstRender, setFirstRender] = useState(true);
    // const pageInfo = myWork.pageInfo;
    const pageInfo = status && status ? status.pageInfo : null;
    // 나중에 수정

    console.log('status :', status);

    const today = new Date();

    const formattedDate = formatDate(today);
    // const [formattedDate, setFormattedDate] = useState(null);

    function formatDate(date) {
        const year = date.getFullYear();
        //월은 더하기 1 .padStart는 ???
        const month = String(date.getMonth() + 1).padStart(2, "0"); // 월은 0부터 시작하므로 +1을 해줌
    
        return `${year}-${month}`;
    }

    const baicTime = '09:00:00';


    const dateObj = new Date(`1970-01-01T${baicTime}.000Z`);
    // const dateObj2 = new Date(`1970-01-01T${quitTIme}.000Z`);

    // getTime() 메서드로 밀리초 단위 시간으로 변환
    const timeInMs = dateObj.getTime();

    function formatDuration(startTime, endTime) {
        //new Date() 에 2002-02같은 유효한단위로 넣지 않으면 밀리초 단위로 시간 계산이 된다. 밑에 구문에서 밀리초 단위를 계산하여 문자열로 반환한다.
        const start = new Date(startTime);
        const end = new Date(endTime);
        const duration = end.getTime() - start.getTime();
        const hours = Math.floor(duration / (1000 * 60 * 60)).toString().padStart(2, '0');
        const minutes = Math.floor((duration / (1000 * 60)) % 60).toString().padStart(2, '0');
        const seconds = Math.floor((duration / 1000) % 60).toString().padStart(2, '0');
        //문자 타입으로 반환
        return `${hours}:${minutes}:${seconds}`;
    }

    // 근무 시간을 계산하고 추가 시간 게산을 위해 Date 타입으로 반환 받기 위한 함수
    function formatDuration2(startTime, endTime) {
        const start = new Date(startTime);
        const end = new Date(endTime);
        const duration = end - start;
        //근무 시간을 문자열이 아닌 밀리초 단위로 반환
        return new Date(duration);
    }
    //시간 계사을 다시 ::: 의 형태로
    function formatDuration3(plusTime) {
        const plus = new Date(plusTime);
        const hours = Math.floor(plus / (1000 * 60 * 60)).toString().padStart(2, '0');
        const minutes = Math.floor((plus / (1000 * 60)) % 60).toString().padStart(2, '0');
        const seconds = Math.floor((plus / 1000) % 60).toString().padStart(2, '0');
        return `${hours}:${minutes}:${seconds}`;
    }


    const handleYearChange = (bYear, year) => {
        setYear2(year);
        console.log('bYear : ', bYear);
        console.log('year : ', year);
        setCurrentPage(1);
    };
    
    const handleMonthChange = (bMonth, month) => {
        setMonth2(month);
        console.log('bMonth : ', bMonth);
        console.log('month : ', month);
        setCurrentPage(1);
    }

    useEffect(() => {
        if (selectedDate) {
            dispatch(callAdminWorkListAPI({ date: selectedDate, currentPage }))
            dispatch(callWorkstatusAPI({ date: selectedDate }))
        } else if (formattedDate) {
            dispatch(callAdminWorkListAPI({ date: formattedDate, currentPage }))
            dispatch(callWorkstatusAPI({ date: formattedDate }))
        }
    }, [selectedDate, formattedDate])

    useEffect(() => {
        console.log('year2 : ', year2);
        console.log('month2 : ', month2);

        if (year2 && month2) {
            if (month2 < 10) {
                const month = '0' + month2.toString()
                const workDate = year2.toString() + '-' + month;
                console.log(workDate);
                dispatch(callWorkMyListAPI({ workDate, currentPage }));
                dispatch(callWorkstatusAPI({ date: selectedDate }))
            } else {
                const workDate = year2.toString() + month2.toString();
                console.log(workDate);
                dispatch(callWorkMyListAPI({ workDate, currentPage }));
                dispatch(callWorkstatusAPI({ date: formattedDate }))

            }
        }

    }, [currentPage]);

    console.log('currentPage : ', currentPage);



    return (
        <>

            <div className={WorkCSS.main}>
                <p className={WorkCSS.p}>근태 관리</p>
                <div className={WorkCSS.btnContainer}>
                    <button className={WorkCSS.btn}>&lt;</button>
                    <p className={WorkCSS.pMonth}>2023-05</p>
                    <button className={WorkCSS.btn2}>&gt;</button>
                    <button className={WorkCSS.btn3}>Today</button>
                </div>
                <hr className={WorkCSS.hr}></hr>
                <div className={WorkCSS.btnContainer2}>
                    <div className={WorkCSS.dateSelect}>
                        <DateSelect 
                        year2={year2}
                        month2={month2}
                        
                        onYearChange={handleYearChange} onMonthChange={handleMonthChange}
                        
                        // onChageHandler={ onChageHandler }
                        
                        />
                        <input className={WorkCSS.inputBox}></input>
                    </div>
                </div>
                <hr className={WorkCSS.hr}></hr>
                <table className={WorkCSS.table}>
                    <thead>
                        <tr className={WorkCSS.th}>
                            <th>부서</th>
                            <th>직급</th>
                            <th>이름</th>
                            <th>출근 일수</th>
                            <th>지각 일수</th>
                            <th>결근 일수</th>
                        </tr>
                    </thead>
                    <tbody>
                        {status && status.data && status.data.map((status) => (
                            <tr className={WorkCSS.td} key={status.emp.empCode}>
                                <td>{status.emp.dept.deptName}</td>
                                <td>{status.emp.job.jobName}</td>
                                <td>{status.emp.empName}</td>
                                <td>{status.workNormalDto.length}</td>
                                <td></td>
                                <td></td>
                                <td>
                                </td>
                                <td>
                                </td>
                            </tr> 
                        ))}
                    </tbody>
                </table>
                <div>
                    {pageInfo && <PagingBar pageInfo={pageInfo} setCurrentPage={setCurrentPage} />}
                </div>
            </div>
        </>
    );
}

export default WorkAdminMonth;