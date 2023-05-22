import { getPayment, getPaymentform } from "../modules/PayMentModule";

const RESTAPI_SERVER_IP = `${ process.env.REACT_APP_RESTAPI_SERVER_IP}`;
const RESTAPI_SERVER_PORT = `${ process.env.REACT_APP_RESTAPI_SERVER_PORT}`
const PRE_URL = `http://${RESTAPI_SERVER_IP}:${RESTAPI_SERVER_PORT}`


/* 결재문서 전체  검색 */
export const CallPaymentListAPI = () => {

    const requestURL = `${PRE_URL}/pay/list`;

    return async( dispatch, getState ) => {
        
        const result = await fetch( requestURL, {
            method: 'GET',
            headers: {
                "Authorization" : "Bearer " + window.localStorage.getItem('accessToken')
            }
        }).then( res => res.json());

        console.log( result);
        if ( result.status === 200 ) {
            console.log ("[PaymentAPICalls] CallPaymentListAPI result : ", result);
            dispatch(getPayment(result));
        }
    };

}


/* 양식 조회 검색 */
export const CallPaymentFormAPI = () => {

    const requestURL = `${PRE_URL}/pay/draft`;

    return async( dispatch, getState ) => {
        
        const result = await fetch( requestURL, {
            method: 'GET',
            headers: {
                "Authorization" : "Bearer " + window.localStorage.getItem('accessToken')
            }
        }).then( res => res.json());

        console.log( result);
        if ( result.status === 200 ) {
            console.log ("[PaymentAPICalls] CallPaymentListAPI result : ", result);
            dispatch(getPaymentform(result));
        }
    };

}

/* 기안서 저장 */
export const CallPaymentRegistAPI = (formData) => {

    const requestURL = `${PRE_URL}/pay/draft`;

    return async( dispatch, getState ) => {
        
        const result = await fetch( requestURL, {
            method: 'POST',
            headers: {
                "Authorization" : "Bearer " + window.localStorage.getItem('accessToken')
            },
            body : formData
        }).then( res => res.json());

        console.log( result);
        if ( result.status === 200 ) {
            console.log ("[PaymentAPICalls] CallPaymentRegistAPI  result : ", result);
            //dispatch(getPaymentform(result));
        }
    };

}
