import { getProject, getTaskDone, getTaskIng, getTaskTodo, getTasks } from "../modules/ProjectModule";
import { CallOrganizationSubListAPI } from "./OrganizationAPICalls";

const SERVER_IP = `${process.env.REACT_APP_RESTAPI_SERVER_IP}`;
const SERVER_PORT = `${process.env.REACT_APP_RESTAPI_SERVER_PORT}`;
const PRE_URL = `http://${SERVER_IP}:${SERVER_PORT}/proj`;


/* 프로젝트 업무 리스트 조회 */
export const callProjectAPI = ({projCode}) => {
    const requestURL = `${PRE_URL}/detail/${projCode}`
    return async (dispatch, getState) => {

        const result = await fetch(requestURL, {
            method : 'GET',
            headers : {
                "Content-Type" : "application/json",
                "Authorization" : "Bearer " + window.localStorage.getItem('accessToken')
            }
        }).then(res => res.json());

        if(result.status === 200){
            console.log(result);
            dispatch(getProject(result));
        }
    }
}

/* 프로젝트 업무 리스트 조회 */
export const callTaskListAPI = ({ projCode }) => {
    const requestURL = `${PRE_URL}/tasks/${projCode}`;
    return async (dispatch, getState) => {

        const result = await fetch(requestURL, {
            method : 'GET',
            headers : {
                "Content-Type" : "application/json",
                "Authorization" : "Bearer " + window.localStorage.getItem('accessToken')
            }
        }).then(res => res.json());

        if(result.status === 200){
            console.log(result);
            dispatch(getTasks(result));
        }
    }
}

/* 업무 진행단계별 업무 리스트 조회 */
export const callTaskTodoAPI = ({ projCode }) => {
    const requestURL = `${PRE_URL}/task/stage/${projCode}/todo`
    return async (dispatch, getState) => {

        const result = await fetch(requestURL, {
            method : 'GET',
            headers : {
                "Content-Type" : "application/json",
                "Authorization" : "Bearer " + window.localStorage.getItem('accessToken')
            }
        }).then(res => res.json());

        if(result.status === 200){
            console.log(result);
            dispatch(getTaskTodo(result));
        }
    }
}


/* 업무 진행단계별 업무 리스트 조회 */
export const callTaskIngAPI = ({ projCode }) => {
    const requestURL = `${PRE_URL}/task/stage/${projCode}/ing`
    return async (dispatch, getState) => {

        const result = await fetch(requestURL, {
            method : 'GET',
            headers : {
                "Content-Type" : "application/json",
                "Authorization" : "Bearer " + window.localStorage.getItem('accessToken')
            }
        }).then(res => res.json());

        if(result.status === 200){
            console.log(result);
            dispatch(getTaskIng(result));
        }
    }
}


/* 업무 진행단계별 업무 리스트 조회 */
export const callTaskDoneAPI = ({ projCode }) => {
    const requestURL = `${PRE_URL}/task/stage/${projCode}/done`
    return async (dispatch, getState) => {

        const result = await fetch(requestURL, {
            method : 'GET',
            headers : {
                "Content-Type" : "application/json",
                "Authorization" : "Bearer " + window.localStorage.getItem('accessToken')
            }
        }).then(res => res.json());

        if(result.status === 200){
            console.log(result);
            dispatch(getTaskDone(result));
        }
    }
}