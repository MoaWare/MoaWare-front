import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { callBoardpostBoardsListAPI, callBoardPostListAPI } from '../../apis/BoardPostAPICalls';
import PagingBar from "../../components/common/PagingBar";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import CSS from "./BoardPostList.module.css";

function BoardPostList() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const boardPosts = useSelector(state => state.boardPostReducer);

    //    const pageInfo = boardPost.pageInfo;


    

/* 게시판 코드별 요청시 사용할 값 */
    const { boardCode } = useParams();
    console.log("boardCode : ", boardCode);



    const [currentPage, setCurrentPage] = useState(1);
    useEffect(
        () => {
            if (boardCode) {
                /* 게시판 코드별 게시판에 대한 요청 */
                dispatch(callBoardpostBoardsListAPI({ boardCode, currentPage }));
            } else {
                /* 모든 게시물 대한 요청 */
                dispatch(callBoardPostListAPI({ currentPage }));
            }
        },
        [boardCode, currentPage]
    );



    const onClickTableTr = (postCode) => {

        navigate(`/boardPosts/${postCode}`);

    };

    // const onClickProductInsert = () => {
    //     navigate("/product-registration");
    // };

    return (
        <>

        
            <div className={CSS.main}>
            <div class={CSS.menutitle}> 게시판 </div>
                

                <table className={CSS.table }>

                    <thead>
                        <tr className={ CSS.th }> 
                        <th className="table-header"><input type="checkbox" id="checkAll" /></th>

                            <th>No</th>
                            <th>분류</th>
                            <th>제목</th>
                            <th>작성일</th>
                            <th>수정일</th>
                            <th>조회수</th>
                        </tr>
                    </thead>
                        <tbody>
                    
                            {boardPosts.data &&
                                boardPosts.data.map((post) => (
                                    
                                    <tr
                                    className={CSS.td}
                                    key={post.postCode}
                                    onClick={() => onClickTableTr(post.postCode)}
                                >
                                    <td>
                                        <input type="checkbox" id="checkAll" onClick={(e) => e.stopPropagation()} />
                                    </td>
                                    <td>{post.postCode}</td>
                                    <td>{post.postCategory}</td>
                                    <td>{post.postTitle}</td>
                                    <td>{post.createDate}</td>
                                    <td>{post.modifyDate}</td>
                                    <td>{post.views}</td>
                                
                                        {/* <td>    <button className="view-post-button" onClick={onClickProductInsert}>
                                        게시물 조회
                                    </button></td> */}
                                    </tr>
                                ))}
                        </tbody>
                    </table>
                    <div className={CSS.content}>
                                    <button className={CSS.deletepost}>삭제</button>
                                    </div>

            </div>
            
            <div>
                {/* {pageInfo && <PagingBar pageInfo={pageInfo} setCurrentPage={setCurrentPage} />} */}
            </div>
        </>
    );
}

export default BoardPostList;