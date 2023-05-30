import { useParams } from 'react-router-dom';
import PayDetailCSS from './PaymentDetail.module.css';
import { useDispatch } from 'react-redux';


function PaymentDetail () {

    const { payCode } = useParams();
    console.log("PaymentDetail payCode : " , payCode);
    const disPatch = useDispatch();

    

    return (
        <div className={ PayDetailCSS.background}>
            dddd
        </div>
    )
}

export default PaymentDetail;