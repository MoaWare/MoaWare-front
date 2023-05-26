import { useEffect, useState } from "react";
import taskCSS from "./TaskItem.module.css";
import { getMemberId } from "../../utils/TokenUtils";
import { useNavigate } from "react-router-dom";
import { AiOutlineCheckCircle } from "react-icons/ai";


function TaskItem({ task }) {

  const navigate = useNavigate();
  const taskType = task?.type;
  const [ type , setType ] = useState('');
  const [ color , setColor ] = useState('');
  const [ time, setTime ] = useState('');

  console.log("TaskItem task : ", task );

  useEffect(() => {
    if(task){
      switch (taskType) {
        case 'plan':
          setType('기획');
          setColor('#d7c9fe3c');
          console.log("여기는 테스크의 콘솔이다 오바");
          break;
        case 'design':
          setType('설계');
          setColor('#fdd0d06e');
          break;
        case 'test':
          setType('테스트');
          setColor('#fce9a34c');
          break;
        case 'dev':
          setType('개발');
          setColor('#d9f58d2d');
          break;
        case 'pre':
          setType('시연');
          setColor('#cdeef99d');
          break;
        default:
          setType('상태');
          break;
      }}

  },[taskType]);


  useEffect(()=>{

      if(task){
          setTime(task.startDate.substring(10,0));
      }
  },[taskType]);




  const onTaskClick = () => {

    navigate(`/task/${task?.project?.projCode}/detail/${task?.taskCode}`);
  }


  return task && (
      <div onClick={ onTaskClick } className={taskCSS.cursorPointer}>
          <div style={{ backgroundColor : color }} className={taskCSS.taskDiv}>
              <div className={taskCSS.divTop}>
                  <div className={taskCSS.divLeft}>
                      <span>{ task?.taskName }</span>
                  </div>
                  <div className={taskCSS.divRight} >
                      { task?.author?.empID === getMemberId() ? (<AiOutlineCheckCircle />) : null}
                  </div>
              </div>
              <div className={taskCSS.divLow}>
                  <div className={taskCSS.lowLeft}>
                      <span>{ time }</span>
                  </div>
                  <div className={taskCSS.lowMiddle}>
                      <span>{ task?.author?.empName }</span>
                  </div>
                  <div className={taskCSS.lowRight}>
                      <span>{ type }</span>
                  </div>
              </div>
          </div>
      </div>
  )
}

export default TaskItem;
