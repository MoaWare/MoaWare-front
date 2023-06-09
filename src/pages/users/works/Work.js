import { useEffect, useState } from 'react';
import WorkCSS from './Work.module.css';
import DateSelect from '../../../components/Work/DateSelect';
import PagingBar from "../../../components/common/PagingBar";
import { useDispatch, useSelector } from 'react-redux';
import { callWorkMyListAPI } from '../../../apis/WorkAPICalls';

function Work() {

    const dispatch = useDispatch();
    const { myWork } = useSelector(state => state.workReducer);
    const [selectedDate, setSelectedDate] = useState(null)
    const [year, setYear] = useState(new Date().getFullYear());
    const [month, setMonth] = useState(new Date().getMonth() + 1);
    const [currentPage, setCurrentPage] = useState(1);
    const [year2, setYear2] = useState(new Date().getFullYear());
    const [month2, setMonth2 ] = useState(new Date().getMonth() + 1);
    //nabvar 에서의 변경값이 있을 떄 변경 해주기 위한 설정 
    const { insert } = useSelector(state => state.workReducer);
    const { quit } = useSelector(state => state.workReducer);
    const pageInfo = myWork && myWork ? myWork.pageInfo : null;
    // 나중에 수정
    
    const today = new Date();
    
    const formattedDate = formatDate(today);

    
    function formatDate(date) {
        const year = date.getFullYear();
        //월은 더하기 1 .padStart는 ???
        const month = String(date.getMonth() + 1).padStart(2, "0"); // 월은 0부터 시작하므로 +1을 해줌
    
        return `${year}-${month}`;
    }
    // 근무시간을 계산하고 바로 문자열로 반환 하기 위한 함수
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


    // 연장 시간을 계산하기 위한 기본 근무 시간 
    const baicTime = '09:00:00';
    const dateObj = new Date(`1970-01-01T${baicTime}.000Z`);
    const timeInMs = dateObj.getTime();


    
    const handleYearChange = (bYear, year) => {
        setYear2(year);
        setCurrentPage(1);
    };
    
    const handleMonthChange = (bMonth, month) => {
        setMonth2(month);
        setCurrentPage(1);
    }

    useEffect(() => {
        if (formattedDate) {
            dispatch(callWorkMyListAPI({ workDate: formattedDate, currentPage }));
            } 
            else {
            dispatch(callWorkMyListAPI({ workDate: formattedDate, currentPage }));
            }
    }, [formattedDate, insert, quit ]);

    useEffect(() => {;
        
        if(year2 && month2) {
            if(month2 <10 ){
                const month = '0'+month2.toString()
                const workDate = year2.toString()+'-'+month;
                dispatch(callWorkMyListAPI({ workDate, currentPage }));
            } else {
                const workDate = year2.toString()+month2.toString();
                dispatch(callWorkMyListAPI({ workDate, currentPage }));
            }
        }

    },[year2, month2, currentPage]);



      
    return (
        <>
            
            <div className={ WorkCSS.main }>
                <p className={ WorkCSS.p }>근태 관리</p>
                <div className={ WorkCSS.btnContainer }>
                <p className={ WorkCSS.pMonth }>{formattedDate}</p>
                <button className={ WorkCSS.btn3 }>Today</button>
                </div>
                <hr className={ WorkCSS.hr }></hr>
                <div className={ WorkCSS.btnContainer2 }>
                    <div className={ WorkCSS.dateSelect }>
                        <DateSelect 

                        year2={year2}
                        month2={month2}
                        
                        onYearChange={handleYearChange} onMonthChange={handleMonthChange} 
                        
                        
                        />
                    </div>
                </div>
                <hr className={ WorkCSS.hr }></hr>
                <table className={ WorkCSS.table }>
                    <thead>
                        <tr className={ WorkCSS.th }>
                            <th>출근 일자</th>
                            <th>출근 시간</th>
                            <th>퇴근 시간</th>
                            <th>근무 시간</th>
                            <th>연장 시간</th>
                            <th>상태</th>
                        </tr>
                    </thead>
                    <tbody>
                    {myWork && myWork.data && myWork.data.map((work) => (
                            <tr className={WorkCSS.td} key={work.workPk.workDate}>
                            <td>{work.workPk.workDate.substring(0, 10)}</td>
                            <td>{work.workTime ? work.workTime.substring(11, 19) : ""}</td>
                            <td>{work.quitTime ? work.quitTime.substring(11, 19) : ""}
                            </td>
                            <td>
                                {work.workTime && work.quitTime ? formatDuration3(formatDuration2(work.workTime, work.quitTime)) : ""}
                            </td>
                            <td>
                            {work.workTime && work.quitTime
                                ? formatDuration2(work.workTime, work.quitTime) > timeInMs
                                ? formatDuration3(formatDuration2(work.workTime, work.quitTime) - timeInMs)
                                : ""
                            : ""}  
                            </td>
                            <td>{work.workStatus}</td>
                            </tr>
                            
                        ))}
                    </tbody>
                </table>
                <div>
                { pageInfo && <PagingBar pageInfo={ pageInfo } setCurrentPage={ setCurrentPage } /> }
                </div>
            </div>
        </>
    );
}

export default Work;