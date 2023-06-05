import { useState } from 'react';
import PayRefuseCSS from './PayStorageRefuse.module.css';
import { FiX } from 'react-icons/fi';
import { Navigate, useParams } from 'react-router-dom';
import { CallPaymentUpdateAPI } from '../../../apis/PaymentAPICalls';
import { useDispatch } from 'react-redux';


function PayStorageRefuse ({setIsPayRefuse}) {
    const {payCode} = useParams();
    const [ isSave, setIsSave ] = useState(false);
    const [ reason, setReason ] = useState(); 
    const disPatch = useDispatch();

    const today = () => {
        let now = new Date();
        let todayYear = now.getFullYear();
        let todayMonth = (now.getMonth() + 1 ) > 9 ? (now.getMonth() + 1 ) : '0'+(now.getMonth() + 1 );
        let todayDate = now.getDate() > 9 ? now.getDate() : '0' + now.getDate();
        
        return todayYear + '-' + todayMonth + '-' + todayDate;
      }


    const onClickCancleHandler = () => {

        setIsPayRefuse(false);
    }

    const onClickCheckHandler = () => {

        setIsSave(true);
    }

    const onChangeReason = (e) => {
        setReason(e.target.value);
        
    }

    

    const onClickSaveHandler = () => {

        const form = {
            payCode,
            "paymentMember" : [
                {
                cancleReason : reason,
                payDate : today(),
                payType : '반려'
                }
            ]
        }

        disPatch(CallPaymentUpdateAPI({form}));
        Navigate("/pay/wait");


    }


    return(

        <div className={PayRefuseCSS.modal}>
        <div className={PayRefuseCSS.modalContainer}>
            <FiX onClick={ onClickCancleHandler }/>
            <div className={ isSave? PayRefuseCSS.saveMainDiv : PayRefuseCSS.mainDiv }>
                {isSave?
                <><label className={PayRefuseCSS.label}>반려사유</label>
                <input type='text' className={PayRefuseCSS.refuseText} value={reason} onChange={ onChangeReason }></input></> :
                <div className={PayRefuseCSS.titleDiv}>결재를 반려 하시겠습니까?</div>
                }
                <div className={PayRefuseCSS.buttonDiv}>
                    {isSave?
                    <button className={PayRefuseCSS.payButton} onClick={ onClickSaveHandler }>저장</button> :
                    <button className={PayRefuseCSS.payButton} onClick={ onClickCheckHandler }>확인</button>
                    }
                    <button className={PayRefuseCSS.buttonCancel} onClick={ onClickCancleHandler }>취 소</button>
                </div>
            </div>
        </div>
    </div>



    );
}

export default PayStorageRefuse;