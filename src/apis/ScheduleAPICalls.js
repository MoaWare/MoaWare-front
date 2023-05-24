import { getSchedule } from "../modules/ScheduleMoule";

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
            dispatch(getSchedule(result));
        }
    }

}