import { getHeaderName, postFindId, postFindPwd, postLogin } from "../modules/EmployeeModule";
import { postMemberInfo, getMemberInfo } from "../modules/MemberModule";

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

        console.log('[callLoginAPI] result : ', result);

        if(result.status === 200) {
            window.localStorage.setItem('accessToken', result.data.accessToken);
        }
        
        dispatch(postLogin(result));
    }
}


/* 아이디 찾기 */ 
export const callFindAccountAPI = (form) => {

    const requestURL = `${PRE_URL}/auth/idfind`;

    return async (dispatch, getState) => {

        const result = await fetch(requestURL, {
            method : "POST",
            headers : {
                "Content-Type" : "application/json"
            },
            body: JSON.stringify(form)
        }).then(res => res.json());
        
        if( result.status === 200 ){
            console.log("[callIdFindAPI] result :", result);
            dispatch(postFindId(result));
        } else {
            alert(result.message);
        }
    }
}

/* 비밀번호 찾기 */ 
export const callFindPwdAccountAPI = (form) => {

    const requestURL = `${PRE_URL}/auth/pwdfind`;

    return async (dispatch, getState) => {

        const result = await fetch(requestURL, {
            method : "POST",
            headers : {
                "Content-Type" : "application/json"
            },
            body: JSON.stringify(form)
        }).then(res => res.json());
        
        if( result?.status === 200 ){
            console.log("[callFindPwdAccountAPI] result :", result);
            dispatch(postFindPwd(result));
        } else {
            alert(result.message);
        }
    }
}

/* 메인 헤더 이름 띄우기 */
export const callHeaderNameAPI = () => {
    const requestURL = `${PRE_URL}/auth/name`
    return async (dispatch, getState) => {

        const result = await fetch(requestURL, {
            method : 'GET',
            headers : {
                "Content-Type" : "application/json",
                "Authorization" : "Bearer " + window.localStorage.getItem('accessToken')
            }
        }).then(res => res.json());

        if(result.status === 200){
            console.log(result);
            dispatch(getHeaderName(result));
        }
    }
}

