import payBoardCSS from './PaymentBoard.module.css';
import PaymentBoardContext from './PaymentBoardContext';


function PaymentBoard() {

    return(
        <div className={payBoardCSS.background}>

            <div className={payBoardCSS.titleDiv}>
            <div className={payBoardCSS.title}>결재 대기 문서</div>

            </div>

            <PaymentBoardContext/>


            <div>
                {/* { pageInfo && <PagingBar pageInfo={ pageInfo } setCurrentPage={ setCurrentPage } /> } */}
            </div>

        </div>
    );
}

export default PaymentBoard;