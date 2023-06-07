import { useNavigate } from 'react-router-dom';
import WorkRestReqListCSS from './WorkRestReqList.module.css';

function WorkReqListItem({ rqListItem, infoItem }) {

    const navigate = useNavigate();
    const onClickTableTr = (leaveCode) => {
        navigate(`/work/reqListItem/${leaveCode}`);
    }

    return(

        <>
            <tbody>
            {rqListItem && rqListItem.map((rqList, index) => (
                        <tr className={ WorkRestReqListCSS.td } key={rqList.leaveCode}
                            onClick={ () => onClickTableTr(rqList.leaveCode) }>
                            <td>{rqList.leaveReqDate.substring(0, 10)}</td>
                            <td>{infoItem?.dept?.deptName ? infoItem?.dept?.deptName : ""}</td>
                            <td>{infoItem?.job?.jobName ? infoItem?.job?.jobName : ""}</td>
                            <td>{infoItem?.empName? infoItem?.empName : ""}</td>
                            <td>{rqList.leaveType}</td>
                            <td>{rqList.lpayStatus}</td>
                            <td>{rqList.leaveStartDay.substring(0, 10)}</td>
                            <td>{rqList.leaveEndDate.substring(0, 10) ? rqList.leaveEndDate.substring(0, 10) : ""}</td>
                        </tr>
                    ))}
            </tbody>
        </>
    );
}

export default WorkReqListItem;