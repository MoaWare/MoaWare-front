import { getBoardposts, getBoardpost, postBoardpost, putBoardpostdelete, putBoardpost } from "../modules/BoardPostModule";

/* React App에서 .env를 사용할 때는 REACT_APP 접두어가 필요^^;; */
const SERVER_IP = `${process.env.REACT_APP_RESTAPI_SERVER_IP}`;
const SERVER_PORT = `${process.env.REACT_APP_RESTAPI_SERVER_PORT}`;
const PRE_URL = `http://${SERVER_IP}:${SERVER_PORT}/api/b`;




// 전체 조회(사용자)
export const callBoardPostListAPI = ({ currentPage = 1 }) => {

    const requestURL = `${PRE_URL}/boardPosts?page=${currentPage}`;

    return async (dispatch, getState) => {

        //const result = await fetch(requestURL).then(response => response.json());
        const result = await fetch(requestURL, {
            method: 'GET',
            headers: {
                "Authorization": "Bearer " + window.localStorage.getItem('accessToken')
            },
        }).then(response => response.json());

        


        if (result.status === 200) {
            console.log('[BoardPostAPICalls] : callBoardPostListAPI result : ', result);
            dispatch(getBoardposts(result));
        }
    }
}


                //전체 조회(관리자)
                export const callBoardPostListForAdminAPI = ({ currentPage = 1 }) => {

                    const requestURL = `${PRE_URL}/boardPosts-management?page=${currentPage}`;

                    return async (dispatch, getState) => {

                        //const result = await fetch(requestURL).then(response => response.json());
                        const result = await fetch(requestURL, {
                            method: 'GET',
                            headers: {
                                "Authorization": "Bearer " + window.localStorage.getItem('accessToken')
                            },
                        }).then(response => response.json());



                        if (result.status === 200) {
                            console.log('[BoardPostAPICalls] : callBoardPostListForAdminAPI result : ', result);
                            dispatch(getBoardposts(result));
                        }
                    }
                }

// 상세 조회
export const callBoardPostDetailAPI = ({ postCode }) => {

    const requestURL = `${PRE_URL}/boardPosts/${postCode}`;

    return async (dispatch, getState) => {

    //    const result = await fetch(requestURL).then(response => response.json());
    const result = await fetch(requestURL, {
        method: 'GET',
        headers: {
            "Authorization": "Bearer " + window.localStorage.getItem('accessToken')
        },
        }).then(response => response.json());


        if (result.status === 200) {
            console.log("[BoardPostAPICalls] callBoardPostDetailAPI result : ", result);
            dispatch(getBoardpost(result));
        }
    }
}



                    // 관리자(상세 조회) 
                    export const callBoardPostDetailForAdminAPI = ({ postCode }) => {

                        const requestURL = `${PRE_URL}/boardPosts-management/${postCode}`;

                        return async (dispatch, getState) => {

                        
                            const result = await fetch(requestURL, {
                                method: 'GET',
                                headers: {
                                    "Authorization": "Bearer " + window.localStorage.getItem('accessToken')
                                },
                            
                            }).then(response => response.json());
                            

                            if (result.status === 200) {
                                console.log("[BoardPostAPICalls] callBoardPostDetailForAdminAPI result : ", result);
                                dispatch(getBoardpost(result));
                            }
                        }
                    }



// 게시판 코드별 조회
 export const callBoardpostBoardsListAPI = ({ boardCode, currentPage = 1 }) => {

     const requestURL = `${PRE_URL}/boardPosts/boards/${boardCode}?page=${currentPage}`;

     return async (dispatch, getState) => {

        const result = await fetch(requestURL).then(response => response.json());
        // const result = await fetch(requestURL, {
        //     method: 'GET',
        //     headers: {
        //         "Authorization": "Bearer " + window.localStorage.getItem('accessToken')
        //     },
        
        // }).then(response => response.json());

        if (result.status === 200) {
             console.log("[BoardpostAPICalls] callBoardpostBoardsListAPI result : ", result);
             dispatch(getBoardposts(result));
       }
     }
 }





// 게시글 등록
 export const callBoardPostRegistAPI = (formData) => {

    const requestURL = `${PRE_URL}/boardPosts`;
   
    return async (dispatch, getState) => {
   
        // const result = await fetch(requestURL).then(response => response.json())
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
               console.log('[BoardPostAPICalls] : callBoardPostRegistAPI result : ', result);
            dispatch(postBoardpost(result));
            }
       }
    }
 

// 수정
export const callBoardPostUpdateAPI = (formData) => {

    const requestURL = `${PRE_URL}/boardPosts`;

    return async (dispatch, getState) => {


        //const result = await fetch(requestURL).then(response => response.json());
         const result = await fetch(requestURL, {
             method: 'PUT',
             headers: {
                 "Authorization": "Bearer " + window.localStorage.getItem('accessToken')
             },
             body: formData
         }).then(response => response.json());

        if (result.status === 200) {
            console.log('[BoardPostAPICalls] callBoardPostUpdateAPI result :', result);
            dispatch(putBoardpost(result));
        }
    }

}



/* 게시글 삭제 */
export const callBoardPostDeleteAPI =({ postCode }) => {

    const requestURL = `${PRE_URL}/delete/${postCode}`;
  
    console.log(postCode);

    //-----------------------------

    return async (dispatch, getState) => {
  
        const result = await fetch(requestURL, {
          method : "PUT",
          headers : {
              "Content-Type" : "application/json",
          },
        }).then(res => res.json());
  
        if(result?.status === 200){
            console.log("[BoardPostDeleteAPI] callBoardPostDeleteAPI result : ", result);
            dispatch(putBoardpostdelete(result));
        
        }
    }
  }

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


//aaaa
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

