import { useEffect, useState } from 'react';
import WorkCSS from './Work.module.css';
import PagingBar from "../../../components/common/PagingBar";
import { useDispatch, useSelector } from 'react-redux';
import { callWorkMyListAPI } from '../../../apis/WorkAPICalls';
import { callAdminWorkListAPI, inputNameAPI, inputNameAPI2, putWorkStatusModifyAPI } from '../../../apis/AdminWorkAPICalls';
import { callWorkstatusAPI } from '../../../apis/WorkStatusAPICalls';
import { useNavigate } from 'react-router-dom';
import DateSelect from '../../../components/Work/DateSelect';

function WorkAdmin({ adminList }) {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { myWork } = useSelector(state => state.workReducer);
    const [selectedDate, setSelectedDate] = useState(null)
    const [selectedDate2, setSelectedDate2] = useState(null)
    const [year, setYear] = useState(new Date().getFullYear());
    const [month, setMonth] = useState(new Date().getMonth() + 1);
    const [currentPage, setCurrentPage] = useState(1);
    const [year2, setYear2] = useState(new Date().getFullYear());
    const [month2, setMonth2] = useState(new Date().getMonth() + 1);
    const [form, setForm] = useState({});
    //nabvar 에서의 변경값이 있을 떄 변경 해주기 위한 설정 
    const { admin } = useSelector(state => state.adminWorkReducer);
    const { modify } = useSelector(state => state.adminWorkReducer);
    const { name } = useSelector(state => state.adminWorkReducer);
    const { work } = useSelector(state => state.workReducer);
    const [ selectCheck, setSelectCheck ] = useState(null);
    const [ selectValue, setSelectValue ] = useState(undefined);
    const [ insertName, setInsertName ] = useState(undefined);
    
    const pageInfo = admin && admin ? admin.pageInfo : null;

    const today = new Date();

    const formattedDate = formatDate(today);

    function formatDate(date) {
        const year = date.getFullYear();
        //월은 더하기 1 .padStart는 ???
        const month = String(date.getMonth() + 1).padStart(2, "0"); // 월은 0부터 시작하므로 +1을 해줌
        const day = String(date.getDate()).padStart(2, "0");

        return `${year}-${month}-${day}`;
    }

    const onChangeDateHandler = (e) => {
        const date = e.target.value;
    }

    const baicTime = '09:00:00';


    const dateObj = new Date(`1970-01-01T${baicTime}.000Z`);

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

    const handleInputChange = e => {
        setInsertName(e.target.value);
    }

    function handleKeyPress(event) {
        if (event.key === 'Enter') {
                dispatch(inputNameAPI({ name : insertName, workDate : selectedDate ? selectedDate : formattedDate, currentPage}))
        }
    }


    const onChangeCheckBox = (empCode) => {

        setSelectCheck(empCode);
        if(selectCheck == empCode) {
            setSelectCheck(null);
        }
    }


    const onChangeSelect = e => {
        const selectvalue = e.target.value;
        const updatedDate = selectedDate ? selectedDate : formattedDate;
        setForm({
            ...form,
            workPk : {
                empCode: selectCheck,
                workDate : updatedDate,
            }
                ,
                workStatus : selectvalue,
        });
    }

    const onClickModify2 = e =>{
            dispatch(putWorkStatusModifyAPI(form));       
    }

    const onClickCansel = e => {
        setSelectCheck(null);
    }

    useEffect(() => {
        if (modify?.status === 200) {
            navigate("/work/admin")
        } else if(name?.status === 200) {
            navigate("/work/admin")
        } 
        
    }, [modify,name])

    useEffect(() => {
        if (selectedDate) {
            dispatch(callAdminWorkListAPI({ date: selectedDate, currentPage }))
        } else if (formattedDate) {
            dispatch(callAdminWorkListAPI({ date: formattedDate, currentPage }))
        } 
    }, [formattedDate, currentPage, modify])



    return (
        <>

            <div className={WorkCSS.main}>
                <p className={WorkCSS.p}>근태 관리</p>
                <div className={WorkCSS.btnContainer}>
                    <p className={WorkCSS.pMonth}>{formattedDate}</p>
                    <button className={WorkCSS.btn3}>Today</button>
                </div>
                <hr className={WorkCSS.hr}></hr>
                <div className={WorkCSS.btnContainer2}>
                    <div className={WorkCSS.dateSelect}>
                        <input type="date"
                            name="date"
                            onChange={onChangeDateHandler}
                        ></input> 
                        <input className={WorkCSS.inputBox}
                                value={insertName}
                                onChange={handleInputChange}
                                onKeyDown={handleKeyPress}
                        ></input>
                    </div>
                </div>
                <hr className={WorkCSS.hr}></hr>
                <table className={WorkCSS.table}>
                    <thead>
                        <tr className={WorkCSS.th}>
                            <th></th>
                            <th>출근 일자</th>
                            <th>부서</th>
                            <th>직급</th>
                            <th>이름</th>
                            <th>출근 시간</th>
                            <th>퇴근 시간</th>
                            <th>근무 시간</th>
                            <th>연장 시간</th>
                            <th>상태</th>
                            <th>변경</th>
                        </tr>
                    </thead>
                    <tbody>
                        {name && name.data && name.data.map((name) => (
                            <tr className={WorkCSS.td} key={name.empCode}>
                                <td>
                                    <input
                                        type="checkbox"
                                        checked={selectCheck == name.empCode}
                                        onChange={() => onChangeCheckBox(name.empCode)}
                                    />
                                </td>
                                <td>{name.work && name.work.workPk.workDate ? name.work.workPk.workDate.substring(0,10) : selectedDate ? selectedDate : formattedDate ? formattedDate : "" }</td>
                                <td>{name.dept.deptName}</td>
                                <td>{name.job.jobName}</td>
                                <td>{name.empName}</td>
                                <td>{name.work && name.work.workTime ? name.work.workTime.substring(11, 19) : ""}</td>
                                <td>{name.work && name.work.quitTime ? name.work.quitTime.substring(11, 19) : ""}</td>
                                <td>{name.work && name.work.workTime && name.work.quitTime ? formatDuration3(formatDuration2(name.work.workTime, name.work.quitTime)) : ""}</td>
                                <td>
                                    {name.work && name.work.workTime && name.work.quitTime
                                    ? formatDuration2(name.work.workTime, name.work.quitTime) > timeInMs
                                    ? formatDuration3(formatDuration2(name.work.workTime, name.work.quitTime) - timeInMs)
                                    : ""
                                    : ""}
                                </td>
                                <td>
                                    {name.work && name.work.workStatus ? name.work.workStatus : " "}
                                </td>
                                <td>
                                    <select disabled={name.empCode !== selectCheck}
                                        value={selectValue}
                                        onChange={onChangeSelect}
                                        >
                                        <option value=""></option>
                                        <option value="지각">지각</option>
                                        <option value="결근">결근</option>
                                        <option value="연차">연차</option>            
                                        <option value="반차">반차</option>            
                                        <option value="공무">공무</option>            
                                        <option value="출근">출근</option>           
                                    </select>
                                </td>
                            </tr> 
                        ))}
                        {admin && admin.data && admin.data.map((admin) => (
                            <tr className={WorkCSS.td} key={admin.empCode}>
                                <td>
                                    <input
                                        type="checkbox"
                                        checked={selectCheck == admin.empCode}
                                        onChange={() => onChangeCheckBox(admin.empCode)}
                                    />
                                </td>
                                <td>{selectedDate ? selectedDate : formattedDate}</td>
                                <td>{admin.dept.deptName}</td>
                                <td>{admin.job.jobName}</td>
                                <td>{admin.empName}</td>
                                <td>{admin.work && admin.work.workTime ? admin.work.workTime.substring(11, 19) : ""}</td>
                                <td>{admin.work && admin.work.quitTime ? admin.work.quitTime.substring(11, 19) : ""}</td>
                                <td>{admin.work && admin.work.workTime && admin.work.quitTime ? formatDuration3(formatDuration2(admin.work.workTime, admin.work.quitTime)) : ""}</td>
                                <td>
                                    {admin.work && admin.work.workTime && admin.work.quitTime
                                    ? formatDuration2(admin.work.workTime, admin.work.quitTime) > timeInMs
                                    ? formatDuration3(formatDuration2(admin.work.workTime, admin.work.quitTime) - timeInMs)
                                    : ""
                                    : ""}
                                </td>
                                <td>
                                    {admin.work && admin.work.workStatus ? admin.work.workStatus : " "}
                                </td>
                                <td>
                                    <select disabled={admin.empCode !== selectCheck}
                                        value={selectValue}
                                        onChange={onChangeSelect}
                                        >
                                        <option value=""></option>
                                        <option value="지각">지각</option>
                                        <option value="결근">결근</option>
                                        <option value="연차">연차</option>
                                        <option value="반차">반차</option>            
                                        <option value="공무">공무</option>            
                                        <option value="출근">출근</option>              
                                    </select>
                                </td>
                            </tr> 
                        ))}
                    </tbody>
                </table>
                    <div>
                        <button className={WorkCSS.workBtn1}
                            onClick={ onClickModify2 }
                            >변경하기</button>
                        <button className={WorkCSS.workBtn2}
                            onClick={ onClickCansel }
                            >취소하기</button>
                    </div>
                <div>
                    {pageInfo && <PagingBar pageInfo={pageInfo} setCurrentPage={setCurrentPage} />}
                </div>
            </div>
        </>
    );
}

export default WorkAdmin;