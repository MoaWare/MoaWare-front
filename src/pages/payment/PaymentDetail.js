import { useNavigate, useParams } from 'react-router-dom';
import PayDetailCSS from './PaymentDetail.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useRef, useState } from 'react';
import { CallPaymentingDetailAPI } from '../../apis/PaymentAPICalls';

import PaymentDetailItem from './PaymentDetailItem';
import PayModal from '../../components/modal/paymentModal/PayModal';
import PayRefuse from '../../components/modal/paymentModal/PayRefuse';
import PaymentRefuseDetail from './PaymentRefuseDetail';


function PaymentDetail () {

    const { payCode } = useParams();
    const disPatch = useDispatch();
    const { payDetail } = useSelector( state => state.paymentReducer);
    const htmlRef = useRef();
    const navigator = useNavigate();
    const [ isPayModal, setIsPayModal ] = useState(false);
    const [ isPayRefuse, setIsPayRefuse ] = useState(false);

    useEffect(
        ()=>{
            disPatch(CallPaymentingDetailAPI({payCode}));
            
           
        },[isPayModal, isPayRefuse]
    )

        
      const onClickCheckedHandler = () => {
     
        if (payDetail.payStatus === "결재완료") {
          navigator('/pay/completed');
        } else if (payDetail.payStatus === "반려") {
          navigator('/pay/refuse');
        }else if (payDetail.payStatus === "진행중") {
          navigator('/pay/paying');
        }
      }
    

      const onCancelHandler = () => {
        if(payDetail.payStatus === "진행중"){
          navigator('/pay/paying', {replace : true });
        } else if (payDetail.payStatus === "결재완료") {
          navigator('/pay/completed', {replace : true });
        } else if (payDetail.payStatus === "반려") {
          navigator('/pay/refuse', {replace : true });
        }
     }  

    return (
       <div className={PayDetailCSS.background}>
        
          {payDetail && payDetail.payStatus === "진행중" ?

          <div className={PayDetailCSS.titleDiv}>
          <div className={PayDetailCSS.titleIng}>결재 진행 문서</div> 
          <button className={PayDetailCSS.button} onClick={ onClickCheckedHandler }>확인</button>
          <button className={PayDetailCSS.buttonCancel} onClick={onCancelHandler} >취소</button>
          </div>
          : payDetail && payDetail.payStatus === "결재완료" ?  
           <div className={PayDetailCSS.titleDiv}>
            <div className={PayDetailCSS.completeTitle}>결재 완료 문서</div> 
            <button className={PayDetailCSS.button} onClick={ onClickCheckedHandler }>확인</button>
            <button className={PayDetailCSS.buttonCancel} onClick={onCancelHandler} >취소</button> 
          </div>
          : payDetail && payDetail.payStatus === "반려" ?
          <div className={PayDetailCSS.titleDiv}>  
            <div className={PayDetailCSS.completeTitle}>결재 반려 문서</div>
            <button className={PayDetailCSS.button} onClick={ onClickCheckedHandler }>확인</button>
            <button className={PayDetailCSS.buttonCancel} onClick={onCancelHandler} >취소</button>
            </div>   : ""  
          }
          
        
        {isPayModal? <PayModal setIsPayModal={setIsPayModal}/> : "" }
        {isPayRefuse? <PayRefuse setIsPayRefuse={setIsPayRefuse}/> : "" }
       { payDetail && payDetail.payStatus === "반려" ? <PaymentRefuseDetail payDetail={payDetail}/> : <PaymentDetailItem payDetail={payDetail}/>}

      </div>
    )
}

export default PaymentDetail;