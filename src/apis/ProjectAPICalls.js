import { getProject, getTaskDone, getTaskIng, getTaskTodo, getTasks, getDone, getProgress, getDeptlist, getDeptemplist } from "../modules/ProjectModule";

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










































































export const callProjectProgressListAPI = ({ currentPage = 1 }) => {
    const requestURL = `${PRE_URL}/progressProj?page=${currentPage}`;
  
    return async (dispatch, getState) => {
      const result = await fetch(requestURL, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + window.localStorage.getItem("accessToken"),
        },
      }).then((response) => response.json());
  
      if (result.status === 200) {
        console.log("[ProjectAPICalls] callProjectProgressListAPI result : ", result);
  
        dispatch(getProgress(result));
      }
    };
  };



  export const callProjectDoneListAPI = ({ currentPage = 1 }) => {
    const requestURL = `${PRE_URL}/progress?page=${currentPage}`;
  
    return async (dispatch, getState) => {
      const result = await fetch(requestURL, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + window.localStorage.getItem("accessToken"),
        },
      }).then((response) => response.json());
  
      if (result.status === 200) {
        console.log("[ProjectAPICalls] callProjectDoneListAPI result : ", result);
  
        dispatch(getDone(result));
      }
    };
  };
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


export const callDeptListAPI = () => {
    const requestURL = `${PRE_URL}/dept`
    return async (dispatch, getState) => {

        const result = await fetch(requestURL, {
            method : 'GET',
            headers : {
                "Content-Type" : "application/json",
            }
        }).then(res => res.json());

        if(result.status === 200){
            console.log("[ProjectAPICalls] callDeptListAPI result : ", result);
            dispatch(getDeptlist(result));
        }
    }
}


export const callDeptEmpListAPI = ({ deptName }) => {
    const requestURL = `${PRE_URL}/emp/${ deptName }`
    return async (dispatch, getState) => {

        const result = await fetch(requestURL, {
            method : 'GET',
            headers : {
                "Content-Type" : "application/json",
            }
        }).then(res => res.json());

        if(result.status === 200){
            console.log("[ProjectAPICalls] callDeptListAPI result : ", result);
            dispatch(getDeptemplist(result));
        }
    }
}