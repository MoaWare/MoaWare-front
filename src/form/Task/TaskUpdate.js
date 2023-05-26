import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import TaskCSS from './Task.module.css';

function TaskUpdate() {

   
    useEffect(
        ()=>{
            
        },[]
    );



    return (
        <div className={TaskCSS.wrapper}>
        <div className={TaskCSS.wrap}>
            <div className={TaskCSS.mainTitle}>
                업무 관리
            </div>
            <div className={TaskCSS.mainContent}>
                <div className={TaskCSS.leftDiv}>
                    <div className={TaskCSS.leftTitle}>
                        <p className={TaskCSS.projTitlebold}>프로젝트 명</p>
                        <span className={TaskCSS.projTitle}>projectName</span>
                    </div>  
                    <div className={TaskCSS.leftContent}>
                        <table className={TaskCSS.leftTable}>
                            <tbody>
                                <tr>
                                    <td className={TaskCSS.tableTitle}>업무명</td>
                                    <td className={TaskCSS.tableBlank}></td>
                                    <td className={TaskCSS.tableBorder}>a</td>
                                </tr>
                                <tr>
                                    <td className={TaskCSS.tableTitle}>업무시작</td>
                                    <td className={TaskCSS.tableBlank}></td>
                                    <td className={TaskCSS.tableBorder}>a</td>
                                </tr>
                                <tr>
                                    <td className={TaskCSS.tableTitle}>업무종료</td>
                                    <td className={TaskCSS.tableBlank}></td>
                                    <td className={TaskCSS.tableBorder}>a</td>
                                </tr>
                                <tr>
                                    <td className={TaskCSS.tableTitle}>진행단계</td>
                                    <td className={TaskCSS.tableBlank}></td>
                                    <td className={TaskCSS.tableBorder}><select></select></td>
                                </tr>
                                <tr>
                                    <td className={TaskCSS.tableTitle}>업무단계</td>
                                    <td className={TaskCSS.tableBlank}></td>
                                    <td className={TaskCSS.tableBorder}><select></select></td>
                                </tr>
                            </tbody>
                        </table>
                        <button>등록</button>
                    </div>
                </div>
                <div className={TaskCSS.RightDiv}>RightDiv</div>
            </div>
        </div>
    </div>
)
}
export default TaskUpdate;
