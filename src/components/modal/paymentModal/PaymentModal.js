import PaymentModalCSS from './PaymentModal.module.css';
import OrgMainModal from './OrgMainModal';
import { createContext, useRef, useState } from 'react';
import OrgSearchModal from './OrgSearchModal';
import { TbSquareRoundedChevronLeft, TbSquareRoundedChevronRight } from 'react-icons/tb';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

export const orgContext = createContext();


function PaymentModal( {setPaymentModal, payEmp }) {

  

    const onClickHandler = () => {
        setPaymentModal(false);
      };

    const [searchForm, setSearchForm] = useState({
        search : '',
        isSearch : false
    });

    const [ focusEmp, setFocusEmp ] = useState({});
    
    console.log("searchForm search 는 : ", searchForm.search);
    console.log("searchForm isSearch 는 : ", searchForm.isSearch);

    const modalContainerRef = useRef(''); // 드래그 할 영역 네모 박스 Ref
    const dragComponentRef = useRef<HTMLDivElement>(null); // // 움직일 드래그 박스 Ref
    const [originPos, setOriginPos] = useState({ x: 0, y: 0 }); // 드래그 전 포지션값 (e.target.offset의 상대 위치)
    const [clientPos, setClientPos] = useState({ x: 0, y: 0 }); // 실시간 커서위치인 e.client를 갱신하는값
    const [pos, setPos] = useState({ left: 0, top: 0 }); // 실제 drag할 요소가 위치하는 포지션값

    console.log("모달 : " , focusEmp);

    const {emp} = focusEmp;

    return(


        <div className={PaymentModalCSS.modal}>
        <div className={PaymentModalCSS.modalContainer}>
          <DndProvider backend={HTML5Backend}>
          <div className={PaymentModalCSS.paymentOrgDiv} ref={modalContainerRef}>
          <orgContext.Provider value={{searchForm, setSearchForm, setFocusEmp}}>
          {searchForm.isSearch? <OrgSearchModal/> 
            : <OrgMainModal />}
          </orgContext.Provider>
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
                <idv className={PaymentModalCSS.payTitleName}>결재선 정보</idv>
                <div className={PaymentModalCSS.paymentPayItem}>
                  <div  className={PaymentModalCSS.paymentPayItemTitle}>기안</div>
                {payEmp && payEmp.empName} {payEmp && payEmp.job.jobName} {payEmp && payEmp.dept.deptName} </div>
              </div>

                { emp && 
                  <div className={PaymentModalCSS.paymentPayItem}>
                  <div  className={PaymentModalCSS.paymentPayItemTitle}>결재자</div>
                  {emp.empName} {emp.job.jobName} </div>
                }
                
          </div>
          </DndProvider>
        </div>
      </div>
  
    );
}

export default PaymentModal;