import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProjCSS from "./ProjDetail.module.css";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";


function ProjDetailTitle({ project }){

    const navigate = useNavigate();

    const goBack = () => {
        navigate(-1); 
    }
    // const [task] = tasks;

    console.log("project", project.project.projName);

    return(
        <div className={ProjCSS.topDiv}>
            <div className={ProjCSS.titleTop}>
                <div className={ProjCSS.titleTopLeft}>
                    <button onClick={goBack} className={ProjCSS.beforeBtn}>
                        <img src="/icon/before.png"/>
                    </button>
                    <span>{project.project.projName}</span>
                </div>
                <div className={ProjCSS.titleTopRight}>
                    <p>2023. 05. 23 ~ 2023. 05. 31</p>
                    <span>D-{}23</span>
                </div>
            </div>
            <div className={ProjCSS.titleMiddle}>
                <div>
                    <span>{project.project.projContent}</span>
                </div>
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
    )
}

export default ProjDetailTitle;