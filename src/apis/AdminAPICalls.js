import { postAdminEmp, putAdminEmp, putAdminEmpdelete } from "../modules/AdminModule";
import { getEmployees, getEmployee } from "../modules/EmployeeModule";

const RESTAPI_SERVER_IP = `${process.env.REACT_APP_RESTAPI_SERVER_IP}`;
const RESTAPI_SERVER_PORT = `${process.env.REACT_APP_RESTAPI_SERVER_PORT}`
const PRE_URL = `http://${RESTAPI_SERVER_IP}:${RESTAPI_SERVER_PORT}/admin/emp`



/* 전체 계정(회원) 조회 */
export const callAdminEmpListAPI = ({ currentPage = 1 }) => {

    const requestURL = `${PRE_URL}/list?page=${currentPage}`;
    return async (dispatch, getState) => {

        const result = await fetch(requestURL, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                "Authorization": "Bearer " + window.localStorage.getItem('accessToken')
            },
        }).then(res => res.json());


        if (result.status === 200) {
            dispatch(getEmployees(result));
        }
    }
}


// 계정(회원) 상세 조회
export const callAdminEmpDetailAPI = ({ empCode }) => {

    const requestURL = `${PRE_URL}/list/${empCode}`;
    return async (dispatch, getState) => {

        const result = await fetch(requestURL, {
            method: 'GET',
            headers: {
                "Authorization": "Bearer " + window.localStorage.getItem('accessToken')
            }
        }).then(response => response.json());


        if (result.status === 200) {
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

        if (result.status === 200) {
            dispatch(postAdminEmp(result));
        }
    }
}



/*계정(직원) 퇴직 처리 */
export const callAdminEmpDeleteAPI = ({ empCode }) => {

    const requestURL = `${PRE_URL}/delete/${empCode}`;

    return async (dispatch, getState) => {

        const result = await fetch(requestURL, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + window.localStorage.getItem('accessToken')

            },
        }).then(res => res.json());


        if (result?.status === 200) {
            dispatch(putAdminEmpdelete(result));

        }
    }
}



// 수정
export const callAdminEmpUpdateAPI = (formData) => {

    const requestURL = `${PRE_URL}/modify`;

    return async (dispatch, getState) => {

        const result = await fetch(requestURL, {
            method: 'PUT',
            headers: {
                "Authorization": "Bearer " + window.localStorage.getItem('accessToken')
            },
            body: formData
        }).then(response => response.json());



        if (result.status === 200) {
            dispatch(putAdminEmp(result));
        }
    }

}





























    //------------------------------------------------------------------------------