import { useDispatch, useSelector } from 'react-redux';
import orgDetailCSS from './OrganizationDetail.module.css';
import { useEffect } from 'react';
import { CallOrganizationDetailAPI } from '../../apis/OrganizationAPICalls';
import { useParams } from 'react-router-dom';


function OrganizationDetail () {

    const { empCode } = useParams();
    const dispatch = useDispatch();
    const { emp } = useSelector( state => state.organizationReducer) 
    
    useEffect(
        ()=> {
            dispatch(CallOrganizationDetailAPI({empCode}));
        },
        []
    );

   
    return (
        <div className={ orgDetailCSS.background}>
            {emp&&
            <table className={ orgDetailCSS.table}>
                <tbody>
                    <tr>
                        <td colSpan="5" className={ orgDetailCSS.tableMargin}></td>
                    </tr>
                    <tr>
                        <td rowSpan="3">
                           {emp.fileCategory[0].length || emp.fileCategory[0].fcategoryType === "emp" 
                           ? <img src={emp.fileCategory[0].file.filePath} className={ orgDetailCSS.img}/>
                            : <img src="/icon/user.jpg" className={ orgDetailCSS.img}/>
                            }
                        </td>
                        <td></td>
                        <th className={ orgDetailCSS.td}>부 서</th>
                        <td className={ orgDetailCSS.td}>{emp.dept.deptName}</td>
                        <td className={ orgDetailCSS.td}>핸드폰</td>
                        <td className={ orgDetailCSS.td}>{emp.phone}</td>
                    </tr>
                    <tr>
                        <td></td>
                        <td className={ orgDetailCSS.td}>직 급</td>
                        <td className={ orgDetailCSS.td}>{emp.job.jobName}</td>
                        <td className={ orgDetailCSS.td}>이메일</td>
                        <td className={ orgDetailCSS.td}>{emp.email}</td>
                        <td className={ orgDetailCSS.tableTdMargin}></td>
                    </tr>
                    <tr>
                        <td></td>
                        <td className={ orgDetailCSS.td}>내선번호</td>
                        <td className={ orgDetailCSS.tdphone} >{emp.extensionNum}</td>
                        <td className={ orgDetailCSS.tableTdMargin} ></td>
                    </tr>
                    <tr>
                        <td rowSpan="2" className={ orgDetailCSS.tableName} >{emp&&emp.empName}</td>
                    </tr>
                    <tr>
                    </tr>
                    <tr>
                        <td colSpan="5" className={ orgDetailCSS.tableMargin}></td>
                    </tr>
                </tbody>
            </table>
            }
        </div>
    );
}

export default OrganizationDetail;