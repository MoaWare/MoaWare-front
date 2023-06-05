import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProjCSS from "./ProjDetail.module.css";
import { useParams } from "react-router-dom";
import { callProjectAPI, callTaskListAPI } from "../../apis/ProjectAPICalls";
import ProjDetailTitle from "./ProjectDetailTitle";
import TaskList from "./TaskList";

function ProjDetail() {


    const dispatch = useDispatch();
    const params = useParams();
    const projCode = params.projCode;
    const { tasks, project } = useSelector(state => state.projectReducer);
    let progress = '';
    const tasksByStage = {
        todo: [],
        ing: [],
        done: [],
    };


    useEffect(() => {

        dispatch(callTaskListAPI({projCode}));

    }, []);

    useEffect(() => {

        dispatch(callProjectAPI(projCode));

    }, []);


    /* task의 stage에 따라 분류 */
    if(tasks){

        tasks.forEach((task) => {
            const { stage } = task;
            tasksByStage[stage].push(task);
        });
        progress = Math.floor(( tasksByStage.done.length / (tasksByStage.todo.length + tasksByStage.ing.length + tasksByStage.done.length)) * 100 ) ; 
    }

        

    return (
        <div className={ProjCSS.wrapper}>
            <ProjDetailTitle project={project} progress={progress}/> 
            <div className={ProjCSS.lowDiv}>
                <TaskList task={tasksByStage?.todo?.length > 0 ? tasksByStage?.todo : 'todo'} />
                <TaskList task={tasksByStage?.ing?.length > 0 ? tasksByStage?.ing : 'ing'} />
                <TaskList task={tasksByStage?.done?.length > 0 ? tasksByStage?.done : 'done'} />
            </div>
        </div>
    );
}

export default ProjDetail;
