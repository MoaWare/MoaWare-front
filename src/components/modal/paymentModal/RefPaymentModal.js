import PaymentModalCSS from './PaymentModal.module.css';
import OrgMainModal from './OrgMainModal';
import {  useContext, useRef, useState } from 'react';
import OrgSearchModal from './OrgSearchModal';
import { TbSquareRoundedChevronLeft, TbSquareRoundedChevronRight } from 'react-icons/tb';

import { orgContext } from '../../../pages/payment/Payment';



function RefPaymentModal( {setRefPaymentModal, payEmp }) {

  const{searchForm, setSearchForm, setFocusEmp, focusEmp, isFocus , setIsFocus, setRefPayMember} = useContext(orgContext);
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
          {searchForm.isSearch? <OrgSearchModal empCode={payEmp.empCode}/> 
            : <OrgMainModal empCode={payEmp.empCode}/>}
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

export default RefPaymentModal;