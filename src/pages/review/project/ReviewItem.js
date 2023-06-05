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
    // const data = useSelector(state => state.reviewReducer);
    const date = review && moment(review?.modifyDate || review?.date ).format("YYYY.MM.DD HH:mm:ss");
    // const { put } = useSelector(state => state.reviewReducer);
    const [ form, setForm ] = useState({
        content : "",
        task : {},
        emp : {}
    });
    const userImage = "../../../../public/icon/user.jpg";
    /* 수정모드 전환 */
    const [ modifyMode, setModifyMode ] = useState(false);


    // console.log("review?.modifyTime", review?.modifyDate );
    // console.log("form", form);

    useEffect(()=>{
        if(review){
            setForm({
                content : review.content,
                task : review.task,
                emp : review.emp,
                reviewCode : review.reviewCode
            });
        }
        console.log("review.emp.fileCategory[0].file.filePath",review.emp.fileCategory[0].file.filePath);
    },[]);


    const onClickUpdate = () => {

        setModifyMode(true);
        // setForm({ ...data });
    }

    const onClickDelete = (setSwitchOn) => {

        if(window.confirm('댓글을 삭제하시겠습니까?')){

            if(getMemberId() === review.emp.empID){
                // window.location.reload(); // 새로고침
                console.log('들어왔다 !');
                dispatch(callReviewDelete(review?.reviewCode));
                // setSwitchOn((current) => !current);
            } else {
                alert('최초 작성자만 삭제가 가능합니다.');
            }
        };
    }


    const onChangeHandler = (e) => {

        setForm((prevForm) => ({
            ...prevForm,
            [e.target.name] : e.target.value,
            }
        ));
        console.log("onChangeHandler form", form);
    }

    async function onUpdateSubmit (){

        try{
            console.log("onChangeHandler form", form);

            await dispatch(callReviewUpdateAPI({form}));
    
            setForm({
              content: '', 
              task: review && review.task
            });

            // if(put?.status === 200){
                setModifyMode(false);
                // setSwitchOn((current) => !current);
            // }
            console.log(review);
    
            toast.success('댓글 수정 ', {
              position: toast.POSITION.TOP_CENTER, // 토스트 위치 (옵션)
              autoClose: 2000, // 자동으로 닫히는 시간 (ms) (옵션)
              hideProgressBar: false, // 진행 막대 숨김 여부 (옵션)
            });
    
          } catch (error) {
            
            toast.error('댓글 수정 오류 '+ error, {
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