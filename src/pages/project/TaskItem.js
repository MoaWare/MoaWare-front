import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import taskCSS from "./TaskItem.module.css";


function TaskItem() {

   
    useEffect(
        ()=>{
            
        },[]
    );



    return (
        <div >
            <div style={ { "backgroundColor" : "#cdeef99d" } } className={taskCSS.taskDiv}>
                <div className={taskCSS.divTop}>
                    <div className={taskCSS.divLeft}>
                        <span>피그마 완성</span>
                    </div>
                    <div className={taskCSS.divRight}>
                        <button>···</button>
                    </div>
                </div>
                <div className={taskCSS.divLow}>
                    <div className={taskCSS.lowLeft}>
                        <span>2023.05.23</span>
                    </div>
                    <div className={taskCSS.lowMiddle}>
                        <span>권댕</span>
                    </div>
                    <div className={taskCSS.lowRight}>
                        <span>기획</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TaskItem;
