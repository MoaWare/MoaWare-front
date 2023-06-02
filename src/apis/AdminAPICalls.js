import { postAdminEmp } from "../modules/AdminModule";
import { getEmployees, getEmployee  } from "../modules/EmployeeModule";

const RESTAPI_SERVER_IP = `${ process.env.REACT_APP_RESTAPI_SERVER_IP}`;
const RESTAPI_SERVER_PORT = `${ process.env.REACT_APP_RESTAPI_SERVER_PORT}`
const PRE_URL = `http://${RESTAPI_SERVER_IP}:${RESTAPI_SERVER_PORT}/admin/emp`



/* 전체 계정(회원) 조회 */ 

export const callAdminEmpListAPI = ({ currentPage = 1 }) => {

    const requestURL = `${PRE_URL}/list?page=${currentPage}`;

    return async (dispatch, getState) => {


        const result = await fetch(requestURL).then(response => response.json());

        // const result = await fetch(requestURL, {
        //     method : 'GET',
        //     headers : {
        //         'Content-Type' : 'application/json',
        //         "Authorization" : "Bearer " + window.localStorage.getItem('accessToken')
        //     },
        // }).then(res => res.json());

        if (result.status === 200) {
            console.log('[AdminAPICalls] : callAdminEmpListAPI result : ', result);
            dispatch(getEmployees(result));
        }
    }
}


// 계정(회원) 상세 조회
export const callAdminEmpDetailAPI = ({ empCode }) => {

    const requestURL = `${PRE_URL}/list/${empCode}`;

    return async (dispatch, getState) => {

    //    const result = await fetch(requestURL).then(response => response.json());
         const result = await fetch(requestURL, {
             method: 'GET',
             headers: {
                 "Authorization": "Bearer " + window.localStorage.getItem('accessToken')
            }
         }).then(response => response.json());
        if (result.status === 200) {
            console.log('[AdminAPICalls] callAdminEmpDetailAPI result : ', result);
            dispatch(getEmployee(result));
        }
    }
}


//  계정(회원) 등록
export const callAdminEmpRegistAPI = (formData) => {

    const requestURL = `${PRE_URL}/regist`;
   
    return async (dispatch, getState) => {
   
    const result = await fetch(requestURL, {
                method: 'POST',
               headers: {
                   "Authorization": "Bearer " + window.localStorage.getItem('accessToken')
               },
                body: formData
             }).then(response => response.json()); 
        //      body : JSON.stringify(formData)
        //   }) .then(response => response.json());
   
           if (result.status === 200) {
               console.log('[AdminEmpAPICalls] : callAdminEmpRegistAPI result : ', result);
            dispatch(postAdminEmp(result));
            }
       }
    }


































    //------------------------------------------------------------------------------