import { createContext, useEffect,useRef,useState } from 'react';
import payCSS from './Payment.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { CallPaymentFormAPI, CallPaymentRegistAPI } from '../../apis/PaymentAPICalls';
import { useNavigate } from 'react-router-dom';
import PaymentModal from '../../components/modal/paymentModal/PaymentModal';
import { BsPersonFillAdd } from "react-icons/bs";
import RefPaymentModal from '../../components/modal/paymentModal/RefPaymentModal';
import { FiX } from 'react-icons/fi';





export const orgContext = createContext();

function Payment () {

  const [ form, setForm ] = useState({ });
  const dispatch = useDispatch();
  const { payForm, payEmp } = useSelector( state => state.paymentReducer );
  const [ htmlString, setHtmlString] = useState("");
  const [ file, setFile ] = useState();
  const htmlRef = useRef();
  const [ select, setSelect ] = useState();
  const [ saveHtml , setSaveHtml] = useState();
  const [ conutInput, setCountInput ] = useState();
  const fileInput = useRef();
  const navigator = useNavigate();
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
      formData.append("payFileCategory.pay.draftContent",HTML);
      formData.append("payFileCategory.pay.form.formCode", select);
      formData.append("payFileCategory.pay.payStatus", "임시")
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

   const onCancelHandler = () => {
      navigator('/pay');
   }

   console.log("모달 : " , focusEmp);
   console.log("모달완료?! : " , payMember);
   console.log("모달참조완료?! : " , refPayMember);

    return (
      <div className={payCSS.background}>
        <orgContext.Provider value={{searchForm, setSearchForm, setFocusEmp, focusEmp, isFocus, setIsFocus, setPayMember, setRefPayMember}}>
        { paymentModal ? (<PaymentModal setPaymentModal={setPaymentModal} payEmp={payEmp}/>) : null }
        { refpaymentModal ? (<RefPaymentModal setRefPaymentModal={setRefPaymentModal} payEmp={payEmp}/>) : null }
        </orgContext.Provider>
        <div className={payCSS.titleDiv}>
          <div className={payCSS.title}>기안문 작성</div>
          <button className={payCSS.button} onClick={onOrgModalHandler}>결재선</button>
          <button className={payCSS.button} onClick={onButtonHandler}>결재요청</button>
          <button className={payCSS.button} onClick={onSavePayment}>임시저장</button>
          <button className={payCSS.buttonCancel} onClick={onCancelHandler}>취소</button>
        </div>
        <div className={payCSS.payApproval}>

          <div className={payCSS.payDiv}>
            <div className={payCSS.payTitle}>기안자</div>
            <div className={payCSS.payName}>{payEmp && payEmp.empName}</div>
            <div className={payCSS.paySign}> 
              
              {payEmp && payEmp.payFileCategory && payEmp.payFileCategory.filter( file => file.fcategoryType === "sign").length>0 ? 
              <img src={payEmp.payFileCategory.filter( file => file.fcategoryType === "sign")[0].file.filePath} className={payCSS.signImg}/>: 
              <>{payEmp && payEmp.empName}</>
              }

            </div>
          </div>
          
          {
            payMember && payMember.map( (pay, index) => (
              <div className={payCSS.payDiv}>
              <div className={payCSS.payTitle}>
                {index === payMember.length -1 ? '최종 결재자' : '결재자'}
              </div>
              <div className={payCSS.payName}>{pay.empName}</div>
              <div className={payCSS.paySign}></div>
            </div>
            ))
          }

        </div>
        <div className={payCSS.tableDiv}>
          <table className={payCSS.tbody}>
            <tbody >
              <tr>
                <th>문서 번호</th>
                <td>자동채번</td>
                <th>기안 일자</th>
                <td>{today()}</td>
              </tr>
              <tr>
                <th>기안자</th>
                <td>{payEmp && payEmp.empName}</td>
                <th>기안 부서</th>
                <td>{payEmp && payEmp.dept.deptName}</td>
              </tr>
              <tr>
                <th>참조자</th>
                <td colSpan='3' >
                  <div className={[payCSS.refMemebertd]}>
                    <div> {refPayMember && refPayMember.map( ref =><> {ref.empName} </>)}</div>
                <BsPersonFillAdd className={payCSS.refMemeber} onClick={onRefModalHandler}/>
                </div>
                </td>
              </tr>
              <tr>
                <th>문서제목</th>
                <td colSpan='3'><input type='text' name="draftTitle" value={form.draftTitle} className={payCSS.input}
                onChange={onChangeHandler}/></td>
              </tr>
              </tbody>
          </table>
        </div>
        <div className={payCSS.tableDiv}>
          <table className={payCSS.tbody}>
            <tbody >
              <tr>
                <th>양식 종류</th>
                <td colSpan='3'>
                  <select defaultValue="null" onChange={onChangeSelect}>
                    <option value="null" disabled hidden>선택하세요</option>
                    {payForm && payForm.map( payForm => <option value={payForm.formCode} key={payForm.formCode}>{payForm.formTitle}</option>)}
                  </select>
                </td>
              </tr>
              <tr>
                <td colSpan='3' className={payCSS.docuMain}>
                  <div className={payCSS.docuText}>
                  <div ref={htmlRef&&htmlRef} dangerouslySetInnerHTML={{ __html :htmlString }} />
                  </div>
                </td>
              </tr>
              
            
              <tr className={payCSS.attach}>
                <th>첨부파일</th>
                <td colSpan="5"><input type='file' name="payFile" ref={fileInput} className={payCSS.inputFile}
                onChange={onChangeFile}/>
                {file===undefined ? <label className={payCSS.inputLabel} onClick={ onClickinputLabel }>첨부파일 없음</label>
                  :
                <><label className={payCSS.inputLabelSet} onClick={ onClickinputLabel }>{file && file.name} </label><FiX onClick={onClickCancleFile}/></>}
                </td>
              </tr>
              </tbody>
          </table>
        </div>

      </div>
    );

  };

export default Payment