import { useEffect, } from "react";
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { callAdminEmpDetailAPI } from '../../apis/AdminAPICalls';
import CSS from "./AdminEmpDetail.module.css";
import { useParams } from "react-router-dom";




function AdminEmpDetail() {
    const dispatch = useDispatch();
    const { detail } = useSelector(state => state.employeeReducer);
    const { empCode } = useParams();
    const navigate = useNavigate();


    useEffect(() => {
        dispatch(callAdminEmpDetailAPI({ empCode }));
    }, []);


    const onClickBackHandler = () => {
        navigate('/admin/emp/list');
    }


    const onClickModifyHandler = () => {
        navigate(`/admin/emp/modify/${empCode}`);
    }



    return (
        <>
            <div className={CSS.main}>

                <div class={CSS.menutitle}> 계정 관리 {">"} 상세 정보 </div>

                <table className={CSS.container} >
                    <tbody>
                        {detail && (
                            <>

                                <tr key={detail.empCode}>

                                    <th className={CSS.th} >사번</th>
                                    <td className={CSS.td}>{detail.empCode}</td>
                                </tr>
                                <tr>
                                    <th className={CSS.th}>이름</th>
                                    <td className={CSS.td}>{detail.empName}</td>
                                </tr>
                                <tr>
                                    <th className={CSS.th} >ID</th>
                                    <td className={CSS.td}>{detail.empID}</td>
                                </tr>
                                <tr>
                                    <th className={CSS.th}>직급</th>
                                    <td className={CSS.td}>{detail.job.jobName}</td>
                                </tr>
                                <tr>
                                    <th className={CSS.th}>부서</th>
                                    <td className={CSS.td}>{detail.dept.deptName}</td>
                                </tr>


                            </>
                        )}

                    </tbody>
                </table>
                <div className={CSS.content}>
                    <button onClick={onClickBackHandler} >이전</button>
                    <button onClick={onClickModifyHandler}>수정</button>
                </div>


            </div>

        </>
    );
}

export default AdminEmpDetail;