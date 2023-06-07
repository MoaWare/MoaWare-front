import { useEffect, useState } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { callAdminEmpUpdateAPI, callAdminEmpDetailAPI } from '../../apis/AdminAPICalls';
import CSS from "./AdminEmpModify.module.css";
import { toast } from "react-toastify";


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
            if (modify?.status === 200) {
                toast.success('계정정보 수정이 완료 되었습니다.', {
                    position: toast.POSITION.TOP_CENTER, // 토스트 위치 (옵션)
                    autoClose: 2000, // 자동으로 닫히는 시간 (ms) (옵션)
                    hideProgressBar: false, // 진행 막대 숨김 여부 (옵션)
                });
                navigate('/admin/emp/list');
            }
        },
        [modify]
    )


    /* 입력 양식의 값 변경될 때 */
    const onChangeHandler = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    }


    /* 수정 모드 변경 이벤트 */
    const onClickModifyModeHandler = () => {
        setModifyMode(true);
        setForm({ ...detail });
    }


    const onChangeJobCodeHandler = (e) => {
        setForm({
            ...form,
            job: { jobCode: e.target.value }
        });
    }


    const onChangeDeptCodeHandler = (e) => {
        setForm({
            ...form,
            dept: { deptCode: e.target.value }
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

    const inputStyle = !modifyMode ? { backgroundColor: 'lightgrey' } : null;
    const checkValue = !modifyMode ? detail.job?.jobCode : form.job?.jobCode;
    const checkValue2 = !modifyMode ? detail.dept?.deptCode : form.dept?.deptCode;

    const onClickBackHandler = () => {
        navigate('/admin/emp/list');
    }

    return (
        <>
            <div className={CSS.main}>
                <div className={CSS.menutitle}> 계정정보 {">"} 수정 </div>
                {detail && (
                    <table>
                        <div key={detail.empCode}>
                            <tbody>

                                <tr>
                                    <th className={CSS.th}><label>직급변경 </label></th>
                                    <td className={CSS.td}>
                                        <label>

                                            <input
                                                type="radio"
                                                name="jobCode"
                                                onChange={onChangeJobCodeHandler}
                                                value={1}
                                                readOnly={!modifyMode}
                                                checked={checkValue == 1}
                                            />사원
                                        </label> &nbsp;
                                        <label>
                                            <input
                                                type="radio"
                                                name="jobCode"
                                                onChange={onChangeJobCodeHandler}
                                                value={2}
                                                readOnly={!modifyMode}
                                                checked={checkValue == 2}
                                            />팀장
                                        </label> &nbsp;
                                        <label>
                                            <input
                                                type="radio"
                                                name="jobCode"
                                                onChange={onChangeJobCodeHandler}
                                                value={3}
                                                readOnly={!modifyMode}
                                                checked={checkValue == 3}
                                            />부장
                                        </label> &nbsp;
                                        <label>
                                            <input
                                                type="radio"
                                                name="jobCode"
                                                onChange={onChangeJobCodeHandler}
                                                value={4}
                                                readOnly={!modifyMode}
                                                checked={checkValue == 4}
                                            />본부장
                                        </label> &nbsp;
                                        <label>
                                            <input
                                                type="radio"
                                                name="jobCode"
                                                onChange={onChangeJobCodeHandler}
                                                value={5}
                                                readOnly={!modifyMode}
                                                checked={checkValue == 5}
                                            />이사
                                        </label>
                                    </td>
                                </tr>

                                <tr>
                                    <th className={CSS.th}><label>부서변동 </label></th>
                                    <td className={CSS.td}>
                                        <label>

                                            <input
                                                type="radio"
                                                name="deptCode"
                                                onChange={onChangeDeptCodeHandler}
                                                value={1}
                                                readOnly={!modifyMode}
                                                checked={checkValue2 == 1}
                                            />경영관리
                                        </label> &nbsp;
                                        <label>
                                            <input
                                                type="radio"
                                                name="deptCode"
                                                onChange={onChangeDeptCodeHandler}
                                                value={2}
                                                readOnly={!modifyMode}
                                                checked={checkValue2 == 2}
                                            />전략기획
                                        </label> &nbsp;
                                        <label>
                                            <input
                                                type="radio"
                                                name="deptCode"
                                                onChange={onChangeDeptCodeHandler}
                                                value={3}
                                                readOnly={!modifyMode}
                                                checked={checkValue2 == 3}
                                            />마케팅
                                        </label> &nbsp;
                                        <label>
                                            <input
                                                type="radio"
                                                name="deptCode"
                                                onChange={onChangeDeptCodeHandler}
                                                value={4}
                                                readOnly={!modifyMode}
                                                checked={checkValue2 == 4}
                                            />영업
                                        </label> &nbsp;
                                        <label>
                                            <input
                                                type="radio"
                                                name="deptCode"
                                                onChange={onChangeDeptCodeHandler}
                                                value={5}
                                                readOnly={!modifyMode}
                                                checked={checkValue2 == 5}
                                            />시스템
                                        </label> &nbsp;
                                        <label>
                                            <input
                                                type="radio"
                                                name="deptCode"
                                                onChange={onChangeDeptCodeHandler}
                                                value={6}
                                                readOnly={!modifyMode}
                                                checked={checkValue2 == 6}
                                            />재무1
                                        </label> &nbsp;
                                        <label>
                                            <input
                                                type="radio"
                                                name="deptCode"
                                                onChange={onChangeDeptCodeHandler}
                                                value={7}
                                                readOnly={!modifyMode}
                                                checked={checkValue2 == 7}
                                            />재무2
                                        </label> &nbsp;
                                        <label>
                                            <input
                                                type="radio"
                                                name="deptCode"
                                                onChange={onChangeDeptCodeHandler}
                                                value={8}
                                                readOnly={!modifyMode}
                                                checked={checkValue2 == 8}
                                            />영업1
                                        </label> &nbsp;
                                        <label>
                                            <input
                                                type="radio"
                                                name="deptCode"
                                                onChange={onChangeDeptCodeHandler}
                                                value={9}
                                                readOnly={!modifyMode}
                                                checked={checkValue2 == 9}
                                            />영업2
                                        </label> &nbsp;
                                        <label>
                                            <input
                                                type="radio"
                                                name="deptCode"
                                                onChange={onChangeDeptCodeHandler}
                                                value={10}
                                                readOnly={!modifyMode}
                                                checked={checkValue2 == 10}
                                            />마케팅1
                                        </label> &nbsp;
                                        <label>
                                            <input
                                                type="radio"
                                                name="deptCode"
                                                onChange={onChangeDeptCodeHandler}
                                                value={11}
                                                readOnly={!modifyMode}
                                                checked={checkValue2 == 11}
                                            />마케팅2
                                        </label> &nbsp;
                                        <label>
                                            <input
                                                type="radio"
                                                name="deptCode"
                                                onChange={onChangeDeptCodeHandler}
                                                value={12}
                                                readOnly={!modifyMode}
                                                checked={checkValue2 == 12}
                                            />전산1
                                        </label> &nbsp;
                                        <label>
                                            <input
                                                type="radio"
                                                name="deptCode"
                                                onChange={onChangeDeptCodeHandler}
                                                value={13}
                                                readOnly={!modifyMode}
                                                checked={checkValue2 == 13}
                                            />전산2
                                        </label> &nbsp;
                                    </td>
                                </tr>

                                <tr>
                                    <th className={CSS.th}><label>직원ID </label></th>
                                    <td className={CSS.td}>
                                        <input
                                            name='empID'
                                            placeholder='직원 ID'
                                            type='text'
                                            className={CSS.title}
                                            onChange={onChangeHandler}
                                            value={!modifyMode ? detail.empID : form.empID}
                                            readOnly={!modifyMode}
                                            style={inputStyle}
                                        />
                                    </td>
                                </tr>

                                <tr>
                                    <th className={CSS.th}><label>사원이름 </label></th>
                                    <td className={CSS.td}>
                                        <input
                                            name='empName'
                                            placeholder='사원 이름'
                                            type='text'
                                            className={CSS.title}
                                            onChange={onChangeHandler}
                                            value={!modifyMode ? detail.empName : detail.empName}
                                            readOnly={!modifyMode}
                                            style={inputStyle}
                                        />
                                    </td>
                                </tr>

                                <tr>
                                    <th className={CSS.th}><label>사원번호 </label></th>
                                    <td className={CSS.td}>
                                        <input
                                            name='empCode'
                                            placeholder='사원 번호'
                                            type='number'
                                            className={CSS.title}
                                            onChange={onChangeHandler}
                                            value={!modifyMode ? detail.empCode : form.empCode}
                                            readOnly={!modifyMode}
                                            style={inputStyle}
                                        />
                                    </td>
                                </tr>

                                <tr>
                                    <th className={CSS.th}><label>전화번호 </label></th>
                                    <td className={CSS.td}>
                                        <input
                                            name='phone'
                                            placeholder='전화 번호'
                                            type='text'
                                            className={CSS.title}
                                            onChange={onChangeHandler}
                                            value={!modifyMode ? detail.phone : form.phone}
                                            readOnly={!modifyMode}
                                            style={inputStyle}
                                        />
                                    </td>
                                </tr>

                            </tbody>
                        </div>
                    </table>
                )}
                <div className={CSS.content3}>
                    <button className={CSS.cancel} onClick={onClickBackHandler}>이전</button>
                    {!modifyMode &&
                        <button
                            onClick={onClickModifyModeHandler}>
                            수정 모드
                        </button>
                    }
                    {modifyMode &&
                        <button
                            onClick={onClickAdminEmpUpdateHandler}    >
                            계정 수정사항 저장하기
                        </button>
                    }
                </div>
            </div>

        </>
    );
}
export default AdminEmpModify;