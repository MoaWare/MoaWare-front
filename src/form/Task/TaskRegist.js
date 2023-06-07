import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import TaskCSS from './Task.module.css';import { callProjectAPI, callTaskDetailAPI, callTaskRegistAPI } from "../../apis/ProjectAPICalls";
import { useNavigate, useParams } from "react-router-dom";
import { getMemberId } from "../../utils/TokenUtils";
import { toast } from "react-toastify";
import { resetTask } from "../../modules/ProjectModule";




function TaskRegist() {

    // 새로고침시 사용되는 param 값
    const code = localStorage.getItem('code');
    localStorage.removeItem('code');

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { project, post } = useSelector(state => state.projectReducer);
    const { projCode } = useParams();
    const [ form, setForm ] = useState({
        taskName : "",
        taskNotice : "",
        startDate : "",
        endDate : "",
        type : "",
        stage : "",
        project : {},
    });

    let endDate = '';


    
    useEffect(()=>{
        dispatch(callProjectAPI(projCode));
    },[]);


    useEffect(()=>{

        if(project){
            endDate = project.endDate.substring(10,0);
        }

        setForm({ 
            type : "plan",
            stage : "todo",
            project : project 
        });
        
    },[project]);


    useEffect(() => {

        if(post?.status === 200){
            toast.success(post.message, {
                position: toast.POSITION.TOP_CENTER, 
                autoClose: 2000, 
                hideProgressBar: false,
              });
            navigate(`/task/${form.project.projCode}`);
            dispatch(resetTask());
        }
    },[post]);



    const onChangeHandler = (e) => {

        setForm((prevForm) => ({
            ...prevForm,
            [e.target.name] : e.target.value,
        }));
    }


    const onClickHandler = () => {

        if(
            !form.taskName || 
            !form.taskNotice || 
            !form.startDate || 
            !form.type || 
            !form.stage || 
            !form.project
            ){
                toast.error('정보를 모두 입력해주세요.', {
                    position: toast.POSITION.TOP_CENTER, // 토스트 위치 (옵션)
                    autoClose: 2000, // 자동으로 닫히는 시간 (ms) (옵션)
                    hideProgressBar: false, // 진행 막대 숨김 여부 (옵션)
                    progressStyle: {
                      backgroundColor: '#ff000074', // 프로그레스 바 배경색
                      height: '5px', // 프로그레스 바 
                    },
                  });

                return;
            } 
            dispatch(callTaskRegistAPI(form));

    };


    return project && (
        <div className={TaskCSS.wrapper}>
            <div className={TaskCSS.wrap}>
                <div className={TaskCSS.mainTitle}>
                    업무 관리
                </div>
                <div className={TaskCSS.mainContent}>
                    <div className={TaskCSS.leftDiv}>
                        <div className={TaskCSS.leftTitle}>
                            <p className={TaskCSS.projTitlebold}>프로젝트 명</p>
                            <span className={TaskCSS.projTitle}>{ project?.projName }</span>
                        </div>  
                        <div className={TaskCSS.leftContent}>
                            <div className={TaskCSS.tableDiv}>
                                <table className={TaskCSS.leftTable}>
                                    <tbody className={TaskCSS.tableTbody}>
                                        <tr className={TaskCSS.tableTaskName}>
                                            <td className={TaskCSS.tableTitle}>업무명</td>
                                            <td className={TaskCSS.tableBorder}>
                                                <input 
                                                    className={TaskCSS.inputbox}
                                                    type="text" 
                                                    name="taskName"
                                                    onChange={onChangeHandler}
                                                />
                                            </td>
                                        </tr>
                                        <tr className={TaskCSS.tableTaskStartDate}>
                                            <td className={TaskCSS.tableTitle}>업무시작</td>
                                            <td className={TaskCSS.tableBorder}>
                                            <input 
                                                className={TaskCSS.inputbox}
                                                type="date" 
                                                name="startDate"
                                                max={endDate}
                                                onChange={onChangeHandler}
                                            />
                                            </td>
                                        </tr>
                                        <tr className={TaskCSS.tableTaskEndDate}>
                                            <td className={TaskCSS.tableTitle}>업무종료</td>
                                            <td className={TaskCSS.tableBorder}>
                                                <input 
                                                    className={TaskCSS.inputbox}
                                                    type="date" 
                                                    name="endDate"
                                                    min={form?.startDate}
                                                    max={endDate}
                                                    onChange={onChangeHandler}
                                                />
                                            </td>
                                        </tr>
                                        <tr className={TaskCSS.tableTaskStage}>
                                            <td className={TaskCSS.tableTitle}>진행단계</td>
                                            <td className={TaskCSS.tableBorder}>
                                                <select name="stage" onChange={onChangeHandler}>
                                                    <option value="todo">해야할 일</option>
                                                    <option value="ing">진행중</option>
                                                    <option value="done">완료</option>
                                                </select>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className={TaskCSS.tableType}>업무단계</td>
                                            <td className={TaskCSS.tableBorder}>
                                                <select name="type" onChange={onChangeHandler}>
                                                    <option value="plan">기획</option>
                                                    <option value="design">설계</option>
                                                    <option value="test">테스트</option>
                                                    <option value="dev">개발</option>
                                                    <option value="pre">시연</option>
                                                </select>
                                            </td>
                                        </tr>
                                        <tr className={TaskCSS.tableTaskNotice}>
                                            <td className={TaskCSS.tableTitle}>공지사항</td>
                                            <td className={TaskCSS.tableBorder}>
                                                <textarea 
                                                    maxLength="100"
                                                    className={TaskCSS.inputbox}
                                                    name="taskNotice"
                                                    onChange={onChangeHandler}
                                                />
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div className={TaskCSS.btnMargin}>
                                <button onClick={onClickHandler}>등록</button>
                            </div>
                        </div>
                    </div>
                <div className={TaskCSS.RightDiv}></div>
            </div>
        </div>
    </div>
    );
}


export default TaskRegist;
