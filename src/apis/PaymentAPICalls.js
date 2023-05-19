import { getPayment } from "../modules/PayMentModule";

const RESTAPI_SERVER_IP = `${ process.env.REACT_APP_RESTAPI_SERVER_IP}`;
const RESTAPI_SERVER_PORT = `${ process.env.REACT_APP_RESTAPI_SERVER_PORT}`
const PRE_URL = `http://${RESTAPI_SERVER_IP}:${RESTAPI_SERVER_PORT}`

/* 조직도 상위부서 검색 */
export const CallPaymentListAPI = () => {

    const requestURL = `${PRE_URL}/pay/draft`;

    return async( dispatch, getState ) => {
        
        const result = await fetch( requestURL, {
            method: 'GET'
        }).then( res => res.json());

        console.log( result);
        if ( result.status === 200 ) {
            console.log ("[PaymentAPICalls] CallPaymentListAPI result : ", result);
            dispatch(getPayment(result));
        }
    };

}
