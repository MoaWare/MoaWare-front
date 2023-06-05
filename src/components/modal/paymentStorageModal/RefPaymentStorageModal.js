import PaymentModalCSS from './PaymentStorageModal.module.css';
import PayStorageOrgMainModal from './PayStorageOrgMainModal';
import {  useContext, useRef, useState } from 'react';
import PayStorageOrgSearchModal from './PayStorageOrgSearchModal';
import { TbSquareRoundedChevronLeft, TbSquareRoundedChevronRight } from 'react-icons/tb';

import { payStorageContext } from '../../../pages/payment/PaymentStorageDetail';



function RefPaymentStorageModal( {setRefPaymentModal, payEmp }) {

  const{searchForm, setSearchForm, setFocusEmp, focusEmp, isFocus , setIsFocus, setRefPayMember} = useContext(payStorageContext);


    const onClickSavedHandler = () => {
      setRefPaymentModal(false);
      setRefPayMember(focusEmp.map(focus => focus.emp));
    };

    const onClickCancleHandler = () => {
      setRefPaymentModal(false);

    }



    const removePayment = (focus,index) => {

      const updateFocusEmp = focusEmp.filter((_, i) => i !== index);
      setFocusEmp(updateFocusEmp);

      if(isFocus.includes(focus.emp.empCode)){
        setIsFocus( isFocus.filter( empCode => empCode !== focus.emp.empCode));
      }

    };  

    

    return(


        <div className={PaymentModalCSS.modal}>
        <div className={PaymentModalCSS.modalContainer}>
        <div className={PaymentModalCSS.paymemtDiv}>
        
          <div className={PaymentModalCSS.paymentOrgDiv}>
          {searchForm.isSearch? <PayStorageOrgSearchModal empCode={payEmp.empCode}/> 
            : <PayStorageOrgMainModal empCode={payEmp.empCode}/>}
          </div>
          <div className={ PaymentModalCSS.imgDiv} >
            <TbSquareRoundedChevronRight className={ PaymentModalCSS.directionImg} />
            <TbSquareRoundedChevronLeft className={ PaymentModalCSS.directionImg} />
          </div>
          <div className={PaymentModalCSS.paymentPayDiv}>
              <div className={PaymentModalCSS.paymentPayarea}>
                <div className={PaymentModalCSS.payTitleName}>참조자 정보</div>
                
                
                { focusEmp.map( (focus, index) => (
                  <div className={PaymentModalCSS.paymentPayItem} onClick={()=> removePayment(focus, index) }>
                    <div  className={PaymentModalCSS.paymentPayItemTitle}>
                      참조자</div>
                    {focus.emp.empName} {focus.emp.job.jobName} {focus.sub.deptName}
                  </div>
                ))}
                
              </div>

          </div>
          
      
        </div>
        <div className={PaymentModalCSS.paymentButtonDiv}>
            <button
               className={PaymentModalCSS.paymentButton}
                onClick={ onClickSavedHandler }
              >
                저 장
              </button>
              <button
                className={PaymentModalCSS.paymentButtonCancle}
                onClick={ onClickCancleHandler }
              >
                취 소 
              </button>     
          </div>


        </div>
      </div>
  
    );
}

export default RefPaymentStorageModal;