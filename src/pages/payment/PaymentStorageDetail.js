import { useNavigate, useParams } from 'react-router-dom';
import PayDetailCSS from './PaymentDetail.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useRef, useState } from 'react';
import { CallPaymentFormAPI, CallPaymentRegistAPI, CallPaymentingDetailAPI } from '../../apis/PaymentAPICalls';
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


    const [ form, setForm ] = useState({ });
    const dispatch = useDispatch();
    const { payForm, payEmp } = useSelector( state => state.paymentReducer );
    const [ htmlString, setHtmlString] = useState("");
    const [ file, setFile ] = useState();
    const [ select, setSelect ] = useState();
    const [ saveHtml , setSaveHtml] = useState();
    const [ conutInput, setCountInput ] = useState();
    const fileInput = useRef();
    const [ paymentModal, setPaymentModal ] = useState(false);
    const [ refpaymentModal, setRefPaymentModal ] = useState(false);
    const [searchForm, setSearchForm] = useState({
      search : '',
      isSearch : false
    });
  
    const [ focusEmp, setFocusEmp ] = useState([]);
    const [ isFocus, setIsFocus ] = useState([]);
    const [ payMember , setPayMember ] = useState([]);
    const [ refPayMember , setRefPayMember ] = useState([]);
  
  
    const contextValue =  () => {
  
        setSearchForm({
          search : '',
          isSearch : false
        }); 
        setFocusEmp([]);
        setIsFocus([]);
     
    }
  
    console.log("payEmp : ", payEmp);
    console.log("payForm : ", payForm);
  
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
  
      console.log('form', form);
  
      const onChangeSelect= (e) => {
       
        setSelect(e.target.value)
      
      }
  
      const [ isButton, setIsButton ] = useState(false);
      const onButtonHandler= () => {
  
        const HTML = savePayment();
        console.log(`saveHTML`, HTML)
  
        const formData = new FormData();
        if(file){
          formData.append("originalFileName", file.name)
          formData.append("fileInfo", file)
        }
        formData.append("payFileCategory.fCategoryName", form.draftTitle)
        formData.append("payFileCategory.fCategoryType", "payment")
        formData.append("payFileCategory.pay.draftDate", today());
        formData.append("payFileCategory.pay.draftTitle", form.draftTitle);
        formData.append("payFileCategory.pay.draftContent",HTML);
        formData.append("payFileCategory.pay.form.formCode", select);
        formData.append("payFileCategory.pay.payStatus", "진행중")
        payMember && payMember.forEach( (member, index) => { 
          console.log("이얃!!! : " , payMember.length);
          formData.append(`payFileCategory.pay.PaymentMember[${index}].PaymentMemberPk.payCode`, 0)
          formData.append(`payFileCategory.pay.PaymentMember[${index}].PaymentMemberPk.empCode`, member.empCode)
          formData.append(`payFileCategory.pay.PaymentMember[${index}].payRank`, index+1)
          index=== payMember.length-1 ? formData.append(`payFileCategory.pay.PaymentMember[${index}].payFinalYn`, 'Y')
          : formData.append(`payFileCategory.pay.PaymentMember[${index}].payFinalYn`, 'N')
        } );
  
        refPayMember && refPayMember.forEach( (member, index) => { 
          formData.append(`payFileCategory.pay.refenceMember[${index}].refenceMemberPk.payCode`, 0)
          formData.append(`payFileCategory.pay.refenceMember[${index}].refenceMemberPk.empCode`, member.empCode)
        } );
  
        console.log("저장한다 : ", [...formData.entries()]);
  
        dispatch(CallPaymentRegistAPI(formData));
  
        alert("저장 되었습니다.");
          navigator("/pay");
  
        
        
      }
  
      const onClickinputLabel = () => {
        fileInput.current.click();
      }
  
      const onClickCancleFile = () => {
        setFile();
      }
  
  
      const onChangeFile = (e) => {
        console.log("첨부파일 : " , e.target.files[0]);
        setFile(e.target.files[0]);
      }
      
      const today = () => {
        let now = new Date();
        let todayYear = now.getFullYear();
        let todayMonth = (now.getMonth() + 1 ) > 9 ? (now.getMonth() + 1 ) : '0'+(now.getMonth() + 1 );
        let todayDate = now.getDate() > 9 ? now.getDate() : '0' + now.getDate();
        
        return todayYear + '-' + todayMonth + '-' + todayDate;
      }
  
      
  
  
      useEffect( 
        ()=> {
          console.log("셀렉트 값은?! : ", select)
  
          dispatch(CallPaymentFormAPI());
  
          const processHtmlString = (html) => {
  
            let modifiedHTML = html;
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
          
          console.log("form : ", form);
          // DB에서 가져온 HTML 문자열
          const payPath = select && payForm && payForm[select-1].formString
          const htmlFromDB = payPath;
          if (payPath) {
          const filteredHTML = processHtmlString(htmlFromDB);
          setHtmlString(filteredHTML);
          console.log("filteredHTML 이당!? : ", filteredHTML);
          if(!form.total){setForm({})};
          }
  
          
      
      },[select, form.total]
      
      );
  
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
          
          console.log("form : ", form);
          // DB에서 가져온 HTML 문자열
          const payPath = select&& payForm&&payForm[select-1].formString
          const htmlFromDB = payPath;
          if (payPath) {
            const filteredHTML = processHtmlString(htmlFromDB);
            setForm({});
            return filteredHTML;
          }
          return null;
         
      };
  
      const storagePayment =  
      ()=> {
      
        const processHtmlString = (html) => {
  
          let modifiedHTML = html;
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
        
        console.log("form : ", form);
        // DB에서 가져온 HTML 문자열
        const payPath = select&& payForm&&payForm[select-1].formString
        const htmlFromDB = payPath;
        if (payPath) {
          const filteredHTML = processHtmlString(htmlFromDB);
          setForm({});
          return filteredHTML;
        }
        return null;
       
    };
  
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
        setCountInput(targetElement.length);
        console.log("htmlRef : ", htmlRef.current.getElementsByTagName('input'));
      }, [htmlString]);
  
  
  
      const onSavePayment = () => {
  
        const HTML = storagePayment();
        console.log(`saveHTML`, HTML)
  
        const formData = new FormData();
        if(file){
          formData.append("originalFileName", file.name)
          formData.append("fileInfo", file)
        }
        formData.append("payFileCategory.fCategoryName", form.draftTitle)
        formData.append("payFileCategory.fCategoryType", "payment")
        formData.append("payFileCategory.pay.draftDate", today());
        formData.append("payFileCategory.pay.draftTitle", form.draftTitle);
        formData.append("payFileCategory.pay.draftContent",htmlString);
        formData.append("payFileCategory.pay.form.formCode", select);
        formData.append("payFileCategory.pay.payStatus", "임시")
        
        payMember && payMember.forEach( (member, index) => { 
          formData.append(`payFileCategory.pay.PaymentMember[${index}].PaymentMemberPk.payCode`, 0)
          formData.append(`payFileCategory.pay.PaymentMember[${index}].PaymentMemberPk.empCode`, member.empCode)
          formData.append(`payFileCategory.pay.PaymentMember[${index}].payRank`, index+1)
          index=== member.length-1 ? formData.append(`payFileCategory.pay.PaymentMember[${index}].payFinalYn`, 'Y')
          : formData.append(`payFileCategory.pay.PaymentMember[${index}].payFinalYn`, 'N')
        } );
  
        refPayMember && refPayMember.forEach( (member, index) => { 
          formData.append(`payFileCategory.pay.refenceMember[${index}].refenceMemberPk.payCode`, 0)
          formData.append(`payFileCategory.pay.refenceMember[${index}].refenceMemberPk.empCode`, member.empCode)
        } );
        
       
  
        console.log("임시저장한다 : ", [...formData.entries()]);
  
        dispatch(CallPaymentRegistAPI(formData));
  
        alert("임시 저장 되었습니다.");
          navigator("/pay");
  
      }
  
      const onOrgModalHandler = () => {
        contextValue();
         setPaymentModal(true);
      }
  
      const onRefModalHandler = () => {
        contextValue();
        setRefPaymentModal(true);
     }



   
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
            <button className={PayDetailCSS.button} onClick={onOrgModalHandler}>결재선</button>
            <button className={PayDetailCSS.button} onClick={onButtonHandler}>결재요청</button>
            <button className={PayDetailCSS.button} onClick={onSavePayment}>임시저장</button>
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