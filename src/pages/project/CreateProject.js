import { useEffect, useState } from 'react';
import CreteProjCSS from './CreateProject.module.css';
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { useDispatch, useSelector } from 'react-redux';
import { callDeptEmpListAPI, callProjectRegistAPI } from '../../apis/ProjectAPICalls';
import moment from "moment";
import { Navigate, useNavigate } from 'react-router-dom';
import { callDeptListAPI } from '../../apis/EmployeeAPICalls';
import { callMemberInfoAPI } from '../../apis/MemberAPICalls';

function CreateProject() {

    const [selectedStartDate, setSelectedStartDate] = useState(null)
    const [selectedEndDate, setSelectedEndDate] = useState(null)
    const [selectedDept, setSelectedDept] = useState(6);
    const [selectedEmp, setSelectedEmp] = useState("");
    const [selectedEmpList, setSelectedEmpList] = useState([]);
    // const { depts } = useSelector(state => state.projectReducer);
    const [change, setChange ] = useState(false);
    const { emps, regist } = useSelector(state => state.projectReducer);
    const { depts } = useSelector(state => state.employeeReducer);
    const { name } = useSelector(state => state.employeeReducer);
    const { info } = useSelector(state => state.memberReducer);
    const [form, setForm] = useState({});
    // const deptList = dept.data;
    const today = new Date().toISOString().slice(0, 10);
    const dispatch = useDispatch();
    const navigate = useNavigate();


    console.log('프로젝트 생성에서의 내임 출력', name);
    // const [depties, setDepties] = useState([]);
    
    useEffect(
        () => {        
                console.log('화ㅗㅘㅘㅗㅘㅘㅘㅏㄱ아아아아아')
                setChange(false);
                dispatch(callDeptListAPI())
    }, [change]);

    useEffect(
        () => {        

                dispatch(callDeptEmpListAPI({ deptCode: selectedDept }));
                dispatch(callMemberInfoAPI());
    }, [selectedDept]);

    //초기 직원 상태
    useEffect(() => {
        if (emps && emps.length > 0) {
          setSelectedEmp(`${emps[0].empCode} ${emps[0].empName} ${emps[0].email}`);
        }
      }, [emps]);

    useEffect(() => {
         dateCheck();
    }, [selectedStartDate, selectedEndDate]);

    useEffect(() => {
        if (regist?.status === 200) {
          alert('생성 완료.');
          navigate("/project");
        } else if (regist?.state === 400) {
          alert(regist.message);
        }
      }, [regist]);

    const onCangeDeptHandler = (e) => {
            const selectedValue = e.target.value;
            setSelectedDept(selectedValue)
            console.log(selectedValue);
    }
        
    const onChangeEmpHandler = e => {
        const selectedValue = e.target.value;
        console.log(selectedValue);
        console.log(info.empCode +" "+ info.empName +" "+ info.email);
        setSelectedEmp(selectedValue);

    }

    const onStartDateHandler = startDate => {
        setSelectedStartDate(startDate);
        dateCheck();
    }

    const onEndeDateHandler = (endDate) => {
        setSelectedEndDate(endDate)
        dateCheck();
    }

    const dateCheck = () => {

        console.log('selectedStartDate:', selectedStartDate);
        console.log('selectedEndDate:', selectedEndDate);
        console.log('날짜 체크');
        if (
          selectedStartDate &&
          selectedEndDate &&
          selectedStartDate.getTime() > selectedEndDate.getTime()
        ) {
          console.log('selectedStartDate가 selectedEndDate보다 이후입니다.');
        } else {
          console.log('조건 미충족');
        }
      };
        
    const onClickHandler = () => {
        setChange(true)

        if (selectedEmp) {
            // 현재 사용자인지 확인
            if (selectedEmp === info.empCode + " " + info.empName + " " + info.email) {
              return;
            } else {
                const newEmp = {
                  id: selectedEmpList.length + 1,
                  code:selectedEmp.split(' ')[0],
                  name: selectedEmp.split(" ")[1],
                  email: selectedEmp.split(" ")[2],
                };
                setSelectedEmpList((prevEmpList) => [...prevEmpList, newEmp]);
                setSelectedEmp("");
              }
            }
        
    }
    //_ 요소 변수 사용안해서 _ 현재 인덱스가 같지 않은 경우에만 유지
    const removeEmp = (index) => {
        setSelectedEmpList(prevEmpList => prevEmpList.filter((_, i) => i !== index));
    };

    const onChangeHandler = (e) => {
        setForm({
            ...form,
            [e.target.name] : e.target.value
        });
    }
    console.log(form);

    const onClickCreate = () => {

        if(!form.projName || !form.projContent) {
            alert('정보를 모두 입력해주세요');
            return;
        } else if(selectedEndDate == null ){
            alert('날짜를 입력해주세요.');          
        } else if(selectedStartDate > selectedEndDate) {
            alert('종료일이 시작일 보다 빠릅니다.');
            return;
        } else if(selectedStartDate == null) {
            alert('날짜를 입력해주세요.');
        }
        /* 서버로 전달할 FormData 형태의 객체 설정 */
        const formData = new FormData();
        formData.append("projName", form.projName);
        formData.append("projContent", form.projContent);
        formData.append("projStartDate", moment(selectedStartDate).format('YYYY-MM-DD'));
        formData.append("projEndDate", moment(selectedEndDate).format('YYYY-MM-DD'));
        formData.append("projMember", selectedEmpList.map((emp, index) => ({
                projCode: 0,
                projMember: emp.code,
        })));
        

        console.log(moment(selectedEndDate).format('YYYY-MM-DD'))
        console.log(moment(selectedStartDate).format('YYYY-MM-DD'))
        console.log(form.projContent)
        console.log(form.projName)
        console.log(selectedEmpList);

        for (const entry of formData.entries()) {
            console.log('f폼이다', entry);
        }
        console.log('f폼이다', formData);

        dispatch(callProjectRegistAPI(formData, selectedEmpList))
    }    

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
                            name="projName"
                            placeholder="프로젝트 이름"
                            autoComplete='off'
                            onChange={ onChangeHandler }
                        >
                        </input>
                    </div>
                    <div className={CreteProjCSS.container}>
                        <span className={CreteProjCSS.span1}>프로젝트 팀장</span>
                        <div className={CreteProjCSS.span2}>
                            {info && info.empName}
                        </div>
                    </div>
                    <div className={CreteProjCSS.container}>
                        <span className={CreteProjCSS.span1}>부서 선택</span>
                            <select name="dept" id="deptCode" className={CreteProjCSS.span2} onChange={onCangeDeptHandler} value={selectedDept}> 
                            {depts &&
                                    depts
                                    .filter((dept) => dept.deptCode >= 6)
                                    .map((dept) => (
                                        <option key={dept.deptCode} value={dept.deptCode}>
                                        {dept.deptName}
                                        </option>
                            ))}
                            </select>
                    </div >
                    <div className={CreteProjCSS.container}>
                            <span className={CreteProjCSS.span1}>팀원 선택</span>
                            <select onChange={onChangeEmpHandler} value={selectedEmp} className={CreteProjCSS.span5}>
                            {emps && emps.length > 0 && 
                                    emps.map((emp) => (
                                        <option key={emp.empCode} value={`${emp.empCode} ${emp.empName} ${emp.email}`}>
                                            {emp.empName}
                                        </option>
                            ))}
                            </select>
                            <button onClick={ onClickHandler } className={CreteProjCSS.createBtn}>
                            추가하기
                            </button>
                    </div>
                    <div >
                        {/* <button onClick={ onClickHandler } className={CreteProjCSS.createBtn}>
                            추가하기
                        </button> */}
                    </div>
                    <div className={CreteProjCSS.container}>
                        <span className={CreteProjCSS.span7}>프로젝트 팀원</span>
                        <div className={CreteProjCSS.span6}>
                            {selectedEmpList
                                //self 검색 값 
                                .filter((member, index, self) =>
                                    //검색했을 때 이메일이 find
                                    index === self.findIndex((m) => m.email === member.email)
                                )
                                .map((member, index) => (
                                    <div key={index} className={CreteProjCSS.span8}>
                                    {member.name} {member.email} <button onClick={() => removeEmp(index)} className={CreteProjCSS.createBtn2}>x</button>
                            </div>
                            ))}
                        </div>
                    </div>
                    <div className={CreteProjCSS.container}>
                        <span className={CreteProjCSS.span1}>프로젝트 시작일</span>
                        <div className={CreteProjCSS.date}>
                            <DatePicker className={CreteProjCSS.datepicker}
                                selected={selectedStartDate}
                                onChange={ onStartDateHandler }
                                dateFormat='yyyy-MM-dd'
                                minDate={today}
                            />
                        </div>
                        <span className={CreteProjCSS.span1}>프로젝트 종료일</span>
                        <div className={CreteProjCSS.date}>
                            <DatePicker className={CreteProjCSS.datepicker}
                                selected={selectedEndDate}
                                onChange={ onEndeDateHandler }
                                dateFormat='yyyy-MM-dd'
                            />
                        </div>
                    </div>
                    <div className={CreteProjCSS.container}>
                        <span className={CreteProjCSS.span3}>프로젝트내용</span>
                        <textarea className={CreteProjCSS.span4}
                               name="projContent"
                               onChange={ onChangeHandler }
                        >
                        </textarea>
                    </div>
                    <div>
                        <button className={CreteProjCSS.workBtn1}
                            onClick={ onClickCreate }
                        >생성하기</button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default CreateProject;