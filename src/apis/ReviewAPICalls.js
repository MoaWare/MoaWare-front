import { getReviews } from "../modules/ReviewModule";

const SERVER_IP = `${process.env.REACT_APP_RESTAPI_SERVER_IP}`;
const SERVER_PORT = `${process.env.REACT_APP_RESTAPI_SERVER_PORT}`;
const PRE_URL = `http://${SERVER_IP}:${SERVER_PORT}/reivew`;


/* 댓글 조회 */
export const callReviewsAPI = (taskCode) => {

    const requestURL = `${PRE_URL}/task/${taskCode}`;
  
    return async (dispatch, getState) => {
  
        const result = await fetch(requestURL, {
          method : "GET",
          headers : {
              "Content-Type" : "application/json",
          },
        }).then(res => res.json());
  
        if(result?.status === 200){
            console.log(result);
            dispatch(getReviews(result));
        } else if(result?.status === 400){
          alert(result.message);
        }
    }
  }
  
  