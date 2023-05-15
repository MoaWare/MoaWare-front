import { postLogin } from "../modules/EmployeeModule";

const RESTAPI_SERVER_IP = `${ process.env.REACT_APP_RESTAPI_SERVER_IP}`;
const RESTAPI_SERVER_PORT = `${ process.env.REACT_APP_RESTAPI_SERVER_PORT}`
const PRE_URL = `http://${RESTAPI_SERVER_IP}:${RESTAPI_SERVER_PORT}`

/* 로그인 */
export const callLoginAPI = (form) => {
    
    const requestURL = `${PRE_URL}/auth/login`;

    return async (dispatch, getState) => {

        const result = await fetch(requestURL, {
            method : 'POST',
            headers : {
                'Content-Type' : 'application/json'
            },
            body : JSON.stringify(form)
        })
        .then(response => response.json());

        console.log('[callLoginAPI] callLoginAPI result : ', result);

        if(result.status === 200) {
            window.localStorage.setItem('accessToken', result.data.accessToken);
        }
        
        dispatch(postLogin(result));
    }
}