import { getPayment, getPaymentComplete, getPaymentRefuse, getPaymentSign, getPaymentStorage, getPaymentdetail, getPaymentform, getPaymenting, getPaymentwait, postPayment, postPaymentSign, putPaymentSign, putPaymentStorageUpdate, putPaymentUpdate } from "../modules/PayMentModule";

const RESTAPI_SERVER_IP = `${ process.env.REACT_APP_RESTAPI_SERVER_IP}`;
const RESTAPI_SERVER_PORT = `${ process.env.REACT_APP_RESTAPI_SERVER_PORT}`
const PRE_URL = `http://${RESTAPI_SERVER_IP}:${RESTAPI_SERVER_PORT}/pay`


/* 결재 문서 전체  조회 */
export const CallPaymentAllListAPI = () => {

    const requestURL = `${PRE_URL}/main`;

    return async( dispatch, getState ) => {
        
        const result = await fetch( requestURL, {
            method: 'GET',
            headers: {
                "Authorization" : "Bearer " + window.localStorage.getItem('accessToken')
            }
        }).then( res => res.json());

        if ( result.status === 200 ) {
            dispatch(getPayment(result));
        }
    };

}


/* 양식 조회 검색 */
export const CallPaymentFormAPI = () => {

    const requestURL = `${PRE_URL}/draft`;

    return async( dispatch, getState ) => {
        
        const result = await fetch( requestURL, {
            method: 'GET',
            headers: {
                "Authorization" : "Bearer " + window.localStorage.getItem('accessToken')
            }
        }).then( res => res.json());

        if ( result.status === 200 ) {

            dispatch(getPaymentform(result));
        }
    };

}

/* 기안서 저장 */
export const CallPaymentRegistAPI = (formData) => {

    const requestURL = `${PRE_URL}/draft`;

    return async( dispatch, getState ) => {
        
        const result = await fetch( requestURL, {
            method: 'POST',
            headers: {
                "Authorization" : "Bearer " + window.localStorage.getItem('accessToken')
            },
            body : formData
        }).then( res => res.json());

        if ( result.status === 200 ) {
       
            dispatch(postPayment(result));
        }
    };

}

/* 결재 대기  문서 전체 조회 */
export const CallPaymentWaitListAPI = (currentPage = 1) => {

    const requestURL = `${PRE_URL}/memberList?page=${currentPage}`;

    return async( dispatch, getState ) => {
        
        const result = await fetch( requestURL, {
            method: 'GET',
            headers: {
                "Authorization" : "Bearer " + window.localStorage.getItem('accessToken')
            }
        }).then( res => res.json());


        if ( result.status === 200 ) {
            dispatch(getPaymentwait(result));
        }
    };

}

/* 결재 대기 문서 상세 조회 */
export const CallPaymentingDetailAPI = ({payCode}) => {

    const requestURL = `${PRE_URL}/payDetail/${payCode}`;

    return async( dispatch, getState ) => {
        
        const result = await fetch( requestURL, {
            method: 'GET',
            headers: {
                "Authorization" : "Bearer " + window.localStorage.getItem('accessToken')
            }
        }).then( res => res.json());

        if ( result.status === 200 ) {

            dispatch(getPaymentdetail(result));
        }
    };

}



/* 결재 문서 결재 처리 조회 */
export const CallPaymentUpdateAPI = ({form}) => {

    const requestURL = `${PRE_URL}/updateSign`;

    return async( dispatch, getState ) => {
        
        const result = await fetch( requestURL, {
            method: 'PUT',
            headers: {
                "Content-Type" : "application/json",
                "Authorization" : "Bearer " + window.localStorage.getItem('accessToken')
            },
            body : JSON.stringify(form)
        }).then( res => res.json());

        if ( result.status === 200 ) {

            dispatch(putPaymentUpdate(result));
        }
    };

}

/* 결재 진행  문서 전체  조회 */
export const CallPaymentingListAPI = (currentPage = 1) => {

    const requestURL = `${PRE_URL}/list?page=${currentPage}`;

    return async( dispatch, getState ) => {
        
        const result = await fetch( requestURL, {
            method: 'GET',
            headers: {
                "Authorization" : "Bearer " + window.localStorage.getItem('accessToken')
            }
        }).then( res => res.json());

        if ( result.status === 200 ) {

            dispatch(getPaymenting(result));
        }
    };

}





/* 결재 완료  문서 전체  조회 */
export const CallPaymentCompleteListAPI = (currentPage = 1) => {

    const requestURL = `${PRE_URL}/complete?page=${currentPage}`;

    return async( dispatch, getState ) => {
        
        const result = await fetch( requestURL, {
            method: 'GET',
            headers: {
                "Authorization" : "Bearer " + window.localStorage.getItem('accessToken')
            }
        }).then( res => res.json());

        if ( result.status === 200 ) {

            dispatch(getPaymentComplete(result));
        }
    };

}

/* 결재 반려  문서 전체  조회 */
export const CallPaymentRefuseListAPI = (currentPage = 1) => {

    const requestURL = `${PRE_URL}/refuse?page=${currentPage}`;

    return async( dispatch, getState ) => {
        
        const result = await fetch( requestURL, {
            method: 'GET',
            headers: {
                "Authorization" : "Bearer " + window.localStorage.getItem('accessToken')
            }
        }).then( res => res.json());

        if ( result.status === 200 ) {

            dispatch(getPaymentRefuse(result));
        }
    };

}

/* 결재 임시 저장 문서 전체  조회 */
export const CallPaymentStorageListAPI = (currentPage = 1) => {

    const requestURL = `${PRE_URL}/storage?page=${currentPage}`;

    return async( dispatch, getState ) => {
        
        const result = await fetch( requestURL, {
            method: 'GET',
            headers: {
                "Authorization" : "Bearer " + window.localStorage.getItem('accessToken')
            }
        }).then( res => res.json());

        if ( result.status === 200 ) {

            dispatch(getPaymentStorage(result));
        }
    };

}


/* 사인 조회 */
export const CallPaymentSigntAPI = () => {

    const requestURL = `${PRE_URL}/sign`;

    return async( dispatch, getState ) => {
        
        const result = await fetch( requestURL, {
            method: 'GET',
            headers: {
                "Authorization" : "Bearer " + window.localStorage.getItem('accessToken')
            }
        }).then( res => res.json());

        if ( result.status === 200 ) {

            dispatch(getPaymentSign(result));
        }
    };

}


/* 싸인 저장 */
export const CallPaymentSignRegistAPI = (formData) => {

    const requestURL = `${PRE_URL}/sign`;

    return async( dispatch, getState ) => {
        
        const result = await fetch( requestURL, {
            method: 'POST',
            headers: {
                "Authorization" : "Bearer " + window.localStorage.getItem('accessToken')
            },
            body : formData
        }).then( res => res.json());

        if ( result.status === 200 ) {

            dispatch(postPaymentSign(result));
        }
    };

}


/* 싸인 수정 */
export const CallPaymentSignUpdateAPI = (formData) => {

    const requestURL = `${PRE_URL}/sign`;

    return async( dispatch, getState ) => {
        
        const result = await fetch( requestURL, {
            method: 'PUT',
            headers: {
                "Authorization" : "Bearer " + window.localStorage.getItem('accessToken')
            },
            body : formData
        }).then( res => res.json());

        if ( result.status === 200 ) {
            dispatch(putPaymentSign(result));
        }
    };

}

/* 결재문서 업데이트 */
export const CallPaymentStorageUpdateAPI = (formData) => {


    const requestURL = `${PRE_URL}/storage`;

    return async( dispatch, getState ) => {
        
        const result = await fetch( requestURL, {
            method: 'PUT',
            headers: {
                "Authorization" : "Bearer " + window.localStorage.getItem('accessToken')
            },
            body : formData
        }).then( res => res.json());

        if ( result.status === 200 ) {

            dispatch(putPaymentStorageUpdate(result));
        }
    };

}
