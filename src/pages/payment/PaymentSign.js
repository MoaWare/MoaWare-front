import { useState } from 'react';
import paySignCSS from './PaymentSign.module.css';
import PaymentSignModal from '../../components/modal/paymentModal/PaymentSignModal';


function PaymentSign () {

    const [ imageForm, setImageForm ] = useState();
    const [ paymentSignModal, setPaymentSignModal ] = useState(false);

    const onClickPaySignModal = () => {
        setPaymentSignModal(true);
    }

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
                      { imageForm && imageForm.imageUrl ? <img 
                                    className={paySignCSS.paySignImage}
                                    src={ imageForm.imageUrl}/> : "서 명"
                                }
                </div>

                <div className={paySignCSS.imgNameBox}> 
                    <div className={paySignCSS.imgTextBox}>
                        <div className={paySignCSS.imgNameTilte}>제목</div>
                        <div className={paySignCSS.imgName}>{imageForm && imageForm.sign}</div>
                    </div>
                    <div className={paySignCSS.buttonDiv}>
                        <button className={paySignCSS.saveButton}>저장</button>
                        <button className={paySignCSS.cancleButton}>취소</button>
                    </div>
                </div>
            </div>


        </div>
    )
}

export default PaymentSign;