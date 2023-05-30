import { useParams } from 'react-router-dom';
import PayDetailCSS from './PaymentDetail.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useRef } from 'react';
import { CallPaymentingDetailAPI } from '../../apis/PaymentAPICalls';
import { BsPersonFillAdd } from "react-icons/bs";
import moment from "moment";


function PaymentDetail () {

    const { payCode } = useParams();
    console.log("PaymentDetail payCode : " , payCode);
    const disPatch = useDispatch();
    const { payDetail } = useSelector( state => state.paymentReducer);
    const htmlRef = useRef();
   
  

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
      }, [payDetail]);


    return (
       <div className={PayDetailCSS.background}>
        <div className={PayDetailCSS.titleDiv}>
          <div className={PayDetailCSS.title}>결재 대기 문서</div>
          <button className={PayDetailCSS.button} >결재선</button>
          <button className={PayDetailCSS.button} >결재요청</button>
          <button className={PayDetailCSS.button} >임시저장</button>
          <button className={PayDetailCSS.buttonCancel} >취소</button>
        </div>
        <div className={PayDetailCSS.payApproval}>

          <div className={PayDetailCSS.payDiv}>
            <div className={PayDetailCSS.payTitle}>기안자</div>
            <div className={PayDetailCSS.payName}>{payDetail && payDetail.emp.empName}</div>
            <div className={PayDetailCSS.paySign}> 
              {payDetail && payDetail.emp.payFileCategory && payDetail.emp.payFileCategory.filter( file => file.fcategoryType === "sign") ? 
              <img src={payDetail.emp.payFileCategory.filter( file => file.fcategoryType === "sign")[0].file.filePath} className={PayDetailCSS.signImg}/>: 
              <>{payDetail && payDetail.emp.empName}</>
              }
            </div>
          </div>
          
          {/* {
            payMember && payMember.map( (pay, index) => (
              <div className={PayDetailCSS.payDiv}>
              <div className={PayDetailCSS.payTitle}>
                {index === payMember.length -1 ? '최종 결재자' : '결재자'}
              </div>
              <div className={PayDetailCSS.payName}>{pay.empName}</div>
              <div className={PayDetailCSS.paySign}></div>
            </div>
            ))
          } */}

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
                    <div> {payDetail && payDetail.refenceMember.map( ref =><> {ref.empName} </>)}</div>
                    <BsPersonFillAdd className={PayDetailCSS.refMemeber} />
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
                <td colSpan="5"><input type='file' name="payFile" className={PayDetailCSS.input}
                /></td>
              </tr>
              </tbody>
          </table>
        </div>

      </div>
    )
}

export default PaymentDetail;