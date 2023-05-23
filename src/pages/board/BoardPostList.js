import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { callBoardpostBoardsListAPI, callBoardPostListAPI } from '../../apis/BoardPostAPICalls';
import PagingBar from "../../components/common/PagingBar";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import CSS from "./BoardPostList.module.css";
import Work from "../users/works/Work.module.css";
import BoardPostDetail from './BoardPostDetail'

function BoardPostList() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const boardPost = useSelector(state => state.boardPostReducer);

    //    const pageInfo = boardPost.pageInfo;


    const [currentPage, setCurrentPage] = useState(1);
/* 게시판 코드별 요청시 사용할 값 */
    const { boardCode } = useParams();
    console.log("boardCode : ", boardCode);




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

        
            <div className={`${Work.main} content2`}>
                <div className={CSS.content2}>

                    <table>
                        <tbody>
                            <tr>
                                <th className="table-header"><input type="checkbox" id="checkAll" /></th>
                                <th className="table-header">No</th>
                                <th className="table-header">분류</th>
                                <th className="table-header">제목</th>
                                <th className="table-header">작성일</th>
                                <th className="table-header">수정일</th>
                                <th className="table-header">조회수</th>
                                <th className="table-header">
                                    상세정보

                                </th>

                            </tr>
                            {boardPost.data &&
                                boardPost.data.map((post) => (

                                    <tr
                                        className="table-content"
                                        key={post.postCode}
                                        onClick={() => onClickTableTr(post.postCode)}
                                    >   <td></td>
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
                </div>
            </div>
            <div>
                {/* {pageInfo && <PagingBar pageInfo={pageInfo} setCurrentPage={setCurrentPage} />} */}
            </div>
        </>
    );
}

export default BoardPostList;