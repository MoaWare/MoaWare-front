import PaymentModalCSS from './PaymentModal.module.css';
import OrgMainModal from './OrgMainModal';
import { createContext, useContext, useRef, useState } from 'react';
import OrgSearchModal from './OrgSearchModal';
import { TbSquareRoundedChevronLeft, TbSquareRoundedChevronRight } from 'react-icons/tb';

import { orgContext } from '../../../pages/payment/Payment';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';



function RefPaymentModal( {setRefPaymentModal, payEmp }) {

  const{searchForm, setSearchForm, setFocusEmp, focusEmp, isFocus , setIsFocus, setRefPayMember} = useContext(orgContext);

    const onClickHandler = () => {
      setRefPaymentModal(false);
      setRefPayMember(focusEmp.map(focus => focus.emp));
      };

    
    
    console.log("searchForm search 는 : ", searchForm.search);
    console.log("searchForm isSearch 는 : ", searchForm.isSearch);

    const modalContainerRef = useRef(''); // 드래그 할 영역 네모 박스 Ref
    const dragComponentRef = useRef<HTMLDivElement>(null); // // 움직일 드래그 박스 Ref
    const [originPos, setOriginPos] = useState({ x: 0, y: 0 }); // 드래그 전 포지션값 (e.target.offset의 상대 위치)
    const [clientPos, setClientPos] = useState({ x: 0, y: 0 }); // 실시간 커서위치인 e.client를 갱신하는값
    const [pos, setPos] = useState({ left: 0, top: 0 }); // 실제 drag할 요소가 위치하는 포지션값

    console.log("모달 : " , focusEmp);

    const removePayment = (focus,index) => {

      const updateFocusEmp = focusEmp.filter((_, i) => i !== index);
      setFocusEmp(updateFocusEmp);

      if(isFocus.includes(focus.emp.empCode)){
        setIsFocus( isFocus.filter( empCode => empCode !== focus.emp.empCode));
      }
      console.log("변해라아아 : ", focus.emp.empCode);
    };  

    

    return(


        <div className={PaymentModalCSS.modal}>
        <div className={PaymentModalCSS.modalContainer}>
          {/* <DndProvider backend={HTML5Backend}> */}
          <div className={PaymentModalCSS.paymentOrgDiv} ref={modalContainerRef}>
          {searchForm.isSearch? <OrgSearchModal/> 
            : <OrgMainModal />}
            <button
              style={{
                border: "none",
                margin: 0,
                fontSize: "15px",
                height: "10px",
              }}
              onClick={ onClickHandler }
            >
              돌아가기
            </button>
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
          {/* </DndProvider> */}
        </div>
      </div>
  
    );
}

export default RefPaymentModal;