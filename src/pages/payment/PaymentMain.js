import { useEffect, useState } from 'react';
import payCSS from './PaymentMain.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { CallPaymentAllListAPI, CallPaymentListAPI } from '../../apis/PaymentAPICalls';
import { ImAttachment } from 'react-icons/im';
import PagingBar from '../../components/common/PagingBar';
import PaymentBoardContext from './PaymentBoardContext';
import PaymentMainBoard from './PaymentMainBoard';


function PaymentMain () {

    const disPatch = useDispatch();
    const  { pay }  = useSelector( state => state.paymentReducer);
    const [ payWait, setPayWait] = useState(1);
   
    useEffect(
        () => {
            disPatch(CallPaymentAllListAPI());
        },[]
    );


    return (
        <div className={payCSS.background}>
            <div className={payCSS.paySummary}> 
                <div className={payCSS.paySummaryItem}>
                    <div className={payCSS.itemTitle}>결재 대기</div>
                    <hr className={payCSS.itemHr}/>
                    <div className={payCSS.itemText}>{payWait&&payWait}건</div>
                </div>
                <div className={payCSS.paySummaryItem}>
                    <div className={payCSS.itemTitle}>결재 진행</div>
                    <hr className={payCSS.itemHr}/>
                    <div className={payCSS.itemText}>{pay && pay.filter(pay => pay.payStatus === '진행중').length}건</div>
                </div>
                <div className={payCSS.paySummaryItem}>
                    <div className={payCSS.itemTitle}>결재 완료</div>
                    <hr className={payCSS.itemHr}/>
                   <div className={payCSS.itemText}>{pay && pay.filter(pay => pay.payStatus === '결재완료').length}건</div>
                </div>
                <div className={payCSS.paySummaryItem}>
                    <div className={payCSS.itemTitle}>반려 문서</div>
                    <hr className={payCSS.itemHr}/>
                   <div className={payCSS.itemText}>{pay && pay.filter(pay => pay.payStatus === '반려').length}건</div>
                </div>
            </div>
            <div className={payCSS.payList}>    
                <div className={payCSS.payListTitle}>결재 대기 문서</div>
                    <PaymentMainBoard setPayWait={setPayWait}/>
            </div>
        </div>
    ) 
} 

export default PaymentMain;