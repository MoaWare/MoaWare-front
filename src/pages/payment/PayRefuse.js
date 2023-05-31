import { useState } from 'react';
import PayRefuseCSS from './PayRefuse.module.css';
import { FiX } from 'react-icons/fi';


function PayRefuse ({setIsPayRefuse}) {

    const [ isSave, setIsSave ] = useState(false);


    const onClickCancleHandler = () => {

        setIsPayRefuse(false);
    }

    const onClickSaveHandler = () => {

        setIsSave(true);
    }


    return(

        <div className={PayRefuseCSS.modal}>
        <div className={PayRefuseCSS.modalContainer}>
            <FiX onClick={ onClickCancleHandler }/>
            <div className={ isSave? PayRefuseCSS.saveMainDiv : PayRefuseCSS.mainDiv }>
                {isSave?
                <><label className={PayRefuseCSS.label}>반려사유</label>
                <input type='text' className={PayRefuseCSS.refuseText}></input></> :
                <div className={PayRefuseCSS.titleDiv}>결재를 반려 하시겠습니까?</div>
                }
                <div className={PayRefuseCSS.buttonDiv}>
                    {isSave?
                    <button className={PayRefuseCSS.payButton} >저장</button> :
                    <button className={PayRefuseCSS.payButton} onClick={ onClickSaveHandler }>확인</button>
                    }
                    <button className={PayRefuseCSS.buttonCancel} onClick={ onClickCancleHandler }>취 소</button>
                </div>
            </div>
        </div>
    </div>



    );
}

export default PayRefuse;