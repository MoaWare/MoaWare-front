import { useEffect } from 'react';
import payCSS from './PaymentMain.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { CallPaymentListAPI } from '../../apis/PaymentAPICalls';


function PaymentMain () {
;
    const disPatch = useDispatch();
    const { pay } = useSelector( state => state.paymentReducer);

    console.log("pay : ", pay);

    useEffect( ()=>{

        disPatch(CallPaymentListAPI());
    },[]
        
    );


    return (
        <div className={payCSS.background}>
            <div className={payCSS.paySummary}> 
                <div className={payCSS.paySummaryItem}>
                    <div className={payCSS.itemTitle}>결재 대기</div>
                    <hr className={payCSS.itemHr}/>
                    <div className={payCSS.itemText}>4건</div>
                </div>
                <div className={payCSS.paySummaryItem}>
                    <div className={payCSS.itemTitle}>결재 진행</div>
                    <hr className={payCSS.itemHr}/>
                    <div className={payCSS.itemText}>{pay && pay.filter(pay => pay.payStatus === '진행중').length}건</div>
                </div>
                <div className={payCSS.paySummaryItem}>
                    <div className={payCSS.itemTitle}>결재 완료</div>
                    <hr className={payCSS.itemHr}/>
                   <div className={payCSS.itemText}>{pay && pay.filter(pay => pay.payStatus === '결재 완료').length}건</div>
                </div>
                <div className={payCSS.paySummaryItem}>
                    <div className={payCSS.itemTitle}>반려 문서</div>
                    <hr className={payCSS.itemHr}/>
                   <div className={payCSS.itemText}>{pay && pay.filter(pay => pay.payStatus === '반려').length}건</div>
                </div>
            </div>
            <div className={payCSS.payList}>    
                <div className={payCSS.payListTitle}>결재 대기 문서</div>
            <table className={payCSS.payListTable}>
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
                    { pay && pay.map( pay => pay.payStatus === '진행중' ?
                        <tr key={pay.payCode}>
                            <td>{pay.payCode}</td> 
                            <td>{pay.form.formTitle}</td> 
                            <td>{pay.draftDate.substring(0, 10)}</td> 
                            <td>{pay.draftTitle}</td> 
                            <td>첨부</td> 
                            <td>{pay.payStatus}</td> 
                            <td>기안자</td> 
                        </tr>
                        :  ''
                    )}   
                </tbody>
            </table>
            </div>
        </div>
    ) 
} 

export default PaymentMain;