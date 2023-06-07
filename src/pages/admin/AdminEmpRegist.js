import { useNavigate } from 'react-router-dom';
import CSS from './AdminEmpRegist.module.css';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { callAdminEmpRegistAPI } from '../../apis/AdminAPICalls';

function AdminEmpRegist() {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { regist } = useSelector(state => state.adminReducer);

    const [form, setForm] = useState({});

    useEffect(
        () => {
            if (regist?.status === 200) {
                alert('계정 등록이 완료 되었습니다.');
                navigate('/admin/emp/list', { replace: true });
            }
        },
        [regist]
    );

    /* 입력 양식의 값이 변경 될 때 */
    const onChangeHandler = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    }

    /* 계정 등록 버튼 클릭 이벤트 */
    const onClickRegistHandler = () => {
        /* 서버로 전달할 FormData 형태의 객체 설정 */
        const formData = new FormData();
        formData.append("empCode", form.empCode);
        formData.append("empName", form.empName);
        formData.append("empID", form.empID);
        formData.append("empPwd", form.empPwd);
        formData.append("email", form.email);
        formData.append("phone", form.phone);
        formData.append("empSsi", form.empSsi);
        formData.append("hireDate", form.hireDate);
        formData.append("job.jobCode", form.jobCode);
        formData.append("dept.deptCode", form.deptCode);
        dispatch(callAdminEmpRegistAPI(formData));
    }

    const onClickBackHandler = () => {
        navigate('/admin/emp/list');
    }

    return (
        <div className={CSS.backgroundDiv}>
            <div className={CSS.registerDiv}>
                <h1>계정 생성</h1>

                <input
                    type="number"
                    name="deptCode"
                    placeholder="부서"
                    onChange={onChangeHandler}
                    list="deptCodeOptions"
                />

                <datalist id="deptCodeOptions">
                    <option value="1">경영관리실</option>
                    <option value="2">전략기획실</option>
                    <option value="3">마케팅실</option>
                    <option value="4">영업</option>
                    <option value="5">시스템 관실</option>
                    <option value="6">재무1팀</option>
                    <option value="7">재무2팀</option>
                    <option value="8">영업1팀</option>
                    <option value="9">영업2팀</option>
                    <option value="10">마케팅1팀</option>
                    <option value="11">마케팅2팀</option>
                    <option value="12">전산1팀</option>
                    <option value="13">전산2팀</option>

                </datalist>
                <input
                    type="number"
                    name="jobCode"
                    placeholder="직급"
                    onChange={onChangeHandler}
                    list="jobCodeOptions"
                />

                <datalist id="jobCodeOptions">
                    <option value="1">사원</option>
                    <option value="2">팀장</option>
                    <option value="3">부장</option>
                    <option value="4">본부장</option>
                    <option value="5">이사</option>
                </datalist>


                <input
                    type="number"
                    name="empCode"
                    placeholder="사원 번호"
                    onChange={onChangeHandler}
                    list="empCodeOptions"
                />

                <datalist id="empCodeOptions">
                    <option value="1">관리자</option>
                    <option value="2">2번 이후 값으로 입력..일반 계정</option>
                </datalist>


                <input
                    type="text"
                    name="empName"
                    placeholder="이름"
                    onChange={onChangeHandler}
                />

                <input
                    type="text"
                    name="empID"
                    placeholder="아이디"
                    onChange={onChangeHandler}
                />

                <input
                    type="text"
                    name="empPWD"
                    placeholder="비밀번호"
                    onChange={onChangeHandler}
                />

                <input
                    type="text"
                    name="email"
                    placeholder="이메일"
                    onChange={onChangeHandler}
                />

                <input
                    type="text"
                    name="phone"
                    placeholder="연락처"
                    onChange={onChangeHandler}
                />

                <input
                    type="text"
                    name="empSsi"
                    placeholder="주민번호(000000-0000000 형태)"
                    onChange={onChangeHandler}
                />

                <div className={CSS.dateInputContainer}>
                    <input
                        type="date"
                        name="hireDate"
                        onChange={onChangeHandler}
                        className={CSS.dateInput}
                    />
                    <label htmlFor="hireDate" className={CSS.datePlaceholder}>
                        입사일 : 입사 날짜를 선택해주세요 🡆
                    </label>
                </div>


                <button onClick={onClickRegistHandler}    >
                    등록
                </button>
                <button
                    style={{ border: 'none', margin: 0, fontSize: '15px', height: '2.3vw' }}
                    onClick={onClickBackHandler}    >
                    이전
                </button>
            </div>
        </div>
    );
}

export default AdminEmpRegist;
