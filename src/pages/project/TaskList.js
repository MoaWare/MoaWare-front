import ProjCSS from "./ProjDetail.module.css";
import TaskItem from "./TaskItem";
import { useNavigate } from "react-router-dom";

function TaskList({ task }) {

    const navigate = useNavigate();
    console.log("TaskList task : ", task );

    
    
    return (
        <>
            <div className={ProjCSS.todoBox}>
                <div className={ProjCSS.taskTop}>
                    {/* { stage === 'todo' ? <span>해야할 일</span> : stage === 'ing' ? <span>진행중</span> : stage === 'done' ? <span>완료</span> : alert('이게아닌데')}  */}
                    <button><img src="/icon/plus.png" alt="plus"/></button>
                </div>
                <hr/>
                <div className={ProjCSS.taskLow}>
                {
                    Array.isArray(task)
                    && task.map(product => <TaskItem key={ task?.taskCode } task={task} />)
                }
                </div>
            </div>
        </>
    )
}

export default TaskList;