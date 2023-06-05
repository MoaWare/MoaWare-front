import { getYear, postLeave } from "../modules/LeaveModule";


const RESTAPI_SERVER_IP = `${ process.env.REACT_APP_RESTAPI_SERVER_IP}`;
const RESTAPI_SERVER_PORT = `${ process.env.REACT_APP_RESTAPI_SERVER_PORT}`
const PRE_URL = `http://${RESTAPI_SERVER_IP}:${RESTAPI_SERVER_PORT}`


export const callLeaveYearAPI = ({ year }) =>{

    const requestURL = `${PRE_URL}/leave/year/${year}`;

    return async (dispatch, getState) => {

        const result = await fetch(requestURL, {
            method : 'GET',
            headers : {
                "Content-Type" : "application/json",
                "Authorization" : "Bearer " + window.localStorage.getItem('accessToken')
            }
        }).then(response => response.json());

        if(result.status === 200){
            dispatch(getYear(result));
        }
        
    }
}

export const callLeavePostAPI = ({ year }) => {

    const requestURL = `${PRE_URL}/leave/insert`;

    return async (dispatch, getState) => {


        const result = await fetch(requestURL, {
            method : 'POST',
            headers : {
                "Content-Type" : "application/json",
                "Authorization" : "Bearer " + window.localStorage.getItem('accessToken')
            },
            body: year
        }).then(response => response.json());

        if(result.status === 200){
            dispatch(postLeave(result));
        }
        
    }
}