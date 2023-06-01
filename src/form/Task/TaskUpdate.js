import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import TaskCSS from './Task.module.css';
import { callTaskDetailAPI, callTaskUpdateAPI } from "../../apis/ProjectAPICalls";
import { useNavigate, useParams } from "react-router-dom";
import { getMemberId } from "../../utils/TokenUtils";
import ReviewItem from "../../pages/review/project/ReviewItem";
import { callReviewsAPI } from "../../apis/ReviewAPICalls";
import ReviewList from "../../pages/review/project/ReviewList";


function TaskUpdate() {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { taskCode } = useParams();
    const { reviews } = useSelector((state) => state.reviewReducer );
    const { task, put } = useSelector((state) => state.projectReducer);
    const [ form, setForm ] = useState({
      taskCode : "",
      taskName : "",
      taskNotice : "",
      startDate : "",
      endDate : "",
      type : "",
      stage : "",
      project : {},
    });


    let endDate = '';

            

    useEffect(()=>{
        
      dispatch(callTaskDetailAPI(taskCode));
      console.log("task------------------------",task);
    
    },[]);


    
    useEffect(()=>{

      dispatch(callReviewsAPI(taskCode));

    },[]);


    useEffect(()=>{
        
        if(task){

          endDate = task.project.endDate.substring(10,0);
          console.log("endDate ------------------------------", endDate);

          setForm((init) => ({
              ...init,
              project: task.project,
              taskCode: task.taskCode,
              taskName: task.taskName,
              taskNotice: task.taskNotice,
              startDate: task.startDate.substring(10,0),
              endDate: task.endDate.substring(10,0),
              type: task.type,
              stage: task.stage,
            }));
          }
        console.log("form ------------------------------",form);

    },[  ,task]);


    useEffect(() => {
        if(put?.status === 200){
            alert(put.message);
            navigate(`/task/${form?.project?.projCode}`);
        }   
    },[put]);






    const onChangeHandler = (e) => {

        setForm((prevForm) => ({
            ...prevForm,
            [e.target.name] : e.target.value,
        }));

        console.log(form);
    }


    const onClickHandler = () => {

        if(getMemberId() === task.author.empID){
            dispatch(callTaskUpdateAPI( form ));
        } else {
            alert('최초 작성자만 수정이 가능합니다.');
            navigate(-1);
        }
    };



    return  reviews && (
        <div className={TaskCSS.wrapper}>
            <div className={TaskCSS.wrap}>
                <div className={TaskCSS.mainTitle}>
                    업무 관리
                </div>
                <div className={TaskCSS.mainContent}>
                    <div className={TaskCSS.leftDiv}>
                        <div className={TaskCSS.leftTitle}>
                            <p className={TaskCSS.projTitlebold}>프로젝트 명</p>
                            <span className={TaskCSS.projTitle}>{ task?.project?.projName }</span>
                        </div>  
                        <div className={TaskCSS.leftContent}>
                            <div className={TaskCSS.tableDiv}>
                                <table className={TaskCSS.leftTable}>
                                    <tbody className={TaskCSS.tableTbody}>
                                        <tr className={TaskCSS.tableTaskName}>
                                            <td className={TaskCSS.tableTitle}>업무명</td>
                                            <td className={TaskCSS.tableBorder}>
                                                <input 
                                                    className={TaskCSS.inputbox}
                                                    type="text" 
                                                    name="taskName"
                                                    value={form?.taskName}
                                                    onChange={onChangeHandler}
                                                />
                                            </td>
                                        </tr>
                                        <tr className={TaskCSS.tableTaskStartDate}>
                                            <td className={TaskCSS.tableTitle}>업무시작</td>
                                            <td className={TaskCSS.tableBorder}>
                                            <input 
                                                className={TaskCSS.inputbox}
                                                type="date" 
                                                name="startDate"
                                                max={endDate}
                                                value={form?.startDate}
                                                onChange={onChangeHandler}
                                            />
                                            </td>
                                        </tr>
                                        <tr className={TaskCSS.tableTaskEndDate}>
                                            <td className={TaskCSS.tableTitle}>업무종료</td>
                                            <td className={TaskCSS.tableBorder}>
                                                <input 
                                                    className={TaskCSS.inputbox}
                                                    type="date" 
                                                    name="endDate"
                                                    min={form?.startDate}
                                                    max={endDate}
                                                    value={form?.endDate}
                                                    onChange={onChangeHandler}
                                                />
                                            </td>
                                        </tr>
                                        <tr className={TaskCSS.tableTaskStage}>
                                            <td className={TaskCSS.tableTitle}>진행단계</td>
                                            <td className={TaskCSS.tableBorder}>
                                                <select value={task?.stage} name="stage" onChange={onChangeHandler}>
                                                    <option value="todo">해야할 일</option>
                                                    <option value="ing">진행중</option>
                                                    <option value="done">완료</option>
                                                </select>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className={TaskCSS.tableType}>업무단계</td>
                                            <td className={TaskCSS.tableBorder}>
                                                <select value={task?.type} name="type" onChange={onChangeHandler}>
                                                    <option value="plan">기획</option>
                                                    <option value="design">설계</option>
                                                    <option value="test">테스트</option>
                                                    <option value="dev">개발</option>
                                                    <option value="pre">시연</option>
                                                </select>
                                            </td>
                                        </tr>
                                        <tr className={TaskCSS.tableTaskNotice}>
                                            <td className={TaskCSS.tableTitle}>공지사항</td>
                                            <td className={TaskCSS.tableBorder}>
                                                <textarea 
                                                    value={form?.taskNotice}
                                                    className={TaskCSS.tableTextbox}
                                                    name="taskNotice"
                                                    onChange={onChangeHandler}
                                                />
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div className={TaskCSS.btnMargin}>
                                <button onClick={onClickHandler}>변 경</button>
                            </div>
                        </div>
                    </div>
                <ReviewList task={task} reviews={reviews} /> 
            </div>
        </div>
    </div>
    );
}

export default TaskUpdate;
     