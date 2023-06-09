import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { callAdminEmpDeleteAPI, callAdminEmpListAPI } from '../../apis/AdminAPICalls';
import PagingBar from "../../components/common/PagingBar";
import { useNavigate } from "react-router-dom";
import CSS from "./AdminEmployees.module.css";
import { NavLink } from 'react-router-dom';
import { toast } from "react-toastify";


function AdminEmployees() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { emps } = useSelector(state => state.employeeReducer);
    const pageInfo = emps?.pageInfo;
    const [selectedEmps, setSelectedEmps] = useState([]);


    const { del } = useSelector(state => state.adminReducer);

    const [currentPage, setCurrentPage] = useState(1);

    useEffect(
        () => {
            dispatch(callAdminEmpListAPI({ currentPage }));
        },
        [currentPage]
    );


    const onClickTableTr = (empCode) => {
        navigate(`/admin/emp/list/${empCode}`);
    };

    useEffect(() => {
        if (del?.status === 200) {
            toast.success('퇴직 처리가 완료 되었습니다.', {
                position: toast.POSITION.TOP_CENTER, // 토스트 위치 (옵션)
                autoClose: 2000, // 자동으로 닫히는 시간 (ms) (옵션)
                hideProgressBar: false, // 진행 막대 숨김 여부 (옵션)
            });
            dispatch(callAdminEmpListAPI({ currentPage }))
        }
    }, [del]);



    const handleCheckboxChange = (event, empCode) => {
        event.stopPropagation();
        setSelectedEmps(empCode);
        if (selectedEmps == empCode) {
            setSelectedEmps(null);
        }
    };

    const onClickDelete = () => {
        dispatch(callAdminEmpDeleteAPI({ empCode: selectedEmps }));
    };










    return (
        <>
            <div className={CSS.main}>

                <div className={CSS.menutitle}> 계정 관리
                    <div className={CSS.content}>
                        <button>
                            <NavLink to="/admin/emp/regist">
                                계정 생성
                            </NavLink>
                        </button>
                    </div>  </div>

                <table className={CSS.table}>


                    <thead>
                        <tr className={CSS.th}>
                            <th><input type="checkbox" id="checkAll" /></th>

                            <th>사번</th>
                            <th>이름</th>
                            <th>ID</th>
                            <th>부서</th>
                            <th>직급</th>
                            <th>입사일</th>
                            <th>퇴직 여부</th>
                            <th>권한</th>
                            <th>상세정보</th>

                        </tr>
                    </thead>
                    <tbody >

                        {emps?.data &&
                            emps.data.map((e) => (

                                <tr
                                    className={CSS.td}
                                    key={e.empCode}
                                    onClick={() => onClickTableTr(e.empCode)}>
                                    <input
                                        type="checkbox"
                                        checked={selectedEmps === e.empCode}
                                        onChange={(event) => handleCheckboxChange(event, e.empCode)}
                                        onClick={(event) => event.stopPropagation()}
                                    />
                                    <td>{e.empCode}</td>
                                    <td>{e.empName}</td>
                                    <td>{e.empID}</td>
                                    <td>{e.dept.deptName}</td>
                                    <td>{e.job.jobName}</td>
                                    <td>{e.hireDate}</td>
                                    <td>{e.retireYn}</td>
                                    <td></td>
                                    <td></td>


                                </tr>
                            ))}
                    </tbody>
                </table>
                <div className={CSS.deletepost}>
                    <button onClick={onClickDelete}>
                        퇴직 처리
                    </button>
                </div>
                <div>
                    {pageInfo && <PagingBar pageInfo={pageInfo} setCurrentPage={setCurrentPage} />}
                </div>
            </div>


        </>
    );
}

export default AdminEmployees;
