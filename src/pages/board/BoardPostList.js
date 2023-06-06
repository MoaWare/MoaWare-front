import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { callBoardpostBoardsListForAdminAPI, callBoardPostDeleteAPI, callBoardpostBoardsListAPI, callBoardPostListAPI, callBoardPostListForAdminAPI } from '../../apis/BoardPostAPICalls';
import PagingBar from "../../components/common/PagingBar";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import CSS from "./BoardPostList.module.css";
import { isAdmin } from "../../utils/TokenUtils";



function BoardPostList() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const boardPosts = useSelector(state => state.boardPostReducer);
  const pageInfo = boardPosts.pageInfo;
  const [selectedPosts, setSelectedPosts] = useState([]);
  const { empCode } = useParams();
  const { del } = useSelector(state => state.boardPostReducer);



  /* 게시판 코드별 요청시 사용할 값 */
  const { boardCode } = useParams();

  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {

    if (boardCode) {
      /* 게시판 코드별 게시판에 대한 요청 */
      if (isAdmin()) {
        dispatch(callBoardpostBoardsListForAdminAPI({ boardCode, currentPage }));
      } else {
        dispatch(callBoardpostBoardsListAPI({ boardCode, currentPage }));
      }
    } else {

      /* 모든 게시물 대한 요청 */
      if (isAdmin()) {
        dispatch(callBoardPostListForAdminAPI({ currentPage }));
      } else {
        dispatch(callBoardPostListAPI({ currentPage }));
      }
    }
  }, [boardCode, currentPage, empCode]);


  //테이블 클릭시 상세 및 수정 페이지로 라우팅
  const onClickTableTr = (postCode) => {
    navigate(`/boardPosts/${postCode}`);
  };


  useEffect(() => {
    if (del?.status === 200) {
      toast.success('게시물 삭제가 완료되었습니다.', {
          position: toast.POSITION.TOP_CENTER, // 토스트 위치 (옵션)
          autoClose: 2000, // 자동으로 닫히는 시간 (ms) (옵션)
          hideProgressBar: false, // 진행 막대 숨김 여부 (옵션)
        });
      if (isAdmin()) {
        dispatch(callBoardPostListForAdminAPI({ currentPage }));
      } else {
        dispatch(callBoardPostListAPI({ currentPage }));
      }
    }
  }, [del]);




  const handleCheckboxChange = (event, postCode) => {
    event.stopPropagation();
    setSelectedPosts(postCode);
    if (selectedPosts == postCode) {
      setSelectedPosts(null);
    }
  };

  const onClickDelete = () => {
    dispatch(callBoardPostDeleteAPI({ postCode: selectedPosts }));
  };


  return (
    <>
      <div className={CSS.main}>
        <div className={CSS.menutitle}>게시판</div>
        <table className={CSS.table}>
          <thead>
            <tr className={CSS.th}>
              <th className="table-header">
                <input type="checkbox" id="checkAll" />
              </th>
              <th>No</th>
              <th>분류</th>
              <th>제목</th>
              <th>작성일</th>
              <th>수정일</th>
              <th>노출 여부</th>
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
                    <input
                      type="checkbox"
                      checked={selectedPosts === post.postCode}
                      onChange={(event) => handleCheckboxChange(event, post.postCode)}
                      onClick={(event) => event.stopPropagation()}
                    />
                  </td>
                  <td>{post.postCode}</td>
                  <td>{post.postCategory}</td>
                  <td>{post.postTitle}</td>
                  <td>{post.createDate}</td>
                  <td>{post.modifyDate}</td>
                  <td>{post.status}</td>
                </tr>
              ))}
          </tbody>
        </table>

        <div className={CSS.deletepost}>
          <button onClick={onClickDelete}  >
            삭제 하기
          </button>
        </div>

        <div>
          {pageInfo && <PagingBar pageInfo={pageInfo} setCurrentPage={setCurrentPage} />}
        </div>
      </div>
    </>
  );
}

export default BoardPostList;
