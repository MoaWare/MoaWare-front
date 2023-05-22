import { useEffect,useRef,useState } from 'react';
import payCSS from './Payment.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { CallPaymentFormAPI, CallPaymentRegistAPI } from '../../apis/PaymentAPICalls';
import { useNavigate } from 'react-router-dom';







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


    const onChangeSelect= (e) => {
      console.log("셀렉트 값 : ", e.target.value)
      setSelect(e.target.value)
    
    }

    const [ isButton, setIsButton ] = useState(false);
    const onButtonHandler= () => {
      console.log("버튼 클릭", Object.keys(form).length, conutInput);
      
      // if(Object.keys(form).length == conutInput){
      // if(isButton){
      //   setIsButton(false);
      // } else {
      //   setIsButton(true)
      // }}
      // else{
      //   alert("양식을 전체 채우세요");
      // }

       if(isButton){
        setIsButton(false);
      } else {
        setIsButton(true)
      }
      
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
        console.log( "filteredHTML : ", filteredHTML);
        setHtmlString(filteredHTML);
        if(!form.total){setForm({})};
        }

        
    
    },[select, form.total]
    
    );

    useEffect( 
      ()=> {
        console.log("셀렉트 값은?!! : ", select)

        dispatch(CallPaymentFormAPI());

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
        console.log( "filteredHTML : ", filteredHTML);
        setSaveHtml(filteredHTML);
        setForm({});

        if(isButton){
       // navigator("/pay");
        }
        }
        
       
    },[isButton]
    
    );

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
    console.log( "htmlString : ", htmlString);
    console.log( "saved : ", saveHtml);


    const onSavePayment = () => {

      if(isButton){
        setIsButton(false);
      } else {
        setIsButton(true)
      }

      const formData = new FormData();
      formData.append("draftDate", today());
      formData.append("empCode", payEmp.empCode);
      formData.append("draftTitle", form.draftTitle);
      formData.append("draftContent",htmlString);
      formData.append("form.formCode", select);
      formData.append("payStatus", "임시")
      formData.append("payFileCategory.fCategoryName", form.draftTitle)
      formData.append("payFileCategory.fCategoryType", "payment")
      if(file){
        formData.append("payFileCategory.file.originalFileName", file.name)
        formData.append("payFileCategory.file.fileInfo", file)
      }

      console.log("저장한다 : ", [...formData.entries()]);

      dispatch(CallPaymentRegistAPI(formData));
    }


    return (
      <div className={payCSS.background}>
        <div className={payCSS.titleDiv}>
          <div className={payCSS.title}>기안문 작성</div>
          <button className={payCSS.button}>결재선</button>
          <button className={payCSS.button} onClick={onButtonHandler}>결재요청</button>
          <button className={payCSS.button} onClick={onSavePayment}>임시저장</button>
          <button className={payCSS.buttonCancel}>취소</button>
        </div>
        <div className={payCSS.payApproval}>
          <div className={payCSS.payDiv}>
            <div className={payCSS.payTitle}>기안자</div>
            <div className={payCSS.payName}>{payEmp && payEmp.empName}</div>
            <div className={payCSS.paySign}><img src="/icon/sign.png" className={payCSS.signImg}/></div>
          </div>
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
                <img src='/icon/refenceMember.png' className={payCSS.refMemeber} alt="문서"/>
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
                  <div ref={htmlRef&&htmlRef} dangerouslySetInnerHTML={{ __html: saveHtml ? saveHtml :htmlString }} />
                  </div>
                </td>
              </tr>
              
              <tr></tr>
              <tr className={payCSS.attach}>
                <th>첨부파일</th>
                <td colSpan="5"><input type='file' name="payFile" ref={fileInput} className={payCSS.input}
                onChange={onChangeFile}/></td>
              </tr>
              </tbody>
          </table>
        </div>

      </div>
    );

  };

export default Payment