import PagingBar from '../../components/common/PagingBar';
import payBoardCSS from './PaymentBoard.module.css';
import payCSS from './PaymentMain.module.css';
import { ImAttachment } from 'react-icons/im';

function PaymentBoardContext ({pay, pageInfo, setCurrentPage}) {

    return (
        <div className={payCSS.payList}>
        <table className={payCSS.payListTable}>
        <tbody>
            <tr>
                <th>문서 번호</th>
                <th>사용 양식</th>
                <th>기한 날짜</th>
                <th>기안서 제목</th>
                <th>첨부</th>
                <th>상태</th>
                <th>결재 요청자</th>
            </tr>
            { pay && pay.map( pay => pay.payStatus === '진행중' ?
                <tr key={pay.payCode}>
                    <td>{pay.payCode}</td> 
                    <td>{pay.form.formTitle}</td> 
                    <td>{pay.draftDate.substring(0, 10)}</td> 
                    <td>{pay.draftTitle}</td> 
                    <td>{pay.payFileCategory ? <ImAttachment/> : ''}</td> 
                    <td>{pay.payStatus}</td> 
                    <td>{pay.emp.empName}</td> 
                </tr>
                :  ''
            )}   
        </tbody>
    </table>
    <div>
    { pageInfo && <PagingBar pageInfo={ pageInfo } setCurrentPage={ setCurrentPage } /> }
    </div>
    </div>
    )
}

export default PaymentBoardContext;