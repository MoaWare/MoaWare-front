import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import TaskCSS from './Task.module.css';
import { callTaskDeleteAPI, callTaskDetailAPI } from "../../apis/ProjectAPICalls";
import { Link, NavLink, Navigate, useNavigate, useParams } from "react-router-dom";
import { getMemberId } from "../../utils/TokenUtils";


function TaskDetail() {


    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { taskCode } = useParams();
    const { task , del } = useSelector(state => state.projectReducer);
    const [ stage, setStage ] = useState('');
    const [ type, setType ] = useState('');
    let projCode = '';


    useEffect(
        ()=>{
            dispatch(callTaskDetailAPI(taskCode));
        },[]
    );

    useEffect(() => {   
      
        if(task){
          switch (task.stage) {
            case 'todo':
              setStage(<span>해야할 일</span>);
              break;
            case 'ing':
              setStage(<span>진행 중</span>);
              break;
            case 'done':
              setStage(<span>완료됨</span>);
              break;
            default:
              setStage(<span>상태 없음</span>);
              break;
          }}

          if(task){
            switch (task.type) {
              case 'plan':
                setType(<span>기획</span>);
                break;
              case 'design':
                setType(<span>설계</span>);
                break;
              case 'test':
                setType(<span>테스트</span>);
                break;
              case 'dev':
                setType(<span>개발</span>);
                break;
              case 'pre':
                setType(<span>시연</span>);
                break;
              default:
                setType(<span>상태 없음</span>);
                break;
            }}

      },[task]);



      useEffect(()=>{
        if(del?.status === 200){
          alert(del.message);
          // navigate(`/task/${form.project.projCode}`);
        }
      },[del]);


      const deleteBtn = () => {

        if(window.confirm(`'${task?.taskName}' 업무를 삭제하시겠습니까?`)) {
          dispatch(callTaskDeleteAPI(task?.taskCode));
        }
      };

      const updateClick = () => {
        navigate(`/task/${task.project.projCode}/update/${task.taskCode}`);
      }
      

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
                                            <td className={TaskCSS.tableBorder}>{ task?.taskName }</td>
                                        </tr>
                                        <tr className={TaskCSS.tableTaskStartDate}>
                                            <td className={TaskCSS.tableTitle}>업무시작</td>
                                            <td className={TaskCSS.tableBorder}>{ task?.startDate.substring(10,0) }</td>
                                        </tr>
                                        <tr className={TaskCSS.tableTaskEndDate}>
                                            <td className={TaskCSS.tableTitle}>업무종료</td>
                                            <td className={TaskCSS.tableBorder}>{ task?.endDate.substring(10,0) }</td>
                                        </tr>
                                        <tr className={TaskCSS.tableTaskStage}>
                                            <td className={TaskCSS.tableTitle}>진행단계</td>
                                            <td className={TaskCSS.tableBorder}>{ stage }</td>
                                        </tr>
                                        <tr>
                                            <td className={TaskCSS.tableType}>업무단계</td>
                                            <td className={TaskCSS.tableBorder}>{ type }</td>
                                        </tr>
                                        <tr className={TaskCSS.tableTaskNotice}>
                                            <td className={TaskCSS.tableTitle}>공지사항</td>
                                            <td className={TaskCSS.tableBorder}>{ task?.taskNotice }</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div className={TaskCSS.btn}>
                                { getMemberId() === task?.author?.empID && (<button onClick={ updateClick }>수정</button>) }
                                { getMemberId() === task?.author?.empID && (<button onClick={ deleteBtn }>삭제</button>) }
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

export default TaskDetail;
     