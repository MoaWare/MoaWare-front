import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { callBoardPostBoardsListAPI, callBoardPostListAPI, callBoardPostSearchListAPI } from '../../apis/BoardPostAPICalls';
import PagingBar from "../../components/common/PagingBar";
import { useParams, useSearchParams } from "react-router-dom"

function BoardPostList() {

    const dispatch = useDispatch();
    const boardPosts = useSelector(state => state.boardPostReducer);
    console.log('boardPosts: ', boardPosts)
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(
        () => {
            dispatch(callBoardPostListAPI(currentPage));

        },
        [currentPage] //의존성 배열에 값도 확장됨
    );

    return (
        <>
            <div>게시물</div>
            <div>페이징</div>
        </>
    );
}

export default BoardPostList;