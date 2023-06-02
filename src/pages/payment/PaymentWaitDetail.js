import { useNavigate, useParams } from 'react-router-dom';
import PayDetailCSS from './PaymentDetail.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useRef, useState } from 'react';
import { CallPaymentingDetailAPI } from '../../apis/PaymentAPICalls';

import PaymentDetailItem from './PaymentDetailItem';
import PayModal from '../../components/modal/paymentModal/PayModal';
import PayRefuse from '../../components/modal/paymentModal/PayRefuse';


function PaymentWaitDetail () {

    const { payCode } = useParams();
    console.log("PaymentDetail payCode : " , payCode);
    const disPatch = useDispatch();
    const { payDetail } = useSelector( state => state.paymentReducer);
    const navigator = useNavigate();
    const [ isPayModal, setIsPayModal ] = useState(false);
    const [ isPayRefuse, setIsPayRefuse ] = useState(false);
   
    console.log("PaymentDetail payDetail : 우아라아앙" , payDetail);

    useEffect(
        ()=>{
            disPatch(CallPaymentingDetailAPI({payCode}));

        },[]
    )

      const onCancelHandler = () => {
        navigator('/pay/wait');
     }  

     const onClickPayHandler = () => {
        setIsPayModal(true);
     }

     const onClickPayRefuseHandler = () => {
      setIsPayRefuse(true);
     }


    return (
       <div className={PayDetailCSS.background}>
          <div className={PayDetailCSS.titleDiv}>
            <div className={PayDetailCSS.title}>결재 대기 문서</div> 
            <button className={PayDetailCSS.button} onClick={ onClickPayHandler }>결재</button>
            <button className={PayDetailCSS.button} onClick={ onClickPayRefuseHandler }>반려</button>
            <button className={PayDetailCSS.buttonCancel} onClick={onCancelHandler} >취소</button>
          </div>
        {isPayModal? <PayModal setIsPayModal={setIsPayModal}/> : "" }
        {isPayRefuse? <PayRefuse setIsPayRefuse={setIsPayRefuse}/> : "" }
        <PaymentDetailItem payDetail={payDetail}/>

      </div>
    )
}

export default PaymentWaitDetail;