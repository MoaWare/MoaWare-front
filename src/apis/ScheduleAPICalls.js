import { getSchedules, getSchedule, postSchedule } from "../modules/ScheduleModule";

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
            }
        }).then(res => res.json());

        if(result.status === 200){
            console.log("[ScheduleAPICalls] callScheduleListAPI result : ", result);
            dispatch(getSchedules(result));
        }

    };

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
            }
        }).then(res => res.json());

        if(result.status === 200){
            console.log("[ScheduleAPICalls] callScheduleDetailAPI result : ", result);
            dispatch(getSchedule(result));
        }

    };

}

/* 일정 등록 */
export const callScheduleInsertAPI = (formData) => {

    const requestURL = `${PRE_URL}/calendar`;

    return async (dispatch, getState) => {

        const result = await fetch(requestURL, {
            method: 'POST',
            headers : {
                // "Content-Type" : "application/json",
                "Authorization" : "Bearer " + window.localStorage.getItem('accessToken')
            },
            body : formData
        }).then(res => res.json());

        console.log(result);
        if(result.status === 200){
            console.log("[ScheduleAPICalls] callScheduleInsertAPI result : ", result);
            dispatch(postSchedule(result));
        }

    };

}