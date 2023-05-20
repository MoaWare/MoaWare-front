import ProjCSS from "./ProjDetail.module.css";
import { useNavigate } from "react-router-dom";


function ProjDetailTitle({ project }){

    const navigate = useNavigate();
    const startDate =  project.startDate.substring(10, 0).replace('-','.');
    const endDate = project.endDate.substring(10, 0).replace('-','.');

    /* 디데이 계산 */
    const dday = Math.floor((new Date() - new Date(project.endDate)) / (1000*60*60*24));
    console.log(dday);

    // 완료 갯수 / (해야할일 갯수 + 진행중 갯수 + 완료 갯수) * 100

    const goBack = () => {
        navigate(-1); 
    }

    console.log("project", project.projName);

    return(
        <div className={ProjCSS.topDiv}>
            <div className={ProjCSS.titleTop}>
                <div className={ProjCSS.titleTopLeft}>
                    <button onClick={goBack} className={ProjCSS.beforeBtn}>
                        <img src="/icon/before.png" alt="before"/>
                        </button>
                    <span>{project && project.projName}</span>
                </div>
                <div className={ProjCSS.titleTopRight}>
                    <p>{startDate} ~ {endDate}</p>
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