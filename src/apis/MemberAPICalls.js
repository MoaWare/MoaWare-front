import { postMemberInfo, getMemberInfo } from "../modules/MemberModule";

const RESTAPI_SERVER_IP = `${ process.env.REACT_APP_RESTAPI_SERVER_IP}`;
const RESTAPI_SERVER_PORT = `${ process.env.REACT_APP_RESTAPI_SERVER_PORT}`
const PRE_URL = `http://${RESTAPI_SERVER_IP}:${RESTAPI_SERVER_PORT}`



/* 회원 정보 재로그인  */
export const callMemberInfoLoginAPI = (form) => {
    
    const requestURL = `${PRE_URL}/auth/infoCheck`;

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

        console.log('[callLoginAPI] result : ', result);

        if(result.status === 200) {
            dispatch(postMemberInfo(result));
        }
    }
}


/* 회원 정보 조회  */
export const callMemberInfoAPI = () => {
    
    const requestURL = `${PRE_URL}/emp/member/info`;

    return async (dispatch, getState) => {

        const result = await fetch(requestURL, {
            method : 'GET',
            headers : {
                'Content-Type' : 'application/json',
                "Authorization" : "Bearer " + window.localStorage.getItem('accessToken')
            },
            body : JSON.stringify()
        })
        .then(response => response.json());

        console.log('[callLoginAPI] result : ', result);

        if(result.status === 200) {
            dispatch(getMemberInfo(result));
        }
    }
}