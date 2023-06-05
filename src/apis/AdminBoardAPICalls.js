import { getBoards, putBoarddelete, postBoard } from "../modules/BoardModule";

/* React App에서 .env를 사용할 때는 REACT_APP 접두어가 필요^^;; */
const SERVER_IP = `${process.env.REACT_APP_RESTAPI_SERVER_IP}`;
const SERVER_PORT = `${process.env.REACT_APP_RESTAPI_SERVER_PORT}`;
const PRE_URL = `http://${SERVER_IP}:${SERVER_PORT}/admin/board`;

// 전체 조회
export const callAdminBoardListAPI = ({ currentPage = 1 }) => {

    const requestURL = `${PRE_URL}/list?page=${currentPage}`;
    return async (dispatch, getState) => {


        const result = await fetch(requestURL, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                "Authorization": "Bearer " + window.localStorage.getItem('accessToken')
            }
        }).then(response => response.json());


        if (result.status === 200) {
            dispatch(getBoards(result));
        }
    }
}


//  게시판 등록
export const callAdminBoardRegistAPI = (formData) => {

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
            dispatch(postBoard(result));
        }
    }
}




/* 게시글 삭제 */
export const callAdminBoardDeleteAPI = ({ boardCode }) => {

    const requestURL = `${PRE_URL}/delete/${boardCode}`;

    console.log(boardCode);

    return async (dispatch, getState) => {

        const result = await fetch(requestURL, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + window.localStorage.getItem('accessToken')
            },
        }).then(res => res.json());


        if (result?.status === 200) {
            dispatch(putBoarddelete(result));
        }
    }
}