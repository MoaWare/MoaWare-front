import { getSchedules, getSchedule, postSchedule, putSchedule } from "../modules/ScheduleModule";

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
            dispatch(postSchedule(result));
        
        } 

    }

}

/* 일정 삭제 */
export const callScheduleDeleteAPI = ({ schCode }) => {


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
            dispatch(putSchedule(result));
        }

    }

}