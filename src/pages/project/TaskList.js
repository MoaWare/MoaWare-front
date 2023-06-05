import { useEffect, useState } from "react";
import ProjCSS from "./ProjDetail.module.css";
import TaskItem from "./TaskItem";
import { useNavigate } from "react-router-dom";

function TaskList({ task }) {

    const navigate = useNavigate();
    const taskStage = task[0]?.stage || task;
    const [ stage , setStage ] = useState('');

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

    
    const onRegistClick = () => {
      
      if(task){
        navigate(`/task/${task[0]?.project?.projCode}/regist`);
      }
    }

        
    return task && (
        <>
          <div className={ProjCSS.todoBox}>
              <div className={ProjCSS.taskTop}>
                  { stage }
                  <button onClick={onRegistClick}><img src="/icon/plus.png" alt="plus"/></button>
              </div>
              <hr/>
              <div className={ProjCSS.taskLow}>
              {
                  Array.isArray(task)
                  && task.map(task => <TaskItem key={ task.taskCode } task={task} />)
              }
              </div>
          </div>
        </>
    )
}

export default TaskList;