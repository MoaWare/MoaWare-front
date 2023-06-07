import { useNavigate, useParams } from 'react-router-dom';
import PayDetailCSS from './PaymentStorageDetail.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { createContext, useEffect, useRef, useState } from 'react';
import { BsPersonFillAdd } from "react-icons/bs";
import { CallPaymentFormAPI, CallPaymentRegistAPI, CallPaymentStorageUpdateAPI, CallPaymentingDetailAPI } from '../../apis/PaymentAPICalls';
import moment from "moment";
import { FiX } from 'react-icons/fi';
import PaymentStorageModal from '../../components/modal/paymentStorageModal/PaymentStorageModal';
import RefPaymentStorageModal from '../../components/modal/paymentStorageModal/RefPaymentStorageModal';


export const payStorageContext = createContext();


function PaymentStorageDetail () {

    const { payCode } = useParams();

    const dispatch = useDispatch();
    const { payDetail, payForm, payEmp } = useSelector( state => state.paymentReducer);
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
    const [ file, setFile ] = useState();
    const fileInput = useRef();
    const [ isModifyFile, setIsModifyFile ] = useState(false)
    const contextValue =  () => {

        setSearchForm({
          search : '',
          isSearch : false
        }); 
        setFocusEmp([]);
        setIsFocus([]);
    
    }
  

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

    }


    useEffect(
        ()=>{
            dispatch(CallPaymentingDetailAPI({payCode}));
            dispatch(CallPaymentFormAPI());
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
          } else{
            setForm(prevForm => {
              const updatedForm = {
                ...prevForm,
                [targetElement[i].name]: targetElement[i].value
              };
              return updatedForm;
            })};
        }
      }

    }, [html]
  );

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
        
         const payPath = payForm[payDetail.form.formCode-1].formString
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

      const payPath = payForm[payDetail.form.formCode-1].formString
      const htmlFromDB = payPath;
      if (payPath) {
        const filteredHTML = processHtmlString(htmlFromDB);
        setForm({});
        return filteredHTML;
      }
      return null;
     
  };

  const onButtonHandler= () => {

    const HTML = savePayment();

    const formData = new FormData();
    if(file){
      formData.append("originalFileName", file.name)
      formData.append("fileInfo", file)
    }
    formData.append("payFileCategory.pay.payCode", payDetail.payCode)
    formData.append("payFileCategory.fCategoryName", form.draftTitle? form.draftTitle: payDetail.draftTitle)
    formData.append("payFileCategory.fCategoryType", "payment")
    formData.append("payFileCategory.pay.draftDate", payDetail.draftDate);
    formData.append("payFileCategory.pay.draftTitle", form.draftTitle? form.draftTitle: payDetail.draftTitle);
    formData.append("payFileCategory.pay.draftContent",HTML);
    formData.append("payFileCategory.pay.form.formCode", payDetail.form.formCode);
    formData.append("payFileCategory.pay.payStatus", "진행중")
    payMember && payMember.forEach( (member, index) => { 

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


    dispatch(CallPaymentStorageUpdateAPI(formData));

    alert("저장 되었습니다.");
      navigator("/pay/storage");

    
    
  }

  const onSavePayment = () => {

    const HTML = storagePayment();

    const formData = new FormData();

     
    if(file){
      formData.append("originalFileName", file.name)
      formData.append("fileInfo", file)
    } else if(payDetail.payFileCategory?.file) {
      formData.append("originalFileName", payDetail.payFileCategory.file.originalFileName)
      formData.append("savedFileName", payDetail.payFileCategory.file.savedFileName)
    } 


    formData.append("payFileCategory.pay.payCode", payDetail.payCode)
    formData.append("payFileCategory.fCategoryName", form.draftTitle? form.draftTitle: payDetail.draftTitle)
    formData.append("payFileCategory.fCategoryType", "payment")
    formData.append("payFileCategory.pay.draftDate", payDetail.draftDate);
    formData.append("payFileCategory.pay.draftTitle", form.draftTitle? form.draftTitle: payDetail.draftTitle);
    formData.append("payFileCategory.pay.draftContent",HTML);
    formData.append("payFileCategory.pay.form.formCode", payDetail.form.formCode);
    formData.append("payFileCategory.pay.payStatus", "임시")
    payMember && payMember.forEach( (member, index) => { 
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
    

    dispatch(CallPaymentStorageUpdateAPI(formData));

    alert("임시 저장 되었습니다.");
      navigator("/pay/storage");

  }

  const onRefModalHandler = () => {
    contextValue();
    setRefPaymentModal(true);
 }

    const onOrgModalHandler = () => {
      contextValue();
      setPaymentModal(true);
      if(payDetail.paymentMember){
        const paymentMemberEmp= []
        payDetail.paymentMember.map( member => paymentMemberEmp.push({emp:member.emp, sub:member.emp.dept}))
        setFocusEmp(paymentMemberEmp)
    }

    }
    const onClickinputLabel = () => {
      fileInput.current.click();
    }

    const onClickCancleFile = () => {
      if(payDetail.payFileCategory && payDetail.payFileCategory.file){
      payDetail.payFileCategory.file="";
    }
      setFile();
    }
    

    
    const onChangeFile = (e) => {
      setFile(e.target.files[0]);
      if(payDetail.payFileCategory && payDetail.payFileCategory.file){payDetail.payFileCategory.file=e.target.files[0];}
    }

    const onClickModify = () => {
      if(payDetail.payFileCategory.file !== ""){
      setFile(payDetail.payFileCategory.file);
      }
      setIsModifyFile(true);
      
    }

    const onClickModifySave = (e) => {
      
      setIsModifyFile(false);
    }

    return (
       <div className={PayDetailCSS.background}>
        
        <payStorageContext.Provider value={{searchForm, setSearchForm, setFocusEmp, focusEmp, isFocus, setIsFocus, setPayMember, setRefPayMember}}>
        { paymentModal ? (<PaymentStorageModal setPaymentModal={setPaymentModal} payEmp={payEmp} payDetail={payDetail}/>) : null }
        { refpaymentModal ? (<RefPaymentStorageModal setRefPaymentModal={setRefPaymentModal} payEmp={payEmp}/>) : null }
        </payStorageContext.Provider>
        
          <div className={PayDetailCSS.titleDiv}>
            <div className={PayDetailCSS.title}>임시 저장 문서</div> 
            <button className={PayDetailCSS.button} onClick={onOrgModalHandler}>결재선</button>
          <button className={PayDetailCSS.button} onClick={onButtonHandler}>결재요청</button>
          <button className={PayDetailCSS.button} onClick={onSavePayment}>임시저장</button>
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
          {payMember.length>0? (
            payMember && payMember.map( (pay, index) => (
              <div className={PayDetailCSS.payDiv} key={pay.payCode}>
              <div className={PayDetailCSS.payTitle}>
                {index === payMember.length -1 ? '최종 결재자' : '결재자'}
              </div>
              <div className={PayDetailCSS.payName}>{pay.empName}</div>
              <div className={PayDetailCSS.paySign}></div>
            </div>
            ))
          ) :
          (
            payDetail && payDetail.paymentMember&& payDetail.paymentMember.sort((a, b) => a.payRank - b.payRank).map( (pay, index, array) => (
            <div className={PayDetailCSS.payDiv} key={pay.payCode}>
              <div className={PayDetailCSS.payTitle}>
                {index === payDetail.paymentMember.length -1 ? '최종 결재자' : '결재자'}
              </div>
              <div className={PayDetailCSS.payName}>{pay.emp.empName}</div>
              <div className={PayDetailCSS.paySign}>
                {pay.payType ==="결재" ? 
                pay.emp.payFileCategory.filter( file => file.fcategoryType === "sign").length > 0 ?
                <img src={pay.emp.payFileCategory.filter( file => file.fcategoryType === "sign")[0].file.filePath} className={PayDetailCSS.signImg}/>
                : pay.emp.empName : pay.payType ==="반려" ? "반려" : pay.payType === null && array.filter( paym => paym.payTotalYn==="Y" ).length>0 ?  array.filter( paym => paym.payTotalYn==="Y" )[0].emp.empName + " 전결" : "" 
                }
              </div>
            </div>
            ))
          )  
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
                    <BsPersonFillAdd className={PayDetailCSS.refMemeber} onClick={onRefModalHandler}/>
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
                <td className={PayDetailCSS.inputTd} colSpan="5">
                    { payDetail && payDetail.payFileCategory? 
                    <>
                      {isModifyFile?  
                        (<> <input type='file' name="payFile" ref={fileInput} className={PayDetailCSS.inputFile} onChange={onChangeFile}/> 
                          {
                            file===undefined ? 
                            (<label className={PayDetailCSS.inputLabel} onClick={ onClickinputLabel }>첨부파일 없음</label>)
                          :
                            (<>
                              <div className={PayDetailCSS.inputLabelDiv}><label className={PayDetailCSS.inputLabelSet} onClick={ onClickinputLabel }> {file && file.originalFileName? file.originalFileName: file.name}  </label>
                              <FiX className={PayDetailCSS.inputFix} onClick={onClickCancleFile}/></div>
                            </>)
                          }<button className={PayDetailCSS.modifyButton}  onClick={onClickModifySave}>저장</button>
                        </> )
                        : payDetail && payDetail.payFileCategory!==""? 
                        file? 
                        (<><input type='file' name="payFile" ref={fileInput} className={PayDetailCSS.inputFile} onChange={onChangeFile}/> 
                          <label className={PayDetailCSS.aModi} onClick={ onClickinputLabel }>{file && file.name} </label>
                          <FiX className={PayDetailCSS.inputFix} onClick={onClickCancleFile}/>
                        
                        </> ): (
                          <>
                            <a href={payDetail.payFileCategory.file.filePath} className={PayDetailCSS.a} target='_blank' rel='noreferrer' download={payDetail.payFileCategory.file.originalFileName}> 
                              {payDetail.payFileCategory.file.originalFileName? payDetail.payFileCategory.file.originalFileName : "첨부파일 없음"}</a> 
                            <button className={PayDetailCSS.modifyButton}  onClick={onClickModify}>수정</button>
                          </>
                        ) : 
                        (
                          <>
                            <input type='file' name="payFile" ref={fileInput} className={PayDetailCSS.inputFile} onChange={onChangeFile}/>
                            {
                              file===undefined ? 
                              (<label className={PayDetailCSS.inputLabel} onClick={ onClickinputLabel }>첨부파일 없음</label>)
                            :
                              (<>
                                <label className={PayDetailCSS.inputLabelSet} onClick={ onClickinputLabel }>{file && file.name} </label>
                                <FiX className={PayDetailCSS.inputFix} onClick={onClickCancleFile}/>
                              </>)
                            }
                          </>
                        )
                        }
                    </>
                    : 
                      (
                        <>
                          <input type='file' name="payFile" ref={fileInput} className={PayDetailCSS.inputFile} onChange={onChangeFile}/>
                          {
                            file===undefined ? 
                            (<label className={PayDetailCSS.inputLabel} onClick={ onClickinputLabel }>첨부파일 없음</label>)
                          :
                            (<>
                              <label className={PayDetailCSS.inputLabelSet} onClick={ onClickinputLabel }>{file && file.name} </label>
                              <FiX className={PayDetailCSS.inputFix} onClick={onClickCancleFile}/>
                            </>)
                          }
                        </>
                      )
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