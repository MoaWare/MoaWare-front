import PaymentModalCSS from './PaymentModal.module.css';
import OrgMainModal from './OrgMainModal';
import { useContext } from 'react';
import OrgSearchModal from './OrgSearchModal';
import { TbSquareRoundedChevronLeft, TbSquareRoundedChevronRight } from 'react-icons/tb';
import { orgContext } from '../../../pages/payment/Payment';


function PaymentModal( {setPaymentModal, payEmp }) {

    const{searchForm, setSearchForm, setFocusEmp, focusEmp, isFocus , setIsFocus, setPayMember} = useContext(orgContext);

    const onClickSavedHandler = () => {
        setPaymentModal(false);
        setPayMember(focusEmp.map(focus => focus.emp));
      };

    const onClickCancleHandler = () => {
        setPaymentModal(false);
        
      };



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
            {searchForm.isSearch? <OrgSearchModal empCode={ payEmp.empCode}/> 
              : <OrgMainModal empCode={ payEmp.empCode}/>}
            </div>
            <div className={ PaymentModalCSS.imgDiv} >
              <TbSquareRoundedChevronRight className={ PaymentModalCSS.directionImg} />
              <TbSquareRoundedChevronLeft className={ PaymentModalCSS.directionImg} />
            </div>
            <div className={PaymentModalCSS.paymentPayDiv}>
                <div className={PaymentModalCSS.paymentPayarea}>
                  <div className={PaymentModalCSS.payTitleName}>결재선 정보</div>
                  <div className={PaymentModalCSS.paymentPayItem}>
                    <div  className={PaymentModalCSS.paymentPayItemTitle}>기안</div>
                  {payEmp && payEmp.empName} {payEmp && payEmp.job.jobName} {payEmp && payEmp.dept.deptName} </div>
                  
                  { focusEmp.map( (focus, index) => ( focus.emp.empCode ===  payEmp.empCode ? "" :
                    <div className={PaymentModalCSS.paymentPayItem} onClick={()=> removePayment(focus, index) }
                    key={focus.emp.empCode}>
                      <div  className={PaymentModalCSS.paymentPayItemTitle}>
                        {index === focusEmp.length - 1 ? '최종 결재자' : '결재자'}</div>
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

export default PaymentModal;