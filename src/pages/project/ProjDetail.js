import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProjCSS from "./ProjDetail.module.css";
import TaskItem from "./TaskItem";
import TaskList from "./TaskList";



function ProjDetail() {
   
    useEffect(
        ()=>{
            
        },[]
    );

    return (
        <div className={ProjCSS.wrapper}>
            <div className={ProjCSS.topDiv}>
                <div className={ProjCSS.titleTop}>
                    <div className={ProjCSS.titleTopLeft}>
                        <button className={ProjCSS.beforeBtn}>
                            <img src="/icon/before.png"/>
                        </button>
                        <span>프로젝트 업무 관리</span>
                    </div>
                    <div className={ProjCSS.titleTopRight}>
                        <p>2023. 05. 23 ~ 2023. 05. 31</p>
                        <span>D-{}23</span>
                    </div>
                </div>
                <div className={ProjCSS.titleMiddle}>
                    <span>{"여기에 프로젝트 상세 설명 moaware MOAWARE 12345 \n 여기에 프로젝트 상세 설명 \n 여기에 프로젝트 상세 설명 \n 여기에 프로젝트 상세 설명 \n "}</span>
                </div>
                <div className={ProjCSS.low}>
                    <div className={ProjCSS.titleLow}>
                        <div className={ProjCSS.titleLowLeft}>
                            <span>현재 진행율</span>
                        </div>
                        <div className={ProjCSS.titleLowRight}>
                            <span>65%</span>
                        </div>
                    </div>
                    <div className={ProjCSS.bar}>
                        <progress className={ProjCSS.progress} value={50} min={0} max={100}></progress>
                    </div>
                </div>
            </div>
            <div className={ProjCSS.lowDiv}>
               <TaskList />
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
