import { getWorkday } from "../modules/WorkModule";
import { getWorkstatus } from "../modules/WorkStatusModule";

const RESTAPI_SERVER_IP = `${ process.env.REACT_APP_RESTAPI_SERVER_IP}`;
const RESTAPI_SERVER_PORT = `${ process.env.REACT_APP_RESTAPI_SERVER_PORT}`
const PRE_URL = `http://${RESTAPI_SERVER_IP}:${RESTAPI_SERVER_PORT}`


export const callWorkstatusAPI = ({ date }) => {

    const requestURL = `${PRE_URL}/work/status/${date}`;

    return async (dispatch, getState) => {
          const result = await fetch(requestURL, {
            method : 'GET',
            headers : {
                "Content-Type" : "application/json",
                "Authorization" : "Bearer " + window.localStorage.getItem('accessToken')
            }
        }).then(response => response.json());

        if(result.status === 200) {
            console.log("[AdminWorkAPICalls] callWorkstatusAPI result : ", result);
            dispatch(getWorkstatus(result))
        }

    }
}

export const callMyWorkAPI = ({ workDate }) => {

    const requestURL = `${PRE_URL}/work/works/day/${workDate}`;
    
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
            dispatch(getWorkday(result))
        }

    }
}