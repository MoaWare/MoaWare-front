import { getPayment, getPaymentComplete, getPaymentRefuse, getPaymentSign, getPaymentStorage, getPaymentall, getPaymentform, getPaymenting, getPaymentwait, postPayment, postPaymentSign } from "../modules/PayMentModule";

const RESTAPI_SERVER_IP = `${ process.env.REACT_APP_RESTAPI_SERVER_IP}`;
const RESTAPI_SERVER_PORT = `${ process.env.REACT_APP_RESTAPI_SERVER_PORT}`
const PRE_URL = `http://${RESTAPI_SERVER_IP}:${RESTAPI_SERVER_PORT}`


/* 결재 문서 전체  조회 */
export const CallPaymentAllListAPI = () => {

    const requestURL = `${PRE_URL}/pay/main`;

    return async( dispatch, getState ) => {
        
        const result = await fetch( requestURL, {
            method: 'GET',
            headers: {
                "Authorization" : "Bearer " + window.localStorage.getItem('accessToken')
            }
        }).then( res => res.json());

        console.log( result);
        if ( result.status === 200 ) {
            console.log ("[PaymentAPICalls] CallPaymentAllListAPI result : ", result);
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
            console.log ("[PaymentAPICalls] CallPaymentFormAPI result : ", result);
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
            dispatch(postPayment(result));
        }
    };

}

/* 결재 대기  문서 전체 조회 */
export const CallPaymentWaitListAPI = (currentPage = 1) => {

    const requestURL = `${PRE_URL}/pay/memberList?page=${currentPage}`;

    return async( dispatch, getState ) => {
        
        const result = await fetch( requestURL, {
            method: 'GET',
            headers: {
                "Authorization" : "Bearer " + window.localStorage.getItem('accessToken')
            }
        }).then( res => res.json());

        console.log( result);
        if ( result.status === 200 ) {
            console.log ("[PaymentAPICalls] CallPaymentWaitListAPI result : ", result);
            dispatch(getPaymentwait(result));
        }
    };

}

/* 결재 진행  문서 전체  조회 */
export const CallPaymentingListAPI = (currentPage = 1) => {

    const requestURL = `${PRE_URL}/pay/list?page=${currentPage}`;

    return async( dispatch, getState ) => {
        
        const result = await fetch( requestURL, {
            method: 'GET',
            headers: {
                "Authorization" : "Bearer " + window.localStorage.getItem('accessToken')
            }
        }).then( res => res.json());

        console.log( result);
        if ( result.status === 200 ) {
            console.log ("[PaymentAPICalls] CallPaymentingListAPI result : ", result);
            dispatch(getPaymenting(result));
        }
    };

}

/* 결재 완료  문서 전체  조회 */
export const CallPaymentCompleteListAPI = (currentPage = 1) => {

    const requestURL = `${PRE_URL}/pay/complete?page=${currentPage}`;

    return async( dispatch, getState ) => {
        
        const result = await fetch( requestURL, {
            method: 'GET',
            headers: {
                "Authorization" : "Bearer " + window.localStorage.getItem('accessToken')
            }
        }).then( res => res.json());

        console.log( result);
        if ( result.status === 200 ) {
            console.log ("[PaymentAPICalls] CallPaymentCompleteListAPI result : ", result);
            dispatch(getPaymentComplete(result));
        }
    };

}

/* 결재 반려  문서 전체  조회 */
export const CallPaymentRefuseListAPI = (currentPage = 1) => {

    const requestURL = `${PRE_URL}/pay/refuse?page=${currentPage}`;

    return async( dispatch, getState ) => {
        
        const result = await fetch( requestURL, {
            method: 'GET',
            headers: {
                "Authorization" : "Bearer " + window.localStorage.getItem('accessToken')
            }
        }).then( res => res.json());

        console.log( result);
        if ( result.status === 200 ) {
            console.log ("[PaymentAPICalls] CallPaymentRefuseListAPI result : ", result);
            dispatch(getPaymentRefuse(result));
        }
    };

}

/* 결재 임시 저장 문서 전체  조회 */
export const CallPaymentStorageListAPI = (currentPage = 1) => {

    const requestURL = `${PRE_URL}/pay/storage?page=${currentPage}`;

    return async( dispatch, getState ) => {
        
        const result = await fetch( requestURL, {
            method: 'GET',
            headers: {
                "Authorization" : "Bearer " + window.localStorage.getItem('accessToken')
            }
        }).then( res => res.json());

        console.log( result);
        if ( result.status === 200 ) {
            console.log ("[PaymentAPICalls] CallPaymentStorageListAPI result : ", result);
            dispatch(getPaymentStorage(result));
        }
    };

}


/* 사인 조회 */
export const CallPaymentSigntAPI = () => {

    const requestURL = `${PRE_URL}/pay/sign`;

    return async( dispatch, getState ) => {
        
        const result = await fetch( requestURL, {
            method: 'GET',
            headers: {
                "Authorization" : "Bearer " + window.localStorage.getItem('accessToken')
            }
        }).then( res => res.json());

        console.log( result);
        if ( result.status === 200 ) {
            console.log ("[PaymentAPICalls] CallPaymentStorageListAPI result : ", result);
            dispatch(getPaymentSign(result));
        }
    };

}


/* 싸인 저장 */
export const CallPaymentSignRegistAPI = (formData) => {

    const requestURL = `${PRE_URL}/pay/sign`;

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
            dispatch(postPaymentSign(result));
        }
    };

}
