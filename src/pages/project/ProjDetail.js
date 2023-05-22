import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProjCSS from "./ProjDetail.module.css";
import { useParams } from "react-router-dom";
import { callTaskListAPI, callTaskTodoAPI } from "../../apis/ProjectAPICalls";
import ProjDetailTitle from "./ProjectDetailTitle";
import TaskList from "./TaskList";

function ProjDetail() {

    const dispatch = useDispatch();
    const params = useParams();
    const projCode = params.projCode;
    const { tasks } = useSelector(state => state.projectReducer);

    console.log(tasks);
    console.log(projCode);
    
    const tasksByStage = {
        todo: [],
        ing: [],
        done: [],
    };

    useEffect(() => {

        dispatch(callTaskListAPI({projCode}));
        }, []);
   
    console.log("ProjDetail tasks : ", tasks);

    if(!tasks){

        tasks.map((task) => {
            const { stage } = task;
            tasksByStage[stage].push(task);
        });
        
        console.log("tasksByStage : ", tasksByStage);
    }
    

    return tasks && (
        <div className={ProjCSS.wrapper}>
            <ProjDetailTitle task={tasks}/>
            <div className={ProjCSS.lowDiv}>
                <TaskList  task={tasks}/>
                <TaskList task={tasks}/>
                <TaskList task={tasks}/>
            </div>
        </div>
    ) 
}

export default ProjDetail;
