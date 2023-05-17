import { getWorklist, postInsertstart, putModifytime } from "../modules/WorkModule";

const RESTAPI_SERVER_IP = `${ process.env.REACT_APP_RESTAPI_SERVER_IP}`;
const RESTAPI_SERVER_PORT = `${ process.env.REACT_APP_RESTAPI_SERVER_PORT}`
const PRE_URL = `http://${RESTAPI_SERVER_IP}:${RESTAPI_SERVER_PORT}`

export const callWorkMyListAPI = ({ workDate, currentPage = 1 }) => {

    const requestURL = `${PRE_URL}/work/works/${workDate}?page=${currentPage}`;
    
    return async (dispatch, getState) => {

        const result = await fetch(requestURL, {
            method : 'GET',
            headers : {
                "Content-Type" : "application/json",
                "Authorization" : "Bearer " + window.localStorage.getItem('accessToken')
            }
        }).then(response => response.json());

        if(result.status === 200) {
            console.log("[WorkAPICalls] callWorkMyListAPI result : ", result);
            dispatch(getWorklist(result))
        }

    }
}

export const callTimeInsertAPI = ({ workDate }) => {

    const requestURL = `${PRE_URL}/work/start`;

        return async (dispatch, getState) => {

            //시간 등록을 위해 Post 방식으로 보내지만 DB에 저장할 정보를 백에서 다 만들었기 때문에
            //빈 객체라도 보내준다.
            console.log('workDate : ', workDate);

            const result = await fetch(requestURL, {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json',
                    "Authorization" : "Bearer " + window.localStorage.getItem('accessToken')
                },
                //문자열 그대로 전송
                body: workDate,

              }).then((response) => response.json());

              if(result.status === 200) {
                console.log("[WorkAPICalls] callTimeInsertAPI result : ", result);
                dispatch(postInsertstart(result));
            }

        };

}

export const callTimeModifyAPI = ({ workDate }) => {

    const requestURL = `${PRE_URL}/work/modify`;

        return async (dispatch, getState) => {

            //시간 등록을 위해 Post 방식으로 보내지만 DB에 저장할 정보를 백에서 다 만들었기 때문에
            //빈 객체라도 보내준다.
            console.log('workDate : ', workDate);

            const result = await fetch(requestURL, {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json',
                    "Authorization" : "Bearer " + window.localStorage.getItem('accessToken')
                },
                //문자열 그대로 전송
                body: workDate,

              }).then((response) => response.json());

              if(result.status === 200) {
                console.log("[WorkAPICalls] callTimeModifyAPI result : ", result);
                dispatch(putModifytime(result));
            }

        };

}