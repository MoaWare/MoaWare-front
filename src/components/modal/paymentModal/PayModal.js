import PayModalCSS from './PayModal.module.css';
import { FiX } from 'react-icons/fi';


function PayModal({setIsPayModal}) {

    const onClickCancleHandler = () => {

        setIsPayModal(false);
    }


    return (

        <div className={PayModalCSS.modal}>
            <div className={PayModalCSS.modalContainer}>
                <FiX onClick={ onClickCancleHandler }/>
                <div className={PayModalCSS.mainDiv}>
                    <div className={PayModalCSS.titleDiv}>결재를 진행 하시겠습니까?</div>
                    <div className={PayModalCSS.buttonDiv}>
                        <button className={PayModalCSS.totalButton}>전 결</button>
                        <button className={PayModalCSS.payButton}>결 재</button>
                        <button className={PayModalCSS.buttonCancel} onClick={ onClickCancleHandler }>취 소</button>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default PayModal;