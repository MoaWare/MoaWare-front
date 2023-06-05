import { useEffect, useState} from "react";
import { useNavigate, useParams } from 'react-router-dom'; 
import { useDispatch, useSelector } from "react-redux";
import { callAdminEmpUpdateAPI, callAdminEmpDetailAPI } from '../../apis/AdminAPICalls';
import CSS from "./AdminEmpModify.module.css";

function AdminEmpModify() {
    const { empCode } = useParams();
    const { detail } = useSelector(state => state.employeeReducer);
    const { modify } = useSelector(state => state.adminReducer);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [form, setForm] = useState({});


    /* 읽기모드와 수정모드를 구분 */
    const [modifyMode, setModifyMode] = useState(false);

    /* 최초 랜더링 시 게시물 상세 정보 조회 */
    useEffect(() => {
        dispatch(callAdminEmpDetailAPI({ empCode }));
    }, []);

    useEffect(
        () => {
            if(modify?.status === 200) {
                alert('계정정보 수정이 완료 되었습니다.');
                navigate('/admin/emp/list', { replace : true });
            }
        },
        [modify]
    )

    /* 입력 양식의 값 변경될 때 */
    const onChangeHandler = (e) => {
        setForm({
            ...form,
            [e.target.name] : e.target.value,
        });
    }

    /* 수정 모드 변경 이벤트 */
    const onClickModifyModeHandler = () => {
        setModifyMode(true);
        setForm({ ...detail });
    }


    /* 게가 변경될 때 */
    const onChangeJobCodeHandler = (e) => {
        setForm({
            ...form,
            job : { jobCode : e.target.value }

        });
    }

    /* 게시판 (코드별) 분류가 변경될 때 */
    const onChangeDeptCodeHandler = (e) => {
        setForm({
            ...form,
            dept : { deptCode : e.target.value }

        });
    }



    
    /* 게시물 수정 저장 버튼 클릭 이벤트 */
    const onClickAdminEmpUpdateHandler = () => {

        const formData = new FormData();
        formData.append("empCode", form.empCode);
        formData.append("empName", form.empName);

        formData.append("phone", form.phone);
        formData.append("empID", form.empID);
        formData.append("job.jobCode", form.job.jobCode);
        formData.append("dept.deptCode", form.dept.deptCode);


        dispatch(callAdminEmpUpdateAPI(formData));
    }

    const inputStyle = !modifyMode ? { backgroundColor : 'lightgrey'} : null;
    const checkValue = !modifyMode ? detail?.empCode : form?.empCode;
    // 모디파일모드? 있을 시에 소스코드 진행/ 디테일? 있을 시에 소스코드 진행 


    const onClickBackHandler = () => {
        navigate('/admin/emp/list');
    }


    return (
        <>
                <div className={ CSS.main }>
                    <div class={CSS.menutitle}> 계정정보 {">"} 수정 </div>
                    {detail&& (
                    <table>
                    <div className={CSS.container}  key={detail.empCode}>
                        <tbody>
                       
                            <tr>
                                <td><label>직급변경: </label></td>
                                <td>
                                    <label>
                                        
                                        <input 
                                            type="radio" 
                                            name="jobCode" 
                                            onChange={ onChangeJobCodeHandler } 
                                            value={1}
                                            readOnly={ !modifyMode }
                                            checked={ checkValue == 1 }
                                        />사원
                                    </label> &nbsp;
                                    <label>
                                        <input 
                                            type="radio" 
                                            name="jobCode" 
                                            onChange={ onChangeJobCodeHandler } 
                                            value={2}
                                            readOnly={ !modifyMode }
                                            checked={ checkValue == 2 }
                                        />팀장
                                    </label> &nbsp;
                                    <label>
                                        <input 
                                            type="radio" 
                                            name="jobCode" 
                                            onChange={ onChangeJobCodeHandler } 
                                            value={3}
                                            readOnly={ !modifyMode }
                                            checked={ checkValue == 3 }
                                        />부장
                                    </label> &nbsp;
                                    <label>
                                        <input 
                                            type="radio" 
                                            name="jobCode" 
                                            onChange={ onChangeJobCodeHandler } 
                                            value={4}
                                            readOnly={ !modifyMode }
                                            checked={ checkValue == 4 }
                                        />본부장
                                    </label> &nbsp;
                                    <label>
                                        <input 
                                            type="radio" 
                                            name="jobCode" 
                                            onChange={ onChangeJobCodeHandler } 
                                            value={5}
                                            readOnly={ !modifyMode }
                                            checked={ checkValue == 5 }
                                        />이사
                                    </label>
                                </td>
                            </tr>
                            
                            <tr>
                                <td><label>부서변동: </label></td>
                                <td>
                                    <label>
                                        
                                        <input 
                                            type="radio" 
                                            name="deptCode" 
                                            onChange={ onChangeDeptCodeHandler } 
                                            value={1}
                                            readOnly={ !modifyMode }
                                            checked={ checkValue == 1 }
                                        />경영관리실
                                    </label> &nbsp;
                                    <label>
                                        <input 
                                            type="radio" 
                                            name="deptCode" 
                                            onChange={ onChangeDeptCodeHandler } 
                                            value={2}
                                            readOnly={ !modifyMode }
                                            checked={ checkValue == 2 }
                                        />전략기획실
                                    </label> &nbsp;
                                    <label>
                                        <input 
                                            type="radio" 
                                            name="deptCode" 
                                            onChange={ onChangeDeptCodeHandler } 
                                            value={3}
                                            readOnly={ !modifyMode }
                                            checked={ checkValue == 3 }
                                        />마케팅실
                                    </label> &nbsp;
                                    <label>
                                        <input 
                                            type="radio" 
                                            name="deptCode" 
                                            onChange={ onChangeDeptCodeHandler } 
                                            value={4}
                                            readOnly={ !modifyMode }
                                            checked={ checkValue == 4 }
                                        />영업
                                    </label> &nbsp;
                                    <label>
                                        <input 
                                            type="radio" 
                                            name="deptCode" 
                                            onChange={ onChangeDeptCodeHandler } 
                                            value={5}
                                            readOnly={ !modifyMode }
                                            checked={ checkValue == 5 }
                                        />시스템 관실
                                    </label>
                                </td>
                            </tr>


                            <td><label>사원이름: </label></td>
                                <td>
                                    <input 
                                        name='empName'
                                        placeholder='사원 이름'
                                        type='text'
                                        className={ CSS.title }
                                        onChange={ onChangeHandler }
                                        value={ !modifyMode ? detail.empName : detail.empName }
                                        readOnly={ !modifyMode }
                                        style={ inputStyle }
                                    />
                                </td>   
                            <tr>
                                <td><label>사원번호 : </label></td>
                                <td>
                                    <input 
                                        name='empCode'
                                        placeholder='사원 번호'
                                        type='number'
                                        className={ CSS.title }
                                        onChange={ onChangeHandler }
                                        value={ !modifyMode ? detail.postTitle : form.postTitle }
                                        readOnly={ !modifyMode }
                                        style={ inputStyle }
                                    />
                                </td>
                            </tr>  
                            <tr>
                                <td><label>전화번호 : </label></td>
                                <td>
                                    <input 
                                        name='phone'
                                        placeholder='전화 번호'
                                        type='number'
                                        className={ CSS.title }
                                        onChange={ onChangeHandler }
                                        value={ !modifyMode ? detail.phone : form.phone }
                                        readOnly={ !modifyMode }
                                        style={ inputStyle }
                                    />
                                </td>
                            </tr>
                            <tr> 
                                <td><label>직원ID : </label></td>
                                <td>
                                    <input 
                                        name='empID'
                                        placeholder='직원 ID'
                                        type='text'
                                        className={ CSS.title }
                                        onChange={ onChangeHandler }
                                        value={ !modifyMode ? detail.empID : form.empID }
                                        readOnly={ !modifyMode }
                                        style={ inputStyle }
                                    />
                                </td>
                            </tr>



                        </tbody>                        
                        </div>
                    </table>
                    )}
                        <div className={CSS.content3}>    
                                    <button className={CSS.cancel} onClick = { onClickBackHandler }>이전</button>            
            {!modifyMode &&
                    <button 
                        onClick={ onClickModifyModeHandler }
                    >
                        수정 모드
                    </button>
            }
            { modifyMode && 
                    <button 
                        onClick={ onClickAdminEmpUpdateHandler }
                    >
                        계정 수정 저장하기
                    </button>
            }
            </div>   
                </div>
        
        </>
    );
}

export default AdminEmpModify;