import { useState } from 'react';
import PayModalCSS from './PayStorageModal.module.css';
import { FiX } from 'react-icons/fi';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { CallPaymentUpdateAPI } from '../../../apis/PaymentAPICalls';
import { setPayment } from '../../../modules/PayMentModule';


function PayStorageModal({setIsPayModal}) {
    const {payCode} = useParams();
    const disPatch = useDispatch();
    const navigate = useNavigate();

    const onClickCancleHandler = () => {

        setIsPayModal(false);
    }

    const today = () => {
        let now = new Date();
        let todayYear = now.getFullYear();
        let todayMonth = (now.getMonth() + 1 ) > 9 ? (now.getMonth() + 1 ) : '0'+(now.getMonth() + 1 );
        let todayDate = now.getDate() > 9 ? now.getDate() : '0' + now.getDate();
        
        return todayYear + '-' + todayMonth + '-' + todayDate;
      }

    const onClickTotalPay = () => {
       const form = {
            payCode,
            "payStatus" : '결재완료',
            "paymentMember" : [
                {
                payTotalYn : "Y",
                payDate : today(),
                payType : '결재'
                }
            ]
        }
        console.log(" payCode : ", form);
        disPatch(CallPaymentUpdateAPI({form}));
        disPatch(setPayment(false));
        navigate("/pay/wait");
    }


    const onClickPay = () => {

        const form = {
            payCode,
            "paymentMember" : [
                {
                payDate : today(),
                payType : '결재'
                }
            ]
        }
        console.log(" payCode : ", form);
        disPatch(CallPaymentUpdateAPI({form}));
        disPatch(setPayment(false));
        navigate("/pay/wait");
    }


    return (

        <div className={PayModalCSS.modal}>
            <div className={PayModalCSS.modalContainer}>
                <FiX onClick={ onClickCancleHandler }/>
                <div className={PayModalCSS.mainDiv}>
                    <div className={PayModalCSS.titleDiv}>결재를 진행 하시겠습니까?</div>
                    <div className={PayModalCSS.buttonDiv}>
                        <button className={PayModalCSS.totalButton} onClick={ onClickTotalPay }>전 결</button>
                        <button className={PayModalCSS.payButton} onClick={ onClickPay }>결 재</button>
                        <button className={PayModalCSS.buttonCancel} onClick={ onClickCancleHandler }>취 소</button>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default PayStorageModal;