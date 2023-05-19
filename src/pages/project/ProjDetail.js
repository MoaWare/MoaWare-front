import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProjCSS from "./ProjDetail.module.css";
import TaskItem from "./TaskItem";
import TaskList from "./TaskList";
import { useParams } from "react-router-dom";
import { callProjectAPI, callTaskListAPI } from "../../apis/ProjectAPICalls";
import ProjDetailTitle from "./ProjDetailTitle";

function ProjDetail() {

    const dispatch = useDispatch();
    const params = useParams();
    const projCode = params.projCode;
    const project = useSelector(state => state.projectReducer);
    // const taskList = tasks.data;
    
    console.log(projCode);
    
    useEffect(
        ()=>{
            if(projCode){
                dispatch(callProjectAPI({projCode}));
            }
        },[]
        );
        
        console.log("ProjDetail : ", project);
        
    return (
        <div className={ProjCSS.wrapper}>
            <ProjDetailTitle project={project}/>
            <div className={ProjCSS.lowDiv}>
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
                <div className={ProjCSS.progressBox}>
                    <div className={ProjCSS.taskTop}>
                        <span>진행중</span>
                        <button><img src="/icon/plus.png"/></button>
                    </div>
                        <hr/>
                    <div className={ProjCSS.taskLow}>
                        <TaskItem />
                    </div>
                </div>
                <div className={ProjCSS.doneBox}>
                    <div className={ProjCSS.taskTop}>
                        <span>완료</span>
                        <button><img src="/icon/plus.png"/></button>
                    </div>
                    <hr/>
                    <div className={ProjCSS.taskLow}>
                        <TaskItem />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProjDetail;
