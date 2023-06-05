import { useDispatch, useSelector } from 'react-redux';
import payBoardCSS from './PaymentBoard.module.css';
import { useEffect, useState } from 'react';
import { CallPaymentStorageListAPI } from '../../apis/PaymentAPICalls';
import PaymentStorageBoardContext from './PaymentStorageBoardContext';


function PaymentStorageBoard () {


    const disPatch = useDispatch();
    const  payment  = useSelector( state => state.paymentReducer);
    const pay = payment.data && payment.data.content;
    const pageInfo = payment.pageInfo;
    const [ currentPage, setCurrentPage ] = useState(1);


    useEffect( ()=>{
        disPatch(CallPaymentStorageListAPI(currentPage));
    },[currentPage]
        
    );

    return(
        <div className={payBoardCSS.background}>

            <div className={payBoardCSS.titleDiv}>
            <div className={payBoardCSS.title}>임시 저장 문서</div>

            </div>

            <PaymentStorageBoardContext pay={pay} pageInfo={pageInfo} setCurrentPage={setCurrentPage}/>

        </div>
    );
    
}

export default PaymentStorageBoard;