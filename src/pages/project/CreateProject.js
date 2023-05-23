import { useEffect, useState } from 'react';
import CreteProjCSS from './CreateProject.module.css';
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { useDispatch, useSelector } from 'react-redux';
import { callDeptEmpListAPI, callDeptListAPI } from '../../apis/ProjectAPICalls';

function CreateProject() {

    const [selectedStartDate, setSelectedStartDate] = useState(null)
    const [selectedEndDate, setSelectedEndDate] = useState(null)
    const [selectedDept, setSelectedDept] = useState("");
    const [selectedEmp, setSelectedEmp] = useState("");
    const [selectedEmpList, setSelectedEmpList] = useState([]);
    // const { depts } = useSelector(state => state.projectReducer);
    const [change, setChange ] = useState(false);
    const { depts, emps } = useSelector(state => state.projectReducer);
    const [form, setForm] = useState({});
    // const deptList = dept.data;
    const today = new Date().toISOString().slice(0, 10);
    const dispatch = useDispatch();

    // const [depties, setDepties] = useState([]);
    
    useEffect(
        () => {        
                console.log('화ㅗㅘㅘㅗㅘㅘㅘㅏㄱ아아아아아')
                setChange(false);
                dispatch(callDeptListAPI())
    }, [change]);

    useEffect(
        () => {        
            if (selectedDept) {
                dispatch(callDeptEmpListAPI({ deptName: selectedDept }));
            } 
            // else if(change) {
            //     dispatch(callDeptListAPI())
            // }
    }, [selectedDept]);

    //초기 직원 상태
    useEffect(() => {
        if (emps && emps.length > 0) {
          setSelectedEmp(`${emps[0].empName} ${emps[0].email}`);
        }
      }, [emps]);

    const onCangeDeptHandler = (e) => {
            const selectedValue = e.target.value;
            setSelectedDept(selectedValue)
    }
        
    const onChangeEmpHandler = e => {
            const selectedValue = e.target.value;
            setSelectedEmp(selectedValue);
    }
        
    const onClickHandler = () => {
        setChange(true)
        if (selectedEmp) {
            const newEmp = {
                id: 1, // 고유 식별자 생성
                name: selectedEmp.split(' ')[0],
                email: selectedEmp.split(' ')[1]
                };
                setSelectedEmpList((prevEmpList) => [...prevEmpList, selectedEmp]);
                setSelectedEmp('');
        }
    }
    //_ 요소 변수 사용안해서 _ 현재 인덱스가 같지 않은 경우에만 유지
    const removeEmp = (index) => {
        setSelectedEmpList(prevEmpList => prevEmpList.filter((_, i) => i !== index));
    };

    // console.log(deptList);
    console.log(depts);
    console.log(emps);

    return (
        <>
            <div className={CreteProjCSS.main}>
                <p className={CreteProjCSS.p}>프로젝트 생성</p>
                <hr className={CreteProjCSS.hr}></hr>
                <div className={CreteProjCSS.center}>
                    <div className={CreteProjCSS.container}>
                        <span className={CreteProjCSS.span1}>프로젝트 이름</span>
                        <input className={CreteProjCSS.span2}
                            type="text"
                            name="projTitle"
                            placeholder="프로젝트 이름"
                            autoComplete='off'
                        >
                        </input>
                    </div>
                    <div className={CreteProjCSS.container}>
                        <span className={CreteProjCSS.span1}>프로젝트 팀장</span>
                        <div className={CreteProjCSS.span2}>
                            아
                        </div>
                    </div>
                    <div className={CreteProjCSS.container}>
                        <span className={CreteProjCSS.span1}>팀원 선택</span>
                        {/* <select name="dept" id="deptCode" className={CreteProjCSS.span2}
                                
                                onChange={ onCangeDeptHandler }
                        > 
                            {depts && depts.map((dept) => (
                                <option key={dept.deptCode} value={dept.deptCode}>
                                    {dept.deptName}
                                </option>
                            ))}
                        </select> */}
                        {depts && depts.length > 0 && (
                        <select 
                                name="dept" id="deptCode" className={CreteProjCSS.span2} onChange={onCangeDeptHandler} value={selectedDept}> 
                            {depts &&
                                depts
                                .filter((dept) => dept.deptCode >= 6) // 5번까지의 값만 필터링
                                .map((dept) => (
                                    <option key={dept.deptCode} value={dept.deptName}>
                                    {dept.deptName}
                                    </option>
                                ))}
                        </select>
                        )}
                        {/* <select value={selectedDept} name="dept" onChange={onCangeDeptHandler} className={CreteProjCSS.span2}>
                            <option value="재무1팀">재무 1팀</option>
                            <option value="재무2팀">재무 2팀</option>
                            <option value="영업1팀">영업 1팀</option>
                            <option value="영업2팀">영업 2팀</option>
                            <option value="마케팅1팀">마케팅 1팀</option>
                            <option value="마케팅2팀">마케팅 2팀</option>
                            <option value="전산1팀">전산 1팀</option>
                            <option value="전산2팀">전산 2팀</option>
                        </select> */}

                            {/* {emps && 
                                emps.map((emp) => (
                                    <option key={emp.empCode} value={emp.dept.deptName}>
                                        {emp.dept.deptName}
                                    </option>
                                ))} */}
                        {emps && emps.length > 0 && (
                        <select onChange={onChangeEmpHandler} value={selectedEmp} className={CreteProjCSS.span2}>
                            {emps && 
                                emps.map((emp) => (
                                    <option key={emp.empCode} value={`${emp.empName} ${emp.email}`}>
                                        {emp.empName}
                                    </option>
                                ))}
                        </select>
                        )}
                        <button onClick={ onClickHandler }>
                            추가하기
                        </button>
                    </div >
                    <div className={CreteProjCSS.container}>
                        <span className={CreteProjCSS.span1}>프로젝트 팀원</span>
                        {selectedEmpList.map((member, index) => (
                            <span key={index}>{member} <button onClick={ () => removeEmp(index)}>삭제하기</button></span>
                            
                        ))}
                    </div>
                    <div className={CreteProjCSS.container}>
                        <span className={CreteProjCSS.span1}>프로젝트 시작일</span>
                        <div className={CreteProjCSS.date}>
                            <DatePicker className={CreteProjCSS.datepicker}
                                selected={selectedStartDate}
                                onChange={(startDate) => setSelectedStartDate(startDate.toISOString())}
                                dateFormat='yyyy-MM-dd'
                            />
                        </div>
                        <span className={CreteProjCSS.span1}>프로젝트 종료일</span>
                        <div className={CreteProjCSS.date}>
                            <DatePicker className={CreteProjCSS.datepicker}
                                selected={selectedEndDate}
                                onChange={(endDate) => setSelectedEndDate(endDate.toISOString())}
                                dateFormat='yyyy-MM-dd'
                            />
                        </div>
                    </div>
                    <div className={CreteProjCSS.container}>
                        <span className={CreteProjCSS.span3}>프로젝트내용</span>
                        <input className={CreteProjCSS.span4}>
                        </input>
                    </div>
                    <div>
                        <button className={CreteProjCSS.workBtn1}>생성하기</button>
                        <button className={CreteProjCSS.workBtn2}>취소하기</button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default CreateProject;