import { useDispatch, useSelector } from 'react-redux';
import PagingBar from '../../components/common/PagingBar';
import payCSS from './PaymentMain.module.css';
import { ImAttachment } from 'react-icons/im';
import { useEffect, useState } from 'react';
import { CallPaymentWaitListAPI } from '../../apis/PaymentAPICalls';

function PaymentMainBoard ({setPayWait}) {

    const disPatch = useDispatch();
    const  payment  = useSelector( state => state.paymentReducer);
    const pay = payment&& payment.data&&payment.data.content;
    const pageInfo = payment.pageInfo;
    const [ currentPage, setCurrentPage ] = useState(1);

    console.log("PaymentMainBoard의 pay는 : ", payment);

    useEffect( ()=>{
        disPatch(CallPaymentWaitListAPI(currentPage));
    },[currentPage]
        
    );

    useEffect( ()=>{
        setPayWait(payment.data&& payment.data.totalElements); 
    },[pay])
    

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
            { pay && pay.map( pay => 
                <tr key={pay.payCode}>
                    <td>{pay.payCode}</td> 
                    <td>{pay.form.formTitle}</td> 
                    <td>{pay.draftDate.substring(0, 10)}</td> 
                    <td>{pay.draftTitle}</td> 
                    <td>{pay.payFileCategory ? <ImAttachment/> : ''}</td> 
                    <td>{pay.payStatus}</td> 
                    <td>{pay.emp.empName}</td> 
                </tr>
            )}   
        </tbody>
    </table>
    <div className={payCSS.paging}>
        { pageInfo && <PagingBar pageInfo={ pageInfo } setCurrentPage={ setCurrentPage } /> }
    </div>
    </div>
    )
}

export default PaymentMainBoard;