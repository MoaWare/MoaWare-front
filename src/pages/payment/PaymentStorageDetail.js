import { useNavigate, useParams } from 'react-router-dom';
import PayDetailCSS from './PaymentDetail.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useRef, useState } from 'react';
import { CallPaymentFormAPI, CallPaymentingDetailAPI } from '../../apis/PaymentAPICalls';
import PayModal from '../../components/modal/paymentModal/PayModal';
import PayRefuse from '../../components/modal/paymentModal/PayRefuse';
import moment from "moment";

function PaymentStorageDetail () {

    const { payCode } = useParams();
    console.log("PaymentDetail payCode : " , payCode);
    const disPatch = useDispatch();
    const { payDetail, payForm, payEmp } = useSelector( state => state.paymentReducer);
    console.log("PaymentDetail payForm1 : " , payForm);
    console.log("PaymentDetail payForm2 : " , payDetail);
    console.log("PaymentDetail payForm3 : " , payEmp);
    const navigator = useNavigate();
    const [ isPayModal, setIsPayModal ] = useState(false);
    const [ isPayRefuse, setIsPayRefuse ] = useState(false);
    const htmlRef = useRef();
    const [ form, setForm ] = useState({ });
    const [ focusEmp, setFocusEmp ] = useState([]);
    const [ isFocus, setIsFocus ] = useState([]);
    const [ payMember , setPayMember ] = useState([]);
    const [ refPayMember , setRefPayMember ] = useState([]);
    const [ paymentModal, setPaymentModal ] = useState(false);
    const [ refpaymentModal, setRefPaymentModal ] = useState(false);
    const [searchForm, setSearchForm] = useState({
      search : '',
      isSearch : false
    });
    const html = payDetail&&payDetail.draftContent;

  const contextValue =  () => {

      setSearchForm({
        search : '',
        isSearch : false
      }); 
      setFocusEmp([]);
      setIsFocus([]);
   
  }
   
    console.log("PaymentDetail payDetail : 우아라아앙" , payDetail);


    const onChangeHandler = (e) => {
      const { name, value } = e.target;
      if(name === 'total'){
        setForm(prevForm => ({
          ...prevForm,
          [name]: value,
          supply:  Math.round(value/1.1),
          tax: Math.round(value/1.1*0.1)
        }));
      }
      else{
      setForm(prevForm => ({
        ...prevForm,
        [name]: value
      }));
    }
      console.log( "폼의 값 : ", form);
    }


    useEffect(
        ()=>{
            disPatch(CallPaymentingDetailAPI({payCode}));
            disPatch(CallPaymentFormAPI());
        },[]
    )


    useEffect(() => {

      const targetElement = htmlRef.current.getElementsByTagName('input');
      if (targetElement) {
        for (let i = 0; i < targetElement.length; i++) {
          targetElement[i].addEventListener('change', onChangeHandler);
          const valuePattern = /\{(\w+)\}/g;
          if(targetElement[i].value.match(valuePattern)){
            targetElement[i].value=""
          } 
        }
      }
      console.log("htmlRef : ", htmlRef.current.getElementsByTagName('input'));
    }, [html]
  );
  console.log("form은123 ?: ", form);
      const onCancelHandler = () => {
        navigator('/pay/storage');
     }  

     const savePayment =  
      ()=> {

        

        const processHtmlString = (html) => {

          let modifiedHTML = html;
          modifiedHTML = modifiedHTML.replace(/<input(?! readOnly)/g, '<input readOnly');
          Object.entries(form).forEach(([key, value]) => {
            const regex = new RegExp(`{${key}}`, "g");
  
            if (form[key] === undefined || form[key] === null) {
              modifiedHTML = modifiedHTML.replace(regex, "");
            } else {
              modifiedHTML = modifiedHTML.replace(regex, `"${value}"`.trim() || " ");
            }
         
          });  
     
          return modifiedHTML;
        };
        
        console.log("form은 ?: ", form);
        // DB에서 가져온 HTML 문자열
         // DB에서 가져온 HTML 문자열
         const payPath = payForm[payDetail.form.formCode-1].formString
         const htmlFromDB = payPath;

         console.log("payPath은 ?: ", payPath);
         if (payPath) {
           const filteredHTML = processHtmlString(htmlFromDB);
           setForm({});
           return filteredHTML;
         }
        return null;
       
    };



     const onButtonHandler= () => {

      const HTML = savePayment();
      console.log(`saveHTML`, HTML)

     
      alert("저장 되었습니다.");
        navigator("/pay/storage");

      
      
    }


    return (
       <div className={PayDetailCSS.background}>
          <div className={PayDetailCSS.titleDiv}>
            <div className={PayDetailCSS.title}>임시 저장 문서</div> 
            <button className={PayDetailCSS.button} onClick={onCancelHandler}>결재선</button>
          <button className={PayDetailCSS.button} onClick={onButtonHandler}>결재요청</button>
          <button className={PayDetailCSS.button} onClick={onCancelHandler}>임시저장</button>
            <button className={PayDetailCSS.buttonCancel} onClick={onCancelHandler} >취소</button>
          </div>
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
                <td colSpan='3'><input type='text' name="draftTitle" value={form && form?.draftTitle ? form.draftTitle : payDetail&&payDetail.draftTitle } className={PayDetailCSS.input}
             onChange={onChangeHandler}/></td>
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