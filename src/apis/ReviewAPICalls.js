import { json } from "react-router-dom";
import { getReviews, postReview, putReview } from "../modules/ReviewModule";

const SERVER_IP = `${process.env.REACT_APP_RESTAPI_SERVER_IP}`;
const SERVER_PORT = `${process.env.REACT_APP_RESTAPI_SERVER_PORT}`;
const PRE_URL = `http://${SERVER_IP}:${SERVER_PORT}/review`;


/* 댓글 조회 */
export const callReviewsAPI = (taskCode) => {

    const requestURL = `${PRE_URL}/${taskCode}`;
  
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
  

  /* 댓글 등록 */
export const callReviewsRegistAPI = (form) => {

    const requestURL = `${PRE_URL}/${form.task.taskCode}`;

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
            dispatch(postReview(result));
        } else if(result?.status === 400){
        alert(result.message);
        }
    }
}
    

/* 댓글 수정 */
export const callReviewUpdateAPI = ({form}) => {

    const requestURL = `${PRE_URL}/update`;

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
            dispatch(putReview(result));
        } else if(result?.status === 400){
        alert(result.message);
        }
    }
}