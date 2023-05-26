import { useEffect, useState } from 'react';
import WorkCSS from './Work.module.css';
import DateSelect from '../../../components/Work/DateSelect';
import PagingBar from "../../../components/common/PagingBar";
import { useDispatch, useSelector } from 'react-redux';
import { callWorkMyListAPI } from '../../../apis/WorkAPICalls';
import { callAdminWorkListAPI } from '../../../apis/AdminWorkAPICalls';

function WorkAdmin() {

    const dispatch = useDispatch();
    const { myWork } = useSelector(state => state.workReducer);
    const [selectedDate, setSelectedDate] = useState(null)
    const [year, setYear] = useState(new Date().getFullYear());
    const [month, setMonth] = useState(new Date().getMonth() + 1);
    const [currentPage, setCurrentPage] = useState(1);
    const [year2, setYear2] = useState(new Date().getFullYear());
    const [month2, setMonth2 ] = useState(new Date().getMonth() + 1);
    const [form, setForm] = useState({});
    //nabvar 에서의 변경값이 있을 떄 변경 해주기 위한 설정 
    const { admin } = useSelector(state => state.adminWorkReducer);
    const { work } = useSelector(state => state.workReducer);
    // const [isFirstRender, setFirstRender] = useState(true);
    // const pageInfo = myWork.pageInfo;
    const pageInfo = admin && admin ? admin.pageInfo : null;
    // 나중에 수정
    
    console.log('admin :', admin ? admin.data : "");
    
    const today = new Date();
    
    const formattedDate = formatDate(today);
    // const [formattedDate, setFormattedDate] = useState(null);
    
    function formatDate(date) {
        const year = date.getFullYear();
        //월은 더하기 1 .padStart는 ???
        const month = String(date.getMonth() + 1).padStart(2, "0"); // 월은 0부터 시작하므로 +1을 해줌
        const day = String(date.getDate()).padStart(2, "0");    

        return `${year}-${month}-${day}`;
    }

    const onChangeDateHandler = (e) => {
        const date = e.target.value;
        setSelectedDate(date);
        console.log('날짜나와라 ㄹㄹㄹㄹㄹㄹㄹㄹ', e.target.name, e.target.value);
        console.log('날짜나와라 ㄹㄹㄹㄹㄹㄹㄹㄹ', date);
        // dispatch(callAdminWorkListAPI({ date, currentPage }))
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

    useEffect(() => {
        if(selectedDate){
            dispatch(callAdminWorkListAPI({ date : selectedDate, currentPage }))
        } else if(formattedDate) {
            dispatch(callAdminWorkListAPI({ date : formattedDate, currentPage }))
        }
    },[selectedDate, formattedDate])

    useEffect(() => {
        console.log('year2 : ', year2);
        console.log('month2 : ', month2);
        
        if(year2 && month2) {
            if(month2 <10 ){
                const month = '0'+month2.toString()
                const workDate = year2.toString()+'-'+month;
                console.log(workDate);
                dispatch(callWorkMyListAPI({ workDate, currentPage }));
            } else {
                const workDate = year2.toString()+month2.toString();
                console.log(workDate);
                dispatch(callWorkMyListAPI({ workDate, currentPage }));
            }
        }

    },[currentPage]);

    console.log('currentPage : ', currentPage);


      
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
                        {/* <DateSelect 
                        year2={year2}
                        month2={month2}
                        
                        onYearChange={handleYearChange} onMonthChange={handleMonthChange} 
                        
                        // onChageHandler={ onChageHandler }
                        
                        /> */}
                        <input type="date"
                               name="date"
                               onChange={ onChangeDateHandler }
                        ></input>
                        <input className={ WorkCSS.inputBox }></input>
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
                            <th>지각</th>
                            <th>결근</th>
                            <th>사용 연차일</th>
                        </tr>
                    </thead>
                    <tbody>
                    {admin && admin.data && admin.data.map((admin) => (
                            <tr className={WorkCSS.td} key={admin.emp.empCode}>
                                <td>{admin.workPk.workDate.substring(0, 10)}</td>
                                <td>{admin.workTime ? admin.workTime.substring(11, 19) : ""}</td>
                                <td>{admin.quitTime ? admin.quitTime.substring(11, 19) : ""}</td>
                                <td>{admin.workTime && admin.quitTime ? formatDuration3(formatDuration2(admin.workTime, admin.quitTime)) : ""}</td>
                                <td>
                                    {admin.workTime && admin.quitTime
                                    ? formatDuration2(admin.workTime, admin.quitTime) > timeInMs
                                    ? formatDuration3(formatDuration2(admin.workTime, admin.quitTime) - timeInMs)
                                    : ""
                                : ""}
                                </td>
                                <td>
                                {admin.workStatus}
                                </td>
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

export default WorkAdmin;