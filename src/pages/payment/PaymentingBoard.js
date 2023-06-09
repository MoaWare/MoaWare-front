import { useDispatch, useSelector } from 'react-redux';
import payBoardCSS from './PaymentBoard.module.css';
import { useEffect, useState } from 'react';
import {CallPaymentingListAPI } from '../../apis/PaymentAPICalls';
import PaymentBoardContext from './PaymentBoardContext';




function PaymentingBoard() {

    const [ status , setStatus ] = useState("Paying");
    const disPatch = useDispatch();
    const payment  = useSelector( state => state.paymentReducer);
    const pay = payment.data &&payment.data.content;
    const pageInfo = payment.pageInfo;
    const [ currentPage, setCurrentPage ] = useState(1);

    useEffect( ()=>{
        disPatch(CallPaymentingListAPI(currentPage));
    },[currentPage]
        
    );
    

    
    return (
      <div className={payBoardCSS.background}>

            <div className={payBoardCSS.titleDiv}>
            <div className={payBoardCSS.title}>결재 진행 문서</div>

            </div>

            <PaymentBoardContext pay={pay} pageInfo={pageInfo} setCurrentPage={setCurrentPage} status={status}/>

        </div>

      
    );

  };

export default PaymentingBoard