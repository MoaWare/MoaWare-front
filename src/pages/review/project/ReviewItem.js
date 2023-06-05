import { useDispatch, useSelector } from "react-redux";
import TaskCSS from "../../../form/Task/Task.module.css";
import { getMemberId } from "../../../utils/TokenUtils";
import moment from "moment";
import { callReviewDelete, callReviewUpdateAPI } from "../../../apis/ReviewAPICalls";
import { useEffect, useState } from "react";
import { BsFillArrowUpCircleFill, BsPersonCircle } from "react-icons/bs";
import { toast } from "react-toastify";



function ReviewItem({ review }){


    const dispatch = useDispatch();
    const date = review && moment(review?.modifyDate || review?.date ).format("YYYY.MM.DD HH:mm:ss");
    const [ form, setForm ] = useState({
        content : "",
        task : {},
        emp : {}
    });
    /* 수정모드 전환 */
    const [ modifyMode, setModifyMode ] = useState(false);


    useEffect(()=>{
        if(review){
            setForm({
                content : review.content,
                task : review.task,
                emp : review.emp,
                reviewCode : review.reviewCode
            });
        }
    },[]);


    const onClickUpdate = () => {

        setModifyMode(true);
    }

    const onClickDelete = (setSwitchOn) => {

        if(window.confirm('댓글을 삭제하시겠습니까?')){

            if(getMemberId() === review.emp.empID){
                dispatch(callReviewDelete(review?.reviewCode));
            } else {
                toast.error('최초 작성자만 삭제가 가능합니다.', {
                    position: toast.POSITION.TOP_CENTER, 
                    autoClose: 2000, 
                    hideProgressBar: false, 
                    progressStyle: {
                      backgroundColor: '#ff000074', 
                      height: '5px', 
                    },
                  });
            }
        };
    }


    const onChangeHandler = (e) => {

        setForm((prevForm) => ({
            ...prevForm,
            [e.target.name] : e.target.value,
            }
        ));
    }

    async function onUpdateSubmit (){

        try{
            await dispatch(callReviewUpdateAPI({form}));
    
            setForm({
              content: '', 
              task: review && review.task
            });

            setModifyMode(false);
    
            toast.success('댓글 수정 ', {
              position: toast.POSITION.TOP_CENTER, 
              autoClose: 2000, 
              hideProgressBar: false, 
            });
    
          } catch (error) {
            
            toast.error('댓글 수정 오류 '+ error, {
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
    


    return review && 

        (
            <div className={TaskCSS.reviewItem} key={review.reviewCode}>
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
                    { 
                        !modifyMode && 
                            ( getMemberId() === review.emp.empID ? 
                                <div className={TaskCSS.listBtn}>
                                    <button onClick={ onClickUpdate }>수정</button>
                                    <button onClick={ onClickDelete }>삭제</button> 
                                </div>
                            : null )
                        }
                </div>
                { modifyMode && 
                    <div className={TaskCSS.textareaDiv} >
                    <textarea 
                        maxlength="1000"
                        className={TaskCSS.textareaItem} 
                        name="content" 
                        value={form?.content}
                        onChange={onChangeHandler}
                    /> 
                    <BsFillArrowUpCircleFill className={TaskCSS.textareaBtn}  onClick={onUpdateSubmit}/>
                    </div>}
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