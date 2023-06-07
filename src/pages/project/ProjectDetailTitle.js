import ProjCSS from "./ProjDetail.module.css";
import { useNavigate } from "react-router-dom";


function ProjDetailTitle({ project, progress }){

    const navigate = useNavigate();
    const startDate =  project?.startDate?.substring(10, 0).replace('-','.');
    const endDate = project?.endDate?.substring(10, 0).replace('-','.');

    /* 디데이 계산 */
    const dday = Math.floor((new Date(project?.endDate) - new Date()) / (1000*60*60*24)) || 0;

    return(
        <div className={ProjCSS.topDiv}>
            <div className={ProjCSS.titleTop}>
                <div className={ProjCSS.titleTopLeft}>
                    <button onClick={ () => navigate(-1) } className={ProjCSS.beforeBtn}>
                        <img src="/icon/before.png" alt="before"/>
                        </button>
                    <span>{project && project.projName}</span>
                </div>
                <div className={ProjCSS.titleTopRight}>
                    <p>{ (startDate || '')  + ` ~ ` + (endDate ||  '') }</p>
                    <span>D-{dday}</span>
                </div>
            </div>
            <div className={ProjCSS.titleMiddle}>
                <div>
                    <span>{project?.projContent}</span>
                </div>
            </div>
            <div className={ProjCSS.low}>
                <div className={ProjCSS.titleLow}>
                    <div className={ProjCSS.titleLowLeft}>
                        <span>현재 진행율</span>
                    </div>
                    <div className={ProjCSS.titLowRight}>
                        <span>{progress || ''}%</span>
                    </div>
                </div>
                <div className={ProjCSS.bar}>
                    <progress className={ProjCSS.progress} value={progress} min={0} max={100}></progress>
                </div>
            </div>
        </div>
    )
}

export default ProjDetailTitle;