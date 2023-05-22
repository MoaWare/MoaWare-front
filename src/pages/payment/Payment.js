import { useEffect,useRef,useState } from 'react';
import payCSS from './Payment.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { CallPaymentListAPI } from '../../apis/PaymentAPICalls';







function Payment () {

  const [ form, setForm ] = useState({ });
  const dispatch = useDispatch();
  const { pay } = useSelector( state => state.paymentReducer );
  const [htmlString, setHtmlString] = useState("");
  const payPath = pay&&pay[0].form.formPath;
  const htmlRef = useRef();
  const [ select, setSelect ] = useState();
  const [ saveHtml , setSaveHtml] = useState();
  const [ conutInput, setCountInput ] = useState();

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
      if(Object.keys(form).length == conutInput){
      if(isButton){
        setIsButton(false);
      } else {
        setIsButton(true)
      }}
      else{
        alert("양식을 전체 채우세요");
      }
    }


    useEffect( 
      ()=> {
        dispatch(CallPaymentListAPI());

        const processHtmlString = (html) => {

          let modifiedHTML = html;
          // modifiedHTML = modifiedHTML.replace(/<input/g, '<input readOnly');
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
        dispatch(CallPaymentListAPI());

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
        const htmlFromDB = payPath;
        if (payPath) {
        const filteredHTML = processHtmlString(htmlFromDB);
        console.log( "filteredHTML : ", filteredHTML);
        setSaveHtml(filteredHTML);
        setForm({});
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

    return (
      <div className={payCSS.background}>
        <div className={payCSS.titleDiv}>
          <div className={payCSS.title}>기안문 작성</div>
          <button className={payCSS.button}>결재선</button>
          <button className={payCSS.button} onClick={onButtonHandler}>결재요청</button>
          <button className={payCSS.button}>임시저장</button>
          <button className={payCSS.buttonCancel}>취소</button>
        </div>
        <div className={payCSS.payApproval}>
          <div className={payCSS.payDiv}>
            <div className={payCSS.payTitle}>기안자</div>
            <div className={payCSS.payName}>홍길동</div>
            <div className={payCSS.paySign}><img src="/icon/sign.png" className={payCSS.signImg}/></div>
          </div>
        </div>
        <div className={payCSS.tableDiv}>
          <table className={payCSS.tbody}>
            <tbody >
              <tr>
                <th>문서 번호</th>
                <td>dddd</td>
                <th>기안 일자</th>
                <td>ddd</td>
              </tr>
              <tr>
                <th>기안자</th>
                <td>dddd</td>
                <th>기안 부서</th>
                <td>d</td>
              </tr>
              <tr>
                <th>참조자</th>
                <td colSpan='3' >
                  <div className={[payCSS.refMemebertd]}>
                텍스트asdfasdfasdf
                <img src='/icon/refenceMember.png' className={payCSS.refMemeber} alt="문서"/>
                </div>
                </td>
              </tr>
              <tr>
                <th>문서제목</th>
                <td colSpan='3'><input type='text' name="payMainTitle" value={form.payMainTitle} className={payCSS.input}
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
                    <option value="1">지출결의서</option>
                    <option value="2">출퇴근 사유서</option>
                    <option value="3">프로젝트 기안서</option>
                  </select>
                </td>
              </tr>
              <tr>
                <td colSpan='3' className={payCSS.docuMain}>
                  <div className={payCSS.docuText}>
                  <div ref={htmlRef&&htmlRef} dangerouslySetInnerHTML={{ __html: saveHtml ? saveHtml :htmlString }} />
                    {/* <table className={payCSS.docuDiv}>
                      <tbody className={payCSS.docuDiv}>
                        <tr>
                          <th colSpan='4' className={payCSS.docuTitle}>출퇴근 사유서</th>
                        </tr>
                        <tr>
                          <th className={payCSS.docuLabel}>성 명</th>
                          <td><input type='text' className={payCSS.docuInput}/></td>
                          <th>부 서</th>
                          <td><input type='text' className={payCSS.docuInput}/></td>
                        </tr>
                        <tr>
                          <th>직 급</th>
                          <td><input type='text' className={payCSS.docuInput}/></td>
                          <th>처리 구분</th>
                          <td><input type='text' className={payCSS.docuInput}/></td>
                        </tr>
                        <tr>
                          <th>일시</th>
                          <td colSpan='3'><input type='text' className={payCSS.docuInput}/></td>
                        </tr>
                        <tr>
                          <th>출근 시간</th>
                          <td><input type='text' className={payCSS.docuInput}/></td>
                          <th>퇴근 시간</th>
                          <td><input type='text' className={payCSS.docuInput}/></td>
                        </tr>
                        <tr>
                          <th rowSpan="2">사유</th>
                          <td rowSpan="2" colSpan="3"><input type='text' className={payCSS.docuInputText}/></td>
                        </tr>
                      </tbody>
                    </table> */}

                  </div>
                </td>
              </tr>
              
              <tr></tr>
              <tr className={payCSS.attach}>
                <th>첨부파일</th>
                <td colSpan="5"><input type='file' className={payCSS.input}/></td>
              </tr>
              </tbody>
          </table>
        </div>

      </div>
    );

  };

export default Payment