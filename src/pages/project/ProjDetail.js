import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProjCSS from "./ProjDetail.module.css";
import { useParams } from "react-router-dom";
import { callTaskListAPI } from "../../apis/ProjectAPICalls";
import ProjDetailTitle from "./ProjectDetailTitle";
import TaskList from "./TaskList";

function ProjDetail() {

    const dispatch = useDispatch();
    const params = useParams();
    const projCode = params.projCode;
    const { tasks } = useSelector(state => state.projectReducer);
    let project = {};
    let progress = '';


    console.log("projCode : ", projCode);
    
    const tasksByStage = {
        todo: [],
        ing: [],
        done: [],
    };


    useEffect(() => {

        dispatch(callTaskListAPI({projCode}));

    }, []);


    if(tasks){
        project = tasks[0]?.project;
    }
   
    console.log("ProjDetail tasks : ", tasks);
    console.log("ProjDetail project : ", project);


    if(tasks){

        tasks.forEach((task) => {
            const { stage } = task;
            tasksByStage[stage].push(task);
        });
        
        console.log("tasksByStage : ", tasksByStage);

        progress = Math.floor(( tasksByStage.done.length / (tasksByStage.todo.length + tasksByStage.ing.length + tasksByStage.done.length)) * 100 ) ; 
        console.log("progress", progress);
    }

    

    return (
        <div className={ProjCSS.wrapper}>
            {tasks && <ProjDetailTitle project={project} progress={progress}/> }
            <div className={ProjCSS.lowDiv}>
                <TaskList task={tasksByStage.todo}/>
                <TaskList task={tasksByStage.ing}/>
                <TaskList task={tasksByStage.done}/> 
            </div>
        </div>
    ) 
}

export default ProjDetail;
