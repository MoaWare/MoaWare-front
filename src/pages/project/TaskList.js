import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProjCSS from "./ProjDetail.module.css";
import TaskItem from "./TaskItem";



function TaskList() {
   
    useEffect(
        ()=>{
            
        },[]
    );
return (
    <>
        <div className={ProjCSS.todoBox}>
            <div className={ProjCSS.taskTop}>
                <span>해야할 일</span>
                <button><img src="/icon/plus.png"/></button>
            </div>
                <hr/>
            <div className={ProjCSS.taskLow}>
                <TaskItem /><TaskItem /><TaskItem /><TaskItem /><TaskItem /><TaskItem />
            </div>
        </div>
    </>
)
}

export default TaskList;