import { useDispatch, useSelector } from "react-redux";
import TaskCSS from "../../../form/Task/Task.module.css";
import { getMemberId } from "../../../utils/TokenUtils";
import moment from "moment";
import { callReviewUpdateAPI, callReviewsAPI, callReviewsRegistAPI } from "../../../apis/ReviewAPICalls";
import { useEffect, useState } from "react";
import { BsPersonCircle } from "react-icons/bs";
import { toast } from "react-toastify";


function ReviewItem({review}){


    const dispatch = useDispatch();
    const data = useSelector(state => state.reviewReducer);

    const date = moment(review.date || review.modifyTime).format("YYYY.MM.DD HH:mm:ss");
    const [ form, setForm ] = useState({
        content : "",
        task : {}
    });
    const [ modifyMode, setModifyMode ] = useState(false);


    console.log("review", review);
    console.log("form", form);

    useEffect(()=>{
        if(review){
            setForm({
                content : review?.content,
                task : review && review.task
            })}
    },[]);


    const onClickUpdate = () => {
        setModifyMode(true);
        // setForm({ ...data });
    }

    const onClickDelete = () => {
        
    }


    const onChangeHandler = (e) => {

        setForm((prevForm) => ({
            ...prevForm,
            [e.target.name] : e.target.value,
            }
        ));
        console.log("onChangeHandler form", form);
    }

    async function onReviewSubmit (){

        try{
            console.log("onChangeHandler form", form);

            await dispatch(callReviewUpdateAPI({form}));
            // dispatch(callReviewsAPI(taskCode));
    
            // setForm({
            //   content: '', 
            //   task: review && review.task
            // });
            setModifyMode(false);
    
            console.log(review);
    
            toast.success('댓글 등록 ', {
              position: toast.POSITION.TOP_CENTER, // 토스트 위치 (옵션)
              autoClose: 2000, // 자동으로 닫히는 시간 (ms) (옵션)
              hideProgressBar: false, // 진행 막대 숨김 여부 (옵션)
            });
    
          } catch (error) {
            
            toast.error('댓글 등록 오류 '+ error, {
              position: toast.POSITION.TOP_CENTER, // 토스트 위치 (옵션)
              autoClose: 2000, // 자동으로 닫히는 시간 (ms) (옵션)
              hideProgressBar: false, // 진행 막대 숨김 여부 (옵션)
              progressStyle: {
                backgroundColor: '#ff000074', // 프로그레스 바 배경색
                height: '5px', // 프로그레스 바 
              },
            });
            console.log(error);
          }
        }
    


    return review && 

        (
            <div className={TaskCSS.reviewItem}>
                <div className={TaskCSS.reviewLeft}>
                    <img src={review.emp.fileCategory[0].file.filePath || <BsPersonCircle />}  alt="profile"/>
                </div>
                <div className={TaskCSS.reviewRight}>
                <div className={TaskCSS.listTop}>
                    <div className={TaskCSS.listName}>
                        {review.emp.empName}
                    </div>
                    <div className={TaskCSS.listDate}>
                        {date}
                    </div>
                    { !modifyMode && 
                        ( getMemberId() === review.emp.empID ? 
                            <div className={TaskCSS.listBtn}>
                                <button onClick={ onClickUpdate }>수정</button>
                                <button onClick={ onClickDelete }>삭제</button> 
                            </div>
                        : null )}
                </div>
                { modifyMode && 
                    <>
                    <textarea 
                        className={TaskCSS.listLow} 
                        name="content" 
                        value={form?.content}
                        onChange={onChangeHandler}/> 
                    <button onClick={onReviewSubmit}>변경</button>
                    </>}
                { !modifyMode && 
                    <div className={TaskCSS.listLow}>
                        {review.content} 
                    </div>}
                {/* <div className={TaskCSS.listLow}>
                    {review.content} 
                </div> */}
                </div>
            </div>
      );
}

export default ReviewItem;