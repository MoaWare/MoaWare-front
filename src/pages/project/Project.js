import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProjectCSS from './ProjectList.module.css';
import PagingBar from "../../components/common/PagingBar";
import { callPorjectDeleteAPI, callProjectProgressListAPI } from '../../apis/ProjectAPICalls';
import ProjectList from "./ProjectList";
import { Navigate, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Project() {
    
    const [currentPage, setCurrentPage] = useState(1);
    const { progress } = useSelector(state => state.projectReducer);
    const { delProj } = useSelector(state => state.projectReducer);
    const [selectPorjCode, setSeletProjCode] = useState(null);
    const [selecteCheck, setSelecteCheck] = useState(null);
    const [projDate, setprojDate] = useState('');
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const pageInfo = progress && progress ? progress.data.pageInfo : null;
    const projectList = progress && progress.data ? progress.data.data : '';
    useEffect(
        ()=>{
                dispatch(callProjectProgressListAPI({ currentPage }))
        },[currentPage, dispatch, delProj]
    );
    

    useEffect(() => {
        if (delProj?.status === 200) {
          toast.success('프로젝트 삭제가 완료 되었습니다.', {
            position: toast.POSITION.TOP_CENTER, // 토스트 위치 (옵션)
            autoClose: 2000, // 자동으로 닫히는 시간 (ms) (옵션)
            hideProgressBar: false, // 진행 막대 숨김 여부 (옵션)
          });
          navigate("/project");
        } else if (delProj?.state === 400) {
          alert(delProj.message);
        }
      }, [delProj]);

    const onSelectHandler = (projCode) => {
        setSeletProjCode(projCode);
    }

    const onClickDelete = e => {
        dispatch(callPorjectDeleteAPI({projCode : selectPorjCode}));
    }

    return (
        <>
            <div className={ProjectCSS.main}>
                <p className={ProjectCSS.p}>진행중인 프로젝트</p>
                <div className={ProjectCSS.btnContainer}>
                </div>
                <hr className={ProjectCSS.hr}></hr>
                <div className={ProjectCSS.btnContainer2}>
                </div>
                <div >
                    <table className={ ProjectCSS.table }>
                    <thead>
                        <tr className={ ProjectCSS.th }>
                            <th></th>
                            <th>프로젝트 번호</th>
                            <th>프로젝트 제목</th>
                            <th>프로젝트 기간</th>
                            <th>상태</th>
                            <th>담당자</th>
                            <th>참여자 수</th>
                        </tr>
                </thead>
                { projectList && <ProjectList projectList={projectList} 
                    onProjectSelectHandler={onSelectHandler}
                /> }
                </table>
                </div>
                    <div>
                        <button className={ProjectCSS.workBtn1}
                            onClick={ onClickDelete }
                            >삭제하기</button>
                    </div>
                <div>
                    { pageInfo && <PagingBar pageInfo={ pageInfo } setCurrentPage={ setCurrentPage } /> }
                </div>
            </div>
        </>
            )
}

export default Project;

