import { useEffect, useState } from "react";
import TaskCSS from "../../../form/Task/Task.module.css";
import { useDispatch, useSelector } from "react-redux";
import { callReviewsAPI, callReviewsRegistAPI } from "../../../apis/ReviewAPICalls";
import ReviewItem from "./ReviewItem";
import { toast } from "react-toastify";



function ReviewList({ task, reviews }){


    const dispatch = useDispatch();
    const { regist, put } = useSelector((state) => state.reviewReducer);
    const taskCode = reviews && reviews[0]?.task?.taskCode;
    const [ review, setReview ] = useState({
        content : '',
        task : task,
      });


    const onReviewChangeHandler = (e) => {

        setReview((prevForm) => ({
            ...prevForm,
            [e.target.name] : e.target.value,
            }
        ));
    }

    
    /* 댓글 등록 및 재조회 */
    const handleSubmitContent = () => {
            
        dispatch(callReviewsRegistAPI(review));

        toast.success('댓글 등록 ', {
          position: toast.POSITION.TOP_CENTER, 
          autoClose: 2000, 
          hideProgressBar: false, 
        });   

        setReview({
          content: '', 
          task: task,
        });
      } 
    
  

    return reviews && (
        <div className={TaskCSS.RightDiv}>
          <div className={TaskCSS.reviewList}>{reviews?.reviewCode}
           { 
              reviews 
                && Array.isArray(reviews) 
                && reviews.map((review, index, array) => <ReviewItem review={review} />)
           }
          </div> 
          <div className={TaskCSS.reviewWrite}>
            <textarea name="content" value={review?.content} onChange={onReviewChangeHandler} className={TaskCSS.textbox}/>
            <button className={TaskCSS.writeBtn} onClick={handleSubmitContent}>등록</button>
          </div>
        </div>
      );

}

export default ReviewList;