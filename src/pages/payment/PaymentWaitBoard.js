import { useDispatch, useSelector } from 'react-redux';
import payBoardCSS from './PaymentBoard.module.css';
import { useEffect, useState } from 'react';
import { CallPaymentWaitListAPI } from '../../apis/PaymentAPICalls';
import PaymentWaitBoardContext from './PaymentWaitBoardContext';
import { setPayment } from '../../modules/PayMentModule';


function PaymentWaitBoard() {

    const disPatch = useDispatch();
    const { isPayment } = useSelector(state=>state.paymentReducer);
    const  payment  = useSelector( state => state.paymentReducer);
    const pay = payment.data && payment.data.content;
    const pageInfo = payment.pageInfo;
    const [ currentPage, setCurrentPage ] = useState(1);
    
    console.log("PaymentWaitBoard의 isPay는 : ", isPayment)
    console.log("PaymentWaitBoard의 pay는 : ", pay);

    useEffect( ()=>{
        disPatch(CallPaymentWaitListAPI(currentPage));
        disPatch(setPayment(true));
    },[currentPage,isPayment]
        
    );

    return(
        <div className={payBoardCSS.background}>

            <div className={payBoardCSS.titleDiv}>
            <div className={payBoardCSS.title}>결재 대기 문서</div>

            </div>

            <PaymentWaitBoardContext pay={pay} pageInfo={pageInfo} setCurrentPage={setCurrentPage}/>

        </div>
    );
}

export default PaymentWaitBoard;