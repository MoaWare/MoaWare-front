import { getDeptlist, getHeaderName, postFindId, postFindPwd, postLogin, getProfile } from "../modules/EmployeeModule";
import { postMemberInfo, getMemberInfo } from "../modules/MemberModule";
import { toast } from "react-toastify";



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
                'Content-Type' : 'application/json',
                "Authorization" : "Bearer " + window.localStorage.getItem('accessToken')
            },
            body : JSON.stringify(form)
        })
        .then(response => response.json());

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
                "Content-Type" : "application/json",
                "Authorization" : "Bearer " + window.localStorage.getItem('accessToken')
            },
            body: JSON.stringify(form)
        }).then(res => res.json());
        
        if( result.status === 200 ){
            dispatch(postFindId(result));
        } else {
            toast.error(result.message, {
                position: toast.POSITION.TOP_CENTER, 
                autoClose: 2000, 
                hideProgressBar: false, 
                progressStyle: {
                  backgroundColor: '#ff000074', 
                  height: '5px', 
                },
              });
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
                "Content-Type" : "application/json",
                "Authorization" : "Bearer " + window.localStorage.getItem('accessToken')
            },
            body: JSON.stringify(form)
        }).then(res => res.json());
        
        if( result?.status === 200 ){
            dispatch(postFindPwd(result));
        } else {
            toast.error(result.message, {
                position: toast.POSITION.TOP_CENTER, 
                autoClose: 2000, 
                hideProgressBar: false, 
                progressStyle: {
                  backgroundColor: '#ff000074', 
                  height: '5px', 
                },
              });
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
            dispatch(getHeaderName(result));
        }
    }
}

export const callDeptListAPI = () => {
    const requestURL = `${PRE_URL}/proj/dept`
    return async (dispatch, getState) => {

        const result = await fetch(requestURL, {
            method : 'GET',
            headers : {
                "Content-Type" : "application/json",
                "Authorization" : "Bearer " + window.localStorage.getItem('accessToken')
            }
        }).then(res => res.json());

        if(result.status === 200){
            dispatch(getDeptlist(result));
        }
    }
}