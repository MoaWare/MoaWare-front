import { useEffect, useRef, useState } from 'react';
import PaySignModalCSS from './PaymentSignModal.module.css'
import { FiX } from 'react-icons/fi';

function PaymentSignModal ({setPaymentSignModal, setImageForm}) {

    const [ image, setImage ] = useState();
    const [ imageUrl, setImageUrl ] = useState();
    const [ sign, setSign ] = useState();

    const imageInput = useRef();

    useEffect(
        () => {
            if(image){
                const fileReader = new FileReader();
                fileReader.onload = (e) => {

                    const { result } = e.target;

                    if(result) setImageUrl(result);
                }
                fileReader.readAsDataURL(image);
            }

        },
        [image]
    );

    const onClickImageUpload = () => {
        imageInput.current.click();
    }

    const onchangeImageUpload = (e) => {
        setImage(e.target.files[0]);
    }

    const onClickCloseModal = () => {
        setPaymentSignModal(false)
    }

    const onChangeSignHandler = (e) => {
        setSign(
             e.target.value
        )
    }
    
    const onClickSaved = () => {
        setImageForm({
            "image" : image,
            "imageUrl" : imageUrl,
            "sign" : sign
        });
        setPaymentSignModal(false)
    }

    return (
        <div className={PaySignModalCSS.modal}>
            <div className={PaySignModalCSS.modalContainer}>
                <div className={PaySignModalCSS.modalMain}>
                    <div className={PaySignModalCSS.paySignTitleDiv}>
                        <div>서명관리</div>
                            <FiX onClick={ onClickCloseModal }/>
                    </div>
                    <div className={PaySignModalCSS.paySignBodyDiv}>
                        <input type='text' placeholder=' 서명 제목을 입력해 주세요.' className={PaySignModalCSS.paySignInput}
                            name="sign"  onChange={ onChangeSignHandler }/>
                        <div className={PaySignModalCSS.paySignFile}>
                            <div className={PaySignModalCSS.paySignFileTitle}>첨부파일</div>
                            
                            <div className={PaySignModalCSS.paySignFileInputLabel}
                                onClick={ onClickImageUpload }> {image&&image.name}</div>
                            
                            <input type="file"  className={PaySignModalCSS.paySignFileInput}
                                accept='image/jpg, image/png, image/jpeg, image/gif'
                                id="file"
                                ref= { imageInput }
                                onChange={ onchangeImageUpload }/>
                        </div>
                        <div className={PaySignModalCSS.paySignPreviewDiv}>
                            <div className={PaySignModalCSS.paySignPreviewTitle}>미리보기</div>
                            <div className={PaySignModalCSS.paySignPreviewContent}>
                                { imageUrl ? <img 
                                    className={PaySignModalCSS.paySignImage}
                                    src={ imageUrl}/> : "이미지 미리보기"
                                }
                            </div>
                        </div>
                    </div>
                    <div className={PaySignModalCSS.paySignButtonDiv}>
                        <button className={PaySignModalCSS.paySignButton}
                            onClick={ onClickSaved }>저장</button>
                    </div>  
                </div>
            </div>
        </div>
    )
}

export default PaymentSignModal;