import { useNavigate, useParams } from 'react-router-dom';
import PayDetailCSS from './PaymentStorageDetail.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useRef, useState } from 'react';
import { CallPaymentingDetailAPI } from '../../apis/PaymentAPICalls';
import PayModal from '../../components/modal/paymentModal/PayModal';
import PayRefuse from '../../components/modal/paymentModal/PayRefuse';
import moment from "moment";

function PaymentStorageDetail () {

    const { payCode } = useParams();
    console.log("PaymentDetail payCode : " , payCode);
    const disPatch = useDispatch();
    const { payDetail } = useSelector( state => state.paymentReducer);
    const navigator = useNavigate();
    const [ isPayModal, setIsPayModal ] = useState(false);
    const [ isPayRefuse, setIsPayRefuse ] = useState(false);
    const htmlRef = useRef();


    
   
    console.log("PaymentDetail payDetail : 우아라아앙" , payDetail);

    useEffect(
        ()=>{
            disPatch(CallPaymentingDetailAPI({payCode}));

        },[]
    )
    useEffect(() => {

      const targetElement = htmlRef.current.getElementsByTagName('input');
      if (targetElement) {
        for (let i = 0; i < targetElement.length; i++) {
          const valuePattern = /\{(\w+)\}/g;
          if(targetElement[i].value.match(valuePattern)){
            targetElement[i].value=""
          }
        }

      }
    }, [payDetail]
  );

      const onCancelHandler = () => {
        navigator('/pay/storage');
     }  



    return (
       <div className={PayDetailCSS.background}>
          <div className={PayDetailCSS.titleDiv}>
            <div className={PayDetailCSS.title}>임시 저장 문서</div> 
            <button className={PayDetailCSS.button} onClick={onCancelHandler}>결재선</button>
            <button className={PayDetailCSS.button} onClick={onCancelHandler}>결재요청</button>
            <button className={PayDetailCSS.button} onClick={onCancelHandler}>임시저장</button>
            <button className={PayDetailCSS.buttonCancel} onClick={onCancelHandler}>취소</button>
          </div>
        {isPayModal? <PayModal setIsPayModal={setIsPayModal}/> : "" }
        {isPayRefuse? <PayRefuse setIsPayRefuse={setIsPayRefuse}/> : "" }
       
        <div className={PayDetailCSS.payApproval}>

          <div className={PayDetailCSS.payDiv}>
            <div className={PayDetailCSS.payTitle}>기안자</div>
            <div className={PayDetailCSS.payName}>{payDetail && payDetail.emp.empName}</div>
            <div className={PayDetailCSS.paySign}> 
              {payDetail && payDetail.emp.payFileCategory && payDetail.emp.payFileCategory.filter( file => file.fcategoryType === "sign").length > 0? 
              <img src={payDetail.emp.payFileCategory.filter( file => file.fcategoryType === "sign")[0].file.filePath} className={PayDetailCSS.signImg}/>: 
              <>{payDetail && payDetail.emp.empName}</>
              }
            </div>
          </div>
          
          {
            payDetail && payDetail.paymentMember.sort((a, b) => a.payRank - b.payRank).map( (pay, index, array) => (
            <div className={PayDetailCSS.payDiv} key={pay.payCode}>
              <div className={PayDetailCSS.payTitle}>
                {index === payDetail.paymentMember.length -1 ? '최종 결재자' : '결재자'}
              </div>
              <div className={PayDetailCSS.payName}>{pay.emp.empName}</div>
              <div className={PayDetailCSS.paySign}>
                {pay.payType ==="결재" ? 
                pay.emp.payFileCategory.filter( file => file.fcategoryType === "sign").length > 0 ?
                <img src={pay.emp.payFileCategory.filter( file => file.fcategoryType === "sign")[0].file.filePath} className={PayDetailCSS.signImg}/>
                : pay.emp.empName : pay.payType ==="반려" ? "반려" : pay.payType === null && array.filter( paym => paym.payTotalYn==="Y" ).length>0 ?  array.filter( paym => paym.payTotalYn==="Y" )[0].emp.empName + " 전결" : "실패" 
                }
              </div>
            </div>
            ))
          }

        </div>
        <div className={PayDetailCSS.tableDiv}>
          <table className={PayDetailCSS.tbody}>
            <tbody >
              <tr>
                <th>문서 번호</th>
                <td>{payDetail && payDetail.payCode}</td>
                <th>기안 일자</th>
                <td>{payDetail && moment(payDetail.draftDate).format('YYYY-MM-DD')}</td>
              </tr>
              <tr>
                <th>기안자</th>
                <td>{payDetail && payDetail.emp.empName}</td>
                <th>기안 부서</th>
                <td>{payDetail && payDetail.emp.dept.deptName}</td>
              </tr>
              <tr>
                <th>참조자</th>
                <td colSpan='3' >
                  <div className={[PayDetailCSS.refMemebertd]}>
                    <div> {payDetail && payDetail.refenceMember.map( ref =><> {ref.emp.empName} </>)}</div>
                </div>
                </td>
              </tr>
              <tr>
                <th>문서제목</th>
                <td colSpan='3'><input type='text' name="draftTitle" value={payDetail&& payDetail.draftTitle} className={PayDetailCSS.input}
             /></td>
              </tr>
              </tbody>
          </table>
        </div>
        <div className={PayDetailCSS.tableDiv}>
          <table className={PayDetailCSS.tbody}>
            <tbody >
              <tr>
                <td colSpan='3' className={PayDetailCSS.docuMain}>
                  <div className={PayDetailCSS.docuText}>
                  <div ref={htmlRef&&htmlRef} dangerouslySetInnerHTML={{ __html: payDetail && payDetail.draftContent }} />
                  </div>
                </td>
              </tr>
              
            
              <tr className={PayDetailCSS.attach}>
                <th>첨부파일</th>
                <td colSpan="5">
                    { payDetail && payDetail.payFileCategory? 
                    <a href={payDetail.payFileCategory.file.filePath} className={PayDetailCSS.a} download={payDetail.payFileCategory.file.originalFileName}> {payDetail.payFileCategory.file.originalFileName}</a> : 
                    <div className={PayDetailCSS.a}>첨부파일 없음 </div>
                    }
                </td>
              </tr>
              </tbody>
          </table>
        </div>



      </div>
    )
}

export default PaymentStorageDetail;