import { getDone, getLeaverequestlist, getRequest, postLeave } from "../modules/LeavePayModule";


const RESTAPI_SERVER_IP = `${ process.env.REACT_APP_RESTAPI_SERVER_IP}`;
const RESTAPI_SERVER_PORT = `${ process.env.REACT_APP_RESTAPI_SERVER_PORT}`
const PRE_URL = `http://${RESTAPI_SERVER_IP}:${RESTAPI_SERVER_PORT}`

export const callSelectMyLeaveListAPI = ( { workDate ,currentPage = 1} ) =>{

    const requestURL = `${PRE_URL}/leave/done/${workDate}?page=${currentPage}`;

    return async (dispatch, getState) => {

        const result = await fetch(requestURL, {
            method : 'GET',
            headers : {
                "Content-Type" : "application/json",
                "Authorization" : "Bearer " + window.localStorage.getItem('accessToken')
            }
        }).then(response => response.json());

        if(result.status === 200){
            dispatch(getDone(result));
        }
        
    }
}

export const callLeaveRequestAPI = (formData) => {

    const requestURL = `${PRE_URL}/leave/request`;


    return async (dispatch, getState) => {

        const result = await fetch(requestURL, {
            method : 'POST',
            headers : {
                "Authorization" : "Bearer " + window.localStorage.getItem('accessToken')
            },
            body : formData
        }).then(response => response.json());

        if(result.status === 200){
            dispatch(postLeave(result));
        }
        
    }
}

export const callMyLeaveRequestListAPI = ({ currentPage = 1}) => {

    const requestURL = `${PRE_URL}/leave/request/list?page=${currentPage}`;

    return async (dispatch, getState) => {

        const result = await fetch(requestURL, {
            method : 'GET',
            headers : {
                "Content-Type" : "application/json",
                "Authorization" : "Bearer " + window.localStorage.getItem('accessToken')
            },
        }).then(response => response.json());

        if(result.status === 200){
            dispatch(getLeaverequestlist(result));
        }
        
    }
}

export const callLeaveRestDetailAPI = ({leaveCode}) => {

    const requestURL = `${PRE_URL}/leave/request/${leaveCode}`;

    return async (dispatch, getState) => {

        const result = await fetch(requestURL, {
            method : 'GET',
            headers : {
                "Content-Type" : "application/json",
                "Authorization" : "Bearer " + window.localStorage.getItem('accessToken')
            },
        }).then(response => response.json());

        if(result.status === 200){
            dispatch(getRequest(result));
        }
        
    }
}