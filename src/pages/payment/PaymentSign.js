import { useEffect, useState } from 'react';
import paySignCSS from './PaymentSign.module.css';
import PaymentSignModal from '../../components/modal/paymentModal/PaymentSignModal';
import { useDispatch, useSelector } from 'react-redux';
import { CallPaymentSignRegistAPI, CallPaymentSignUpdateAPI, CallPaymentSigntAPI } from '../../apis/PaymentAPICalls';
import { useNavigate } from 'react-router-dom';



function PaymentSign () {

    const [ imageForm, setImageForm ] = useState();
    const [ paymentSignModal, setPaymentSignModal ] = useState(false);
    const dispatch = useDispatch();
    const { sign } = useSelector( state => state.paymentReducer ); 
    const { signSave } = useSelector( state => state.paymentReducer );
    const { signUpdate } = useSelector( state => state.paymentReducer );
    const navigate = useNavigate(); 

    console.log( " sign은 ?! : ", sign );
    console.log( " signSave은 ?! : ", signSave );
    console.log( " signUpdate은 ?! : ", signUpdate );
    console.log( " path으으으 ?!  : " , sign?.fileCategory.filter( fileCategory => fileCategory.fcategoryType==="sign").length ?
    sign?.fileCategory.filter( fileCategory => fileCategory.fcategoryType==="sign")[0].file : "false");

    const onClickPaySignModal = () => {
        
        setPaymentSignModal(true);

    }

    const onClickPaySignSaved = () => {

        if(sign.fileCategory.filter( fileCategory => fileCategory.fcategoryType==="sign").length) {
     
                const formData = new FormData();

                formData.append('fileCode', sign.fileCategory[0].file.fileCode);
                formData.append('originalFileName', imageForm.sign);
                formData.append('fileInfo', imageForm.image);

                dispatch(CallPaymentSignUpdateAPI(formData))

        } else {

            const formData = new FormData();

            formData.append('originalFileName', imageForm.sign);
            formData.append('fileInfo', imageForm.image);
            formData.append('payFileCategory.fCategoryType', 'sign');

            dispatch(CallPaymentSignRegistAPI(formData));
        }
    }

    useEffect(
        () => {
            dispatch(CallPaymentSigntAPI())

        },[]
    ); 

    useEffect(

        () => {
            if(signSave?.status === 200) {
                alert('서명 등록이 완료 되었습니다.');
                navigate('/pay/sign', {replace : true });

            }
            

        }, [signSave]

    );


    useEffect(

        () => {
          if(signUpdate?.status === 200){
                alert('서명 수정이 완료 되었습니다.');
                navigate('/pay/sign', {replace : true });
            }
            

        }, [signUpdate]

    );

    console.log(" 넘어온 값 : " , imageForm);

    return(

        <div className={paySignCSS.background}>
             { paymentSignModal ? (<PaymentSignModal setPaymentSignModal={setPaymentSignModal} 
            setImageForm={setImageForm}  />) : null }
            <div className={paySignCSS.titleDiv}>
                <div className={paySignCSS.title}>서명 관리</div>
            </div>

                <div className={paySignCSS.imgTitleDiv}></div>
                <div className={paySignCSS.imgTitle}>서명 미리 보기</div>

            <div className={paySignCSS.imgDiv}>
                <div className={paySignCSS.imgBox}
                    onClick={ onClickPaySignModal}>
                      { 
                        imageForm && imageForm.imageUrl ? <img 
                                    className={paySignCSS.paySignImage}
                                    src={ imageForm.imageUrl}/> : sign && sign.fileCategory && 
                                    sign.fileCategory.filter( fileCategory => fileCategory.fcategoryType==="sign").length
                                       ? <img 
                                       className={paySignCSS.paySignImage}
                                       src={sign.fileCategory.filter( fileCategory => fileCategory.fcategoryType==="sign")[0].file.filePath}/> : 
                            
                                    "서 명"
                        }
                </div>

                <div className={paySignCSS.imgNameBox}> 
                    <div className={paySignCSS.imgTextBox}>
                        <div className={paySignCSS.imgNameTilte}>제목</div>
                        <div className={paySignCSS.imgName}>{
                            imageForm && imageForm.sign ? imageForm.sign : sign && sign.fileCategory && 
                            sign.fileCategory.filter( fileCategory => fileCategory.fcategoryType==="sign").length ? 
                            sign.fileCategory.filter( fileCategory => fileCategory.fcategoryType==="sign")[0].file.originalFileName :
                            ''
                        }</div>
                    </div>
                    <div className={paySignCSS.buttonDiv}>
                        <button className={paySignCSS.saveButton}
                            onClick={ onClickPaySignSaved }>저장</button>
                        <button className={paySignCSS.cancleButton}>취소</button>
                    </div>
                </div>
            </div>


        </div>
    )
}

export default PaymentSign;