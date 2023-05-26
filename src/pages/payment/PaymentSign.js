import paySignCSS from './PaymentSign.module.css';


function PaymentSign () {

    return(

        <div className={paySignCSS.background}>

            <div className={paySignCSS.titleDiv}>
                <div className={paySignCSS.title}>서명 관리</div>
            </div>

                <div className={paySignCSS.imgTitleDiv}></div>
                <div className={paySignCSS.imgTitle}>서명 미리 보기</div>
            <div className={paySignCSS.imgDiv}>
                <div className={paySignCSS.imgBox}>
                    <img src="" alt="사진" />
                </div>

                <div className={paySignCSS.imgNameBox}> 
                    <div className={paySignCSS.imgTextBox}>
                        <div className={paySignCSS.imgNameTilte}>제목</div>
                        <div className={paySignCSS.imgName}>아아앙</div>
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