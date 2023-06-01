import { useEffect, } from "react";
import { useNavigate } from 'react-router-dom';import 
{ useDispatch, useSelector, } from "react-redux";
import { callBoardPostDetailAPI } from '../../apis/BoardPostAPICalls';
import CSS from "./BoardPostDetail.module.css";
import { useParams } from "react-router-dom";

function BoardPostDetail() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { detail } = useSelector(state => state.boardPostReducer);
    const { postCode } = useParams();




    useEffect(() => {
        dispatch(callBoardPostDetailAPI({ postCode }));
    }, []);

    const onClickBackHandler = () => {
        navigate('/boardPosts');
    }

    const onClickModifyHandler = () => {
        navigate(`/boardPosts/modify/${postCode}`);
    }

    return (
        <>
            <div className={CSS.main}>
            <div class={CSS.menutitle}> 게시판 {">"} 상세보기 </div>
              {detail&& (
                <div className={CSS.container}  key={detail.postCode}>
                    {/* <ul style={{ display : 'flex'}}>
                        <li className={CSS.category}>분류:</li>
                        <li className={CSS.categoryInfo}>부서직급게시판</li>
                    </ul>
                    <ul style={{ display : 'flex'}}>
                        <li className={CSS.title}>제목:</li>
                        <li className={CSS.titleInfo}></li>
                    </ul> */}
                    <div className={CSS.category}>분류[{detail.postCategory}]</div>
                    <div className={CSS.content1}>
                    <ul className={CSS.td}>
                    <li style={{ fontWeight: 'bold' }} className={CSS.title}>제목: {detail.postTitle}</li>
                        <li style={{ fontWeight: 'bold' }} className={CSS.date}>작성일: {detail.createDate}</li>
                    </ul>
                    <div className={CSS.content2}>{detail.postContent}</div>
                    </div>
                </div>
                    
                    
                )}
                <div className={CSS.content3}>
                                    <button className={CSS.boardcancel} onClick = { onClickBackHandler }>이전</button>
                                    <button className={CSS.boardcancel} onClick = { onClickModifyHandler }>수정</button>
                    </div>
            </div>
                                    
        

        
            {/* <div>
             {pageInfo && <PagingBar pageInfo={pageInfo} setCurrentPage={setCurrentPage} />}
            </div> */}
            
        </>
    );
}

export default BoardPostDetail;