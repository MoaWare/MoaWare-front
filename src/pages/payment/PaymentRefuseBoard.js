import { useDispatch, useSelector } from 'react-redux';
import payBoardCSS from './PaymentBoard.module.css';
import PaymentBoardContext from './PaymentBoardContext';
import { useEffect, useState } from 'react';
import { CallPaymentRefuseListAPI, CallPaymentWaitListAPI } from '../../apis/PaymentAPICalls';


function PaymentRefuseBoard () {


    const disPatch = useDispatch();
    const  payment  = useSelector( state => state.paymentReducer);
    const pay = payment.data;
    const pageInfo = payment.pageInfo;
    const [ currentPage, setCurrentPage ] = useState(1);

    console.log("PaymentRefuseBoard의 pay는 : ", payment);

    useEffect( ()=>{
        disPatch(CallPaymentRefuseListAPI(currentPage));
    },[currentPage]
        
    );

    return(
        <div className={payBoardCSS.background}>

            <div className={payBoardCSS.titleDiv}>
            <div className={payBoardCSS.title}>결재 반려 문서</div>

            </div>

            <PaymentBoardContext pay={pay} pageInfo={pageInfo} setCurrentPage={setCurrentPage}/>

        </div>
    );
}

export default PaymentRefuseBoard;
