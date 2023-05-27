import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import TaskCSS from './Task.module.css';
import { callTaskDetailAPI } from "../../apis/ProjectAPICalls";
import { useParams } from "react-router-dom";
import { getMemberId } from "../../utils/TokenUtils";


function TaskUpdate() {

    const dispatch = useDispatch();
    const { taskCode } = useParams();
    const { task } = useSelector((state) => state.projectReducer);
    const [ form, setForm ] = useState({
        taskName : "",
        taskNotice : "",
        startDate : "",
        endDate : "",
        type : "",
        stage : "",
        project : {},
    })

    let endDate = '';

            

    useEffect(
        ()=>{
            dispatch(callTaskDetailAPI(taskCode));

            console.log("task------------------------",task)
        },[]
    );

    useEffect(()=>{

        if(task){
            
            setForm({ project : task.project });
            
            const { taskName, taskNotice, startDate, endDate, type, stage } = task;
        
            setForm({ taskName, taskNotice, startDate, endDate, type, stage });
        }
        console.log("from==============================",form);
    },[task]);


    useEffect(()=>{
        
        
        if(task){

            endDate = task.endDate.substring(10,0);

            setForm({ endDate });
        }
        console.log("form.endDate", form?.endDate);

    },[task]);



    const onChangeHandler = (e) => {

        setForm({
            ...form,
            [e.target.name] : e.target.value,
        });

        console.log(form);
    }


    const onClickHandler = () => {

    };


    return task && (
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
                                <button onClick={onClickHandler}>등록</button>
                            </div>
                        </div>
                    </div>
                    <div className={TaskCSS.RightDiv}>
                  <div className={TaskCSS.reviewList}>
                    <div className={TaskCSS.reviewItem}>
                      <div className={TaskCSS.reviewLeft}>

                      </div>
                      <div className={TaskCSS.reviewRight}>
                        <div className={TaskCSS.listTop}>
                          <div className={TaskCSS.listName}>
        
                          </div>
                          <div className={TaskCSS.listDate}>
        
                          </div>
                          <div className={TaskCSS.listBtn}>
                            <button>수정</button>
                            <button>삭제</button>
                          </div>
                        </div>
                        <div className={TaskCSS.listLow}>
                          
                        </div>
                      </div>
                    </div>
                    <div className={TaskCSS.reviewItem}>
                      <div className={TaskCSS.reviewLeft}>

                      </div>
                      <div className={TaskCSS.reviewRight}>
                        <div className={TaskCSS.listTop}>
                          <div className={TaskCSS.listName}>
        
                          </div>
                          <div className={TaskCSS.listDate}>
        
                          </div>
                          <div className={TaskCSS.listBtn}>
                            <button>수정</button>
                            <button>삭제</button>
                          </div>
                        </div>
                        <div className={TaskCSS.listLow}>
                          
                        </div>
                      </div>
                    </div>
                    <div className={TaskCSS.reviewItem}>
                      <div className={TaskCSS.reviewLeft}>

                      </div>
                      <div className={TaskCSS.reviewRight}>
                        <div className={TaskCSS.listTop}>
                          <div className={TaskCSS.listName}>
        
                          </div>
                          <div className={TaskCSS.listDate}>
        
                          </div>
                          <div className={TaskCSS.listBtn}>
                            <button>수정</button>
                            <button>삭제</button>
                          </div>
                        </div>
                        <div className={TaskCSS.listLow}>
                          
                        </div>
                      </div>
                    </div>
                    <div className={TaskCSS.reviewItem}>
                      <div className={TaskCSS.reviewLeft}>

                      </div>
                      <div className={TaskCSS.reviewRight}>
                        <div className={TaskCSS.listTop}>
                          <div className={TaskCSS.listName}>
        
                          </div>
                          <div className={TaskCSS.listDate}>
        
                          </div>
                          <div className={TaskCSS.listBtn}>
                            <button>수정</button>
                            <button>삭제</button>
                          </div>
                        </div>
                        <div className={TaskCSS.listLow}>
                          
                        </div>
                      </div>
                    </div>
                    <div className={TaskCSS.reviewItem}>
                      <div className={TaskCSS.reviewLeft}>

                      </div>
                      <div className={TaskCSS.reviewRight}>
                        <div className={TaskCSS.listTop}>
                          <div className={TaskCSS.listName}>
        
                          </div>
                          <div className={TaskCSS.listDate}>
        
                          </div>
                          <div className={TaskCSS.listBtn}>
                            <button>수정</button>
                            <button>삭제</button>
                          </div>
                        </div>
                        <div className={TaskCSS.listLow}>
                          
                        </div>
                      </div>
                    </div>
                    <div className={TaskCSS.reviewItem}>
                      <div className={TaskCSS.reviewLeft}>

                      </div>
                      <div className={TaskCSS.reviewRight}>
                        <div className={TaskCSS.listTop}>
                          <div className={TaskCSS.listName}>
        
                          </div>
                          <div className={TaskCSS.listDate}>
        
                          </div>
                          <div className={TaskCSS.listBtn}>
                            <button>수정</button>
                            <button>삭제</button>
                          </div>
                        </div>
                        <div className={TaskCSS.listLow}>
                          
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className={TaskCSS.reviewWrite}>
                    <textarea className={TaskCSS.textbox}/>
                    <button className={TaskCSS.writeBtn}>등록</button>
                  </div>
                </div>
            </div>
        </div>
    </div>
    );
}

export default TaskUpdate;
     