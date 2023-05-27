import { getProject, getTasks, getDone, getProgress, getDeptlist, getDeptemplist, postProject, getTask, postTask } from "../modules/ProjectModule";

const SERVER_IP = `${process.env.REACT_APP_RESTAPI_SERVER_IP}`;
const SERVER_PORT = `${process.env.REACT_APP_RESTAPI_SERVER_PORT}`;
const PRE_URL = `http://${SERVER_IP}:${SERVER_PORT}/proj`;


/* 프로젝트 업무 리스트 조회 */
export const callProjectAPI = (projCode) => {
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



/* 업무 상세 조회 */
export const callTaskDetailAPI = (taskCode) => {
    const requestURL = `${PRE_URL}/task/${taskCode}`
    return async (dispatch, getState) => {

        const result = await fetch(requestURL).then(res => res.json());

        if(result.status === 200){
            console.log(result);
            dispatch(getTask(result));
        }
    }
}


/* 업무 등록 */
export const callTaskRegistAPI = ( form ) => {

  const requestURL = `${PRE_URL}/task/regist`;

  return async (dispatch, getState) => {

      const result = await fetch(requestURL, {
        method : "POST",
        headers : {
            "Content-Type" : "application/json",
            "Authorization" : "Bearer " + window.localStorage.getItem('accessToken')
        },
        body: JSON.stringify(form)
      }).then(res => res.json());

      if(result?.status === 200){
          console.log(result);

          dispatch(postTask(result));

      } else if(result?.status === 400){
        alert(result.message);
      }
  }
}


/* 업무 등록 */
export const callTaskDeleteAPI = ( taskCode ) => {

  const requestURL = `${PRE_URL}/task/regist`;

  return async (dispatch, getState) => {

      const result = await fetch(requestURL, {
        method : "POST",
        headers : {
            "Content-Type" : "application/json",
            "Authorization" : "Bearer " + window.localStorage.getItem('accessToken')
        },
      }).then(res => res.json());

      if(result?.status === 200){
          console.log(result);

          dispatch(postTask(result));

      } else if(result?.status === 400){
        alert(result.message);
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


export const callDeptEmpListAPI = ({ deptCode }) => {
    const requestURL = `${PRE_URL}/emp/${ deptCode }`
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


export const callProjectRegistAPI = (formData, selectedEmpList) => {
    const requestURL = `${PRE_URL}/createProj`;
    return async (dispatch, getState) => {
      const projMemberArray = selectedEmpList.map((emp, index) => ({
        projMember: {
            projCode: index, 
            projMember: emp.code,
          },
          emp: null,
        }));
    
  
      const formDataJson = {
        ...Object.fromEntries(formData.entries()),
        projMember: projMemberArray,
      };
  
      const result = await fetch(requestURL, {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
          Authorization: 'Bearer ' + window.localStorage.getItem('accessToken'),
        },
        body: JSON.stringify(formDataJson),
      }).then((res) => res.json());
  
      if (result.status === 200) {
        console.log('[ProjectAPICalls] callDeptListAPI result: ', result);
        dispatch(postProject(result));
      }
    };
  };
