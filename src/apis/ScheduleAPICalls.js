import { getSchedules, getSchedule, postSchedule, putSchedule, putSchModify } from "../modules/ScheduleModule";

const RESTAPI_SERVER_IP = `${ process.env.REACT_APP_RESTAPI_SERVER_IP}`;
const RESTAPI_SERVER_PORT = `${ process.env.REACT_APP_RESTAPI_SERVER_PORT}`
const PRE_URL = `http://${RESTAPI_SERVER_IP}:${RESTAPI_SERVER_PORT}/schedule`

/* 전체 캘린더 조회 */
export const callScheduleListAPI = () => {

    const requestURL = `${PRE_URL}/calendar`;

    return async (dispatch, getState) => {

        const result = await fetch(requestURL, {
            method: 'GET',
            headers : {
                "Content-Type" : "application/json",
                "Authorization" : "Bearer " + window.localStorage.getItem('accessToken')
            },
        }).then(res => res.json());

        if(result.status === 200){
            console.log("[ScheduleAPICalls] callScheduleListAPI result : ", result);
            dispatch(getSchedules(result));
        }

    }

}

/* 상세 캘린더 조회 */
export const callScheduleDetailAPI = ({ schCode }) => {

    const requestURL = `${PRE_URL}/calendar/${schCode}`;

    return async (dispatch, getState) => {

        const result = await fetch(requestURL, {
            method: 'GET',
            headers : {
                "Content-Type" : "application/json",
                "Authorization" : "Bearer " + window.localStorage.getItem('accessToken')
            },
        }).then(res => res.json());

        if(result.status === 200){
            console.log("[ScheduleAPICalls] callScheduleDetailAPI result : ", result);
            dispatch(getSchedule(result));
        }

    }

}

/* 일정 등록 */
export const callScheduleInsertAPI = ( form ) => {
    
    const requestURL = `${PRE_URL}/calendar`;
  
    return async (dispatch, getState) => {

        const result = await fetch(requestURL, {
            method : "POST",
            headers : {
                "Content-Type" : "application/json",
                "Authorization" : "Bearer " + window.localStorage.getItem('accessToken')
            },
            body: JSON.stringify(form)
        }).then(res => res.json());
      
        if(result.status === 200) {
            console.log('[ScheduleAPICalls] callScheduleInsertAPI : ', result);
            dispatch(postSchedule(result));
        
        } 

    }

}

/* 일정 삭제 */
export const callScheduleDeleteAPI = ({ schCode }) => {

    console.log('Delete schCode', schCode)

    const requestURL = `${PRE_URL}/calendar/${schCode}`;

    return async (dispatch, getState) => {

        const result = await fetch(requestURL, {
            method: 'PUT',
            headers : {
                "Content-Type" : "application/json",
                "Authorization" : "Bearer " + window.localStorage.getItem('accessToken')
            },
        }).then(res => res.json());

        if(result.status === 200){
            console.log("[ScheduleAPICalls] callScheduleDeleteAPI result : ", result);
            dispatch(putSchedule(result));
        }

    }

}

/* 일정 수정 */
export const callScheduleModifyAPI = ( form ) => {
    
    const requestURL = `${PRE_URL}/calendar`;
  
    return async (dispatch, getState) => {

        const result = await fetch(requestURL, {
            method : "PUT",
            headers : {
                "Content-Type" : "application/json",
                // "Authorization" : "Bearer " + window.localStorage.getItem('accessToken')
            },
            body: JSON.stringify(form)
        }).then(res => res.json());
      
        if(result.status === 200) {
            console.log('[ScheduleAPICalls] callScheduleModifyAPI : ', result);
            dispatch(putSchModify(result));
        
        } 

    }

}