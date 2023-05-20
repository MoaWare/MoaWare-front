import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { callBoardPostListAPI } from '../../apis/BoardPostAPICalls';
import PagingBar from "../../components/common/PagingBar";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import CSS from "./BoardPostList.module.css";
import Work from "../users/works/Work.module.css";
import BoardPostDetail from './BoardPostDetail'

function BoardPostList() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const boardPost = useSelector(state => state.boardPostReducer);

    const pageInfo = boardPost.pageInfo;


    const [currentPage, setCurrentPage] = useState(1);
    /* 게시판 코드별 요청시 사요알 값*/
    const params = useParams();
    const boardCode = params.boardCode;
    console.log("boardCode : ", boardCode);

    useEffect(() => {
        dispatch(callBoardPostListAPI(currentPage));
    }, [currentPage]);


    const onClickTableTr = (postCode) => {

        navigate(`/boardPosts/${postCode}`);

    };

    const onClickProductInsert = () => {
        navigate("/product-registration");
    };

    return (
        <>
            <div className={`${Work.main} content2`}>
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
                            boardPost.data.map((boardPost) => (

                                <tr
                                    className="table-content"
                                    key={boardPost.postCode}
                                    onClick={() => onClickTableTr(boardPost.postCode)}
                                >                                <td></td>
                                    <td>{boardPost.postCode}</td>
                                    <td>{boardPost.postCategory}</td>
                                    <td>{boardPost.postTitle}</td>
                                    <td>{new Date(boardPost.writeDate).toLocaleString()}</td>
                                    <td>{new Date().toLocaleString()}</td>
                                    <td>{boardPost.views}</td>
                                    <td>    <button className="view-post-button" onClick={onClickProductInsert}>
                                        게시물 조회
                                    </button></td>
                                </tr>
                            ))}
                    </tbody>
                </table>
            </div>
            <div>
                {pageInfo && <PagingBar pageInfo={pageInfo} setCurrentPage={setCurrentPage} />}
            </div>
        </>
    );
}

export default BoardPostList;
