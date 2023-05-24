import payBoardCSS from './PaymentBoard.module.css';


function PaymentBoardContext () {

    return (
        <table className={payBoardCSS.payListTable}>
                <tbody>
                    <tr>
                        <th>문서 번호</th>
                        <th>사용 양식</th>
                        <th>기한 날짜</th>
                        <th>기안서 제목</th>
                        <th>첨부</th>
                        <th>상태</th>
                        <th>결재 요청자</th>
                    </tr>
                </tbody>
        </table>
    )
}

export default PaymentBoardContext;