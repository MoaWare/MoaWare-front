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
    const [ isSwitchOn, setSwitchOn ] = useState(false);

    // console.log("task" , task);
    // console.log("reviews" , reviews);
    // console.log("reviews" , review);
    console.log("taskCode" , taskCode);
    
    useEffect(()=> {
      if(isSwitchOn){
        dispatch(callReviewsAPI(taskCode));
        setSwitchOn(false);
        // console.log("isSwitchOn===========================",isSwitchOn);
      }
    },[isSwitchOn]);
 

    const onReviewChangeHandler = (e) => {

        setReview((prevForm) => ({
            ...prevForm,
            [e.target.name] : e.target.value,
            }
        ));
        // console.log(review);
    }

    
    /* 댓글 등록 및 재조회 */
    const handleSubmitContent = async (e) => {
            
      try{
        
        await dispatch(callReviewsRegistAPI(review));
                console.log('여기에서 에러가 나나요?');
        dispatch(callReviewsAPI(review?.task?.taskCode));
                console.log('여기에서 에러가 나나요?');

        setReview({
          content: '', 
          task: task,
        });

        // console.log(review);

        toast.success('댓글 등록 ', {
          position: toast.POSITION.TOP_CENTER, // 토스트 위치 
          autoClose: 2000, 
          hideProgressBar: false, 
        });

      } catch (error) {
        
        toast.error('댓글 등록 오류 '+ error, {
          position: toast.POSITION.TOP_CENTER, 
          autoClose: 2000, 
          hideProgressBar: false, 
          progressStyle: {
            backgroundColor: '#ff000074', 
            height: '5px', 
          },
        });
        // console.log(error);
      }

    }


  

    return reviews && (
        <div className={TaskCSS.RightDiv}>
          <div className={TaskCSS.reviewList}>{reviews?.reviewCode}
           { 
              reviews 
                && Array.isArray(reviews) 
                && reviews.map(review => <ReviewItem key={ reviews?.reviewCode } review={review} setSwitchOn={setSwitchOn}/>)
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