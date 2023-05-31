import { useEffect, useState } from "react";
import TaskCSS from "../../../form/Task/Task.module.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { callReviewsAPI, callReviewsRegistAPI } from "../../../apis/ReviewAPICalls";
import ReviewItem from "./ReviewItem";

function ReviewList({ task, reviews }){


    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { regist } = useSelector((state) => state.reviewReducer);
    const [ review, setReview ] = useState({
        content : "",
        task : task,
      });

    console.log("task" , task);

    const onReviewChangeHandler = (e) => {

        setReview((prevForm) => ({
            ...prevForm,
            [e.target.name] : e.target.value,
            }
        ));
        console.log(review);
    }   

    
    const onRegistClick = () => {

        dispatch(callReviewsRegistAPI(review));
    }


  

    return reviews && (
        <div className={TaskCSS.RightDiv}>
          <div className={TaskCSS.reviewList}>{reviews.reviewCode}
            { 
              Array.isArray(reviews) 
              && reviews.map(reviews => <ReviewItem key={ reviews.reviewCode } review={reviews}/>)
            }
          </div> 
        <div className={TaskCSS.reviewWrite}>
          <textarea name="content" onChange={onReviewChangeHandler} className={TaskCSS.textbox}/>
          <button className={TaskCSS.writeBtn} onClick={onRegistClick}>등록</button>
        </div>
        
    </div>
    );

}

export default ReviewList;