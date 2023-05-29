import { getAdminworklist, putWorkstatusmodify  } from "../modules/AdminWorkModule";


const RESTAPI_SERVER_IP = `${ process.env.REACT_APP_RESTAPI_SERVER_IP}`;
const RESTAPI_SERVER_PORT = `${ process.env.REACT_APP_RESTAPI_SERVER_PORT}`
const PRE_URL = `http://${RESTAPI_SERVER_IP}:${RESTAPI_SERVER_PORT}`

export const callAdminWorkListAPI = ({ date, currentPage = 1 }) => {

    const requestURL = `${PRE_URL}/work/admin/${date}?page=${currentPage}`;

    return async (dispatch, getState) => {
          const result = await fetch(requestURL, {
            method : 'GET',
            headers : {
                "Content-Type" : "application/json",
                "Authorization" : "Bearer " + window.localStorage.getItem('accessToken')
            }
        }).then(response => response.json());

        if(result.status === 200) {
            console.log("[AdminWorkAPICalls] callAdminWorkListAPI result : ", result);
            dispatch(getAdminworklist(result))
        }

    }
} 

export const putWorkStatusModifyAPI = (form) => {

    console.log('put폼잉ㅇㅇㅇㅇㅇㅇ', form);

    const requestURL = `${PRE_URL}/work/status/modify`;

    return async (dispatch,getState) => {

        const result = await fetch(requestURL, {
            method : 'PUT',
            headers : {
                "Content-Type" : "application/json",
                "Authorization" : "Bearer " + window.localStorage.getItem('accessToken')
            },
            body : JSON.stringify(form)
        })
        .then(response => response.json());

        if(result.status === 200) {
            console.log('[AdminWorkAPICalls] putWorkStatusModifyAPI result :', result);
            dispatch(putWorkstatusmodify(result));
        }
    }
}