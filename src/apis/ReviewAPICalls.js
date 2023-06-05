import { json } from "react-router-dom";
import { deleteReview, getReviews, postReview, putReview } from "../modules/ReviewModule";
import { toast } from "react-toastify";



const SERVER_IP = `${process.env.REACT_APP_RESTAPI_SERVER_IP}`;
const SERVER_PORT = `${process.env.REACT_APP_RESTAPI_SERVER_PORT}`;
const PRE_URL = `http://${SERVER_IP}:${SERVER_PORT}/review`;


/* 댓글 조회 */
export const callReviewsAPI = ({taskCode}) => {

    const requestURL = `${PRE_URL}/${taskCode}`;
  
    return async (dispatch, getState) => {
  
        const result = await fetch(requestURL, {
          method : "GET",
          headers : {
              "Content-Type" : "application/json",
              "Authorization" : "Bearer " + window.localStorage.getItem('accessToken')
          },
        }).then(res => res.json());
  
        if(result?.status === 200){
            dispatch(getReviews(result));
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
            dispatch(postReview(result));
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
            dispatch(putReview(result));
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

/* 댓글 삭제 */
export const callReviewDelete = ( reviewCode ) => {

    const requestURL = `${PRE_URL}/delete/${reviewCode}`;

    return async (dispatch, getState) => {

        const result = await fetch(requestURL, {
        method : "PUT",
        headers : {
            "Content-Type" : "application/json",
            "Authorization" : "Bearer " + window.localStorage.getItem('accessToken')
        },
        }).then(res => res.json());

        if(result?.status === 200){
            dispatch(deleteReview(result));
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