import { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
import DateSelect from '../../components/Work/DateSelect';
import ProjectCSS from './ProjectList.module.css';
// import PagingBar from "../../components/common/PagingBar";


function Project() {
    
    const [year2, setYear2] = useState(new Date().getFullYear());
    const [month2, setMonth2 ] = useState(new Date().getMonth() + 1);
    // const progress = params.progress;
    // const dispatch = useDispatch();

    // useEffect(
    //     ()=>{
    //          if(progress) {
    //              setIsProgress(true); 
    //              dispatch()
    //          } else if (done) {
    //              dispatch();
    //          }
    //     },[]
    // );



    return (
        <>
            <div className={ProjectCSS.main}>
                {/* <p className={ProjectCSS.p}>{progress ? '진행중인 프로젝트' : " 완료한 프로젝트" }</p> */}
                <p className={ProjectCSS.p}>진행중인 프로젝트</p>
                <div className={ProjectCSS.btnContainer}>
                </div>
                <hr className={ProjectCSS.hr}></hr>
                <div className={ProjectCSS.btnContainer2}>
                    <div className={ProjectCSS.dateSelect}>
                        <DateSelect

                            year2={year2}
                            month2={month2}

                            // onYearChange={handleYearChange} onMonthChange={handleMonthChange}

                        // onChageHandler={ onChageHandler }

                        />
                        {/* <input className={ProjectCSS.inputBox}></input> */}
                    </div>
                </div>
                <div >
                    <table className={ ProjectCSS.table }>
                    <thead>
                        <tr className={ ProjectCSS.th }>
                            <th>프로젝트 번호</th>
                            <th>프로젝트 제목</th>
                            <th>프로젝트 기간</th>
                            <th>진행률</th>
                            <th>상태</th>
                            <th>담당자</th>
                            <th>참여자 수</th>
                        </tr>
                </thead>
                {/* { projectList && <ProjectList projectList={projectList} /> }
                <button>프로젝트 상세</button> */}
                </table>
                {/* </div>
                <div> */}
                    {/* { pageInfo && <PagingBar pageInfo={ pageInfo } setCurrentPage={ setCurrentPage } /> } */}
                </div>
            </div>
        </>
            )
}

export default Project;

