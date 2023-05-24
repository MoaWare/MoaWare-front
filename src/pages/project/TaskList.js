import { useEffect, useState } from "react";
import ProjCSS from "./ProjDetail.module.css";
import TaskItem from "./TaskItem";
import { useNavigate } from "react-router-dom";

function TaskList({ task }) {

    const navigate = useNavigate();
    const taskStage = task[0]?.stage;
    const [ stage , setStage ] = useState('');
    console.log("TaskList task : ", task );
    console.log("TaskList taskstage : ",task[0]?.stage)

    useEffect(() => {
      if(task){
        switch (taskStage) {
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
    },[task]);

    // { 
    //     task && (taskStage === 'todo' ? <span>해야할 일</span> 
    //     : taskStage === 'ing' ? <span>진행중</span> 
    //     : taskStage === 'done' ? <span>완료</span> 
    //     : alert('로딩중'))
    // } 
        
    return task && (
        <>
            <div className={ProjCSS.todoBox}>
                <div className={ProjCSS.taskTop}>
                    { stage }
                    <button><img src="/icon/plus.png" alt="plus"/></button>
                </div>
                <hr/>
                <div className={ProjCSS.taskLow}>
                {
                    Array.isArray(task)
                    && task.map(task => <TaskItem key={ task?.taskCode } task={task} />)
                }
                </div>
            </div>
        </>
    )
}

export default TaskList;