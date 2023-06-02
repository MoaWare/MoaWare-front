import { useNavigate } from 'react-router-dom';
import PagingBar from '../../components/common/PagingBar';
import payBoardCSS from './PaymentBoard.module.css';
import { ImAttachment } from 'react-icons/im';

function PaymentStorageBoardContext ({pay, pageInfo, setCurrentPage}) {

    console.log("PaymentBoardContext의 pay는 ? : " , pay);
    const navigate = useNavigate();

    const onClickDetailHandler = (e) => {
        console.log("value : ", e.target.getAttribute("value"));
        navigate(`/pay/payStorageDetail/${e.target.getAttribute("value")}`)
    }


    return (
        <div className={payBoardCSS.payList}>
        <table className={payBoardCSS.payListTable}>
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
            { pay && pay.map( pay =>
                <tr key={pay.payCode} value={ pay.payCode } onClick={ onClickDetailHandler }>
                    <td value={ pay.payCode } >{pay.payCode}</td> 
                    <td value={ pay.payCode } >{pay.form.formTitle}</td> 
                    <td value={ pay.payCode } >{pay.draftDate.substring(0, 10)}</td> 
                    <td value={ pay.payCode } >{pay.draftTitle}</td> 
                    <td value={ pay.payCode } >{pay.payFileCategory ? <ImAttachment/> : ''}</td> 
                    <td value={ pay.payCode } >{pay.payStatus}</td> 
                    <td value={ pay.payCode } >{pay.emp.empName}</td> 
                </tr>
            )}   
        </tbody>
    </table>
    <div>
    { pageInfo && <PagingBar pageInfo={ pageInfo } setCurrentPage={ setCurrentPage } /> }
    </div>
    </div>
    )
}

export default PaymentStorageBoardContext;