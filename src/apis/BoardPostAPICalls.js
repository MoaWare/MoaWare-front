import { getBoardPosts } from "../modules/BoardPostModule";

/* React App에서 .env를 사용할 때는 REACT_APP 접두어가 필요^^;; */
const SERVER_IP = `${process.env.REACT_APP_RESTAPI_SERVER_IP}`;
const SERVER_PORT = `${process.env.REACT_APP_RESTAPI_SERVER_PORT}`;
const PRE_URL = `http://${SERVER_IP}:${SERVER_PORT}/api/v1`;

export const callBoardPostListAPI = ({ currentPage = 1 }) => {

    const requestURL = `${PRE_URL}/boardPosts?page=${currentPage}`;

    return async (dispatch, getState) => {

        const result = await fetch(requestURL).then(response => response.json());

        if (result.status === 200) {
            console.log('[BoardPostAPICalls] : callBoardPostListAPI result : ', result);
            dispatch(getBoardPosts(result));
        }
    }
}
// export const callBoardpostBoardsListAPI = ({ boardCode, currentPage = 1 }) => {

//     const requestURL = `${PRE_URL}/boardposts/boards/${boardCode}?page=${currentPage}`;

//     return async (dispatch, getState) => {

//         const result = await fetch(requestURL).then(response => response.json());

//         if (result.status === 200) {
//             console.log("[BoardpostAPICalls] callBoardpostBoardsListAPI result : ", result);
//             dispatch(getBoardPosts(result));
//         }
//     }
// }

// export const callBoardpostSearchListAPI = ({ search, currentPage = 1 }) => {

//     const requestURL = `${PRE_URL}/boardposts/search?search=${search}&page=${currentPage}`;

//     return async (dispatch, getState) => {

//         const result = await fetch(requestURL).then(response => response.json());

//         if (result.status === 200) {
//             console.log("[BoardpostAPICalls] call[BoardpostSearchListAPI result : ", result);
//             dispatch(getBoardPosts(result));
//         }
//     }
// }

// export const callBoardPostDetailAPI = ({ postCode }) => {

//     const requestURL = `${PRE_URL}/boardPosts/${postCode}`;

//     return async (dispatch, getState) => {

//         const result = await fetch(requestURL).then(response => response.json());

//         if (result.status === 200) {
//             console.log("[BoardPostAPICalls] callBoardPostDetailAPI result : ", result);
//             dispatch(getBoardPost(result));
//         }
//     }
// }

// export const callBoardPostListForAdminAPI = ({ currentPage = 1 }) => {

//     const requestURL = `${PRE_URL}/boardPosts-management?page=${currentPage}`;

//     return async (dispatch, getState) => {

//         const result = await fetch(requestURL, {
//             method: 'GET',
//             headers: {
//                 "Content-Type": "application/json",
//                 "Authorization": "Bearer " + window.localStorage.getItem('accessToken')
//             }
//         }).then(response => response.json());

//         if (result.status === 200) {
//             console.log('[BoardPostAPICalls] : callBoardPostListForAdminAPI result : ', result);
//             dispatch(getBoardPosts(result));
//         }
//     }
// }

// export const callBoardPostRegistAPI = (formData) => {

//     const requestURL = `${PRE_URL}/boardPosts`;

//     return async (dispatch, getState) => {

//         const result = await fetch(requestURL, {
//             method: 'POST',
//             headers: {
//                 "Authorization": "Bearer " + window.localStorage.getItem('accessToken')
//             },
//             body: formData
//         }).then(response => response.json());

//         if (result.status === 200) {
//             console.log('[BoardPostAPICalls] : callBoardPostRegistAPI result : ', result);
//             dispatch(postBoardPost(result));
//         }
//     }
// }

// export const callBoardPostDetailForAdminAPI = ({ postCode }) => {

//     const requestURL = `${PRE_URL}/boardPosts-management/${postCode}`;

//     return async (dispatch, getState) => {

//         const result = await fetch(requestURL, {
//             method: 'GET',
//             headers: {
//                 "Authorization": "Bearer " + window.localStorage.getItem('accessToken')
//             }
//         }).then(response => response.json());

//         if (result.status === 200) {
//             console.log("[BoardPostAPICalls] callBoardPostDetailForAdminAPI result : ", result);
//             dispatch(getBoardPost(result));
//         }
//     }
// }

// export const callBoardPostUpdateAPI = (formData) => {

//     const requestURL = `${PRE_URL}/boardPosts`;

//     return async (dispatch, getState) => {

//         const result = await fetch(requestURL, {
//             method: 'PUT',
//             headers: {
//                 "Authorization": "Bearer " + window.localStorage.getItem('accessToken')
//             },
//             body: formData
//         }).then(response => response.json());

//         if (result.status === 200) {
//             console.log('[BoardPostAPICalls] callBoardPostUpdateAPI result :', result);
//             dispatch(putBoardPost(result));
//         }
//     }

// }

