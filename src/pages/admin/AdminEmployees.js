import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { callAdminEmpListAPI } from '../../apis/AdminAPICalls';
import PagingBar from "../../components/common/PagingBar";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import CSS from "./AdminEmployees.module.css";

function AdminEmployees() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const employees = useSelector(state => state.employeeReducer);

    
   const [currentPage, setCurrentPage] = useState(1);
//    const { empCode } = useParams();
//    console.log("empCode : ", empCode);




    useEffect(
        () => {
    
        dispatch(callAdminEmpListAPI({ currentPage }));
        },
       []
       );


       const onClickTableTr = (empCode) => {

        navigate(`/admin/emp/list/${empCode}`);

       };

       return (
        <>

        
            <div className={CSS.main}>
                

            <table className={CSS.table}>


                    <thead>
                        <tr className={ CSS.th }> 
                        <th><input type="checkbox" id="checkAll" /></th>

                            <th>사번</th>
                            <th>이름</th>
                            <th>ID</th>
                            <th>부서</th>
                            <th>직급</th>
                            <th>입사일</th>
                            <th>퇴사여부</th>
                            <th>권한</th>
                            <th>상세정보</th>

                        </tr>
                    </thead>
                        <tbody >
                    
                            {Array.isArray(employees) &&
                                employees.map((empList) => (

                                    <tr 
                                    className={CSS.td}
                                    key={empList.empCode}
                                    onClick={() => onClickTableTr(empList.empCode)}>
                                   <td></td>
                                        <td>{empList.empCode}</td>
                                        <td>{empList.empName}</td>
                                        <td>{empList.empID}</td>
                                        <td>{empList.dept.deptName}</td>
                                        <td>{empList.job.jobName}</td>
                                        <td>{empList.hireDate}</td>                                
                                        <td>{empList.retireYn}</td>
                                        <td></td>
                                        <td></td>
                                        <td></td>

                                    </tr>
                                ))}
                        </tbody>
                    </table>
            
            </div>
            <div>
                {/* {pageInfo && <PagingBar pageInfo={pageInfo} setCurrentPage={setCurrentPage} />} */}
            </div>
        </>
    );
}

export default AdminEmployees;
