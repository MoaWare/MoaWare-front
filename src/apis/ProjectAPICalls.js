import { getProject, getTasks, getDone, getProgress, getDeptlist, getDeptemplist, postProject, getTask, postTask, putTask, deleteTask, putProjdelete } from "../modules/ProjectModule";
import { toast } from "react-toastify";



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

        const result = await fetch(requestURL, {
          method : 'GET',
            headers : {
                "Content-Type" : "application/json",
                "Authorization" : "Bearer " + window.localStorage.getItem('accessToken')
            }
        }).then(res => res.json());

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
        toast.error(result.message, {
          position: toast.POSITION.TOP_CENTER, 
          autoClose: 2000, 
          hideProgressBar: false, 
          progressStyle: {
            backgroundColor: '#ff000074', 
            height: '5px', 
          },
        });
      }
  }
}

/* 업무 수정 */
export const callTaskUpdateAPI = ( form ) => {

  const requestURL = `${PRE_URL}/task/update`;

  return async (dispatch, getState) => {

      const result = await fetch(requestURL, {
        method : "PUT",
        headers : {
            "Content-Type" : "application/json",
            "Authorization" : "Bearer " + window.localStorage.getItem('accessToken')
        },
        body: JSON.stringify(form)
      }).then(res => res.json());

      if(result?.status === 200){
          console.log(result);
          dispatch(putTask(result));
      } else if(result?.status === 400){
        toast.error(result.message, {
          position: toast.POSITION.TOP_CENTER, 
          autoClose: 2000, 
          hideProgressBar: false, 
          progressStyle: {
            backgroundColor: '#ff000074', 
            height: '5px', 
          },
        });
      }
  }
}


/* 업무 삭제 */
export const callTaskDeleteAPI = ( taskCode ) => {

  const requestURL = `${PRE_URL}/task/delete/${taskCode}`;

  return async (dispatch, getState) => {

      const result = await fetch(requestURL, {
        method : "PUT",
        headers : {
            "Content-Type" : "application/json",
            "Authorization" : "Bearer " + window.localStorage.getItem('accessToken')
        },
      }).then(res => res.json());

      if(result?.status === 200){
          console.log(result);
          dispatch(deleteTask(result));
      } else if(result?.status === 400){
        toast.error(result.message, {
          position: toast.POSITION.TOP_CENTER, 
          autoClose: 2000, 
          hideProgressBar: false, 
          progressStyle: {
            backgroundColor: '#ff000074', 
            height: '5px', 
          },
        });
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
    const requestURL = `${PRE_URL}/doneProj?page=${currentPage}`;
  
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
  






export const callDeptEmpListAPI = ({ deptCode }) => {
    const requestURL = `${PRE_URL}/emp/${ deptCode }`
    return async (dispatch, getState) => {

        const result = await fetch(requestURL, {
            method : 'GET',
            headers : {
                "Content-Type" : "application/json",
                "Authorization" : "Bearer " + window.localStorage.getItem('accessToken')
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

export const callPorjectDeleteAPI = ({projCode}) => {

  const requestURL = `${PRE_URL}/delete/${projCode}`

  console.log(projCode);

  return async (dispatch, getState) => {

    const result = await fetch(requestURL, {
        method : 'PUT',
        headers : {
            "Content-Type" : "application/json",
            "Authorization" : "Bearer " + window.localStorage.getItem('accessToken')
        }
    }).then(res => res.json());

    if(result.status === 200){
        console.log("[ProjectAPICalls] callPorjectDeleteAPI result : ", result);
        dispatch(putProjdelete(result));
    }
  }
}