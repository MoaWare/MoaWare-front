import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { callBoardPostDeleteAPI, callBoardpostBoardsListAPI, callBoardPostListAPI } from '../../apis/BoardPostAPICalls';
import PagingBar from "../../components/common/PagingBar";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import CSS from "./BoardPostList.module.css";

function BoardPostList() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const boardPosts = useSelector(state => state.boardPostReducer);
  const pageInfo = boardPosts.pageInfo;
  const [selectedPosts, setSelectedPosts] = useState([]);

  const { del } = useSelector(state => state.boardPostReducer);



  /* 게시판 코드별 요청시 사용할 값 */
  const { boardCode } = useParams();
  console.log("boardCode: ", boardCode);

  const [currentPage, setCurrentPage] = useState(1);
  useEffect(() => {
    if (boardCode) {
      /* 게시판 코드별 게시판에 대한 요청 */
      dispatch(callBoardpostBoardsListAPI({ boardCode, currentPage }));
    } else {
      /* 모든 게시물 대한 요청 */
      dispatch(callBoardPostListAPI({ currentPage }));
    }
  }, [boardCode, currentPage]);

  //테이블 클릭시 상세 및 수정 페이지로 라우팅
  const onClickTableTr = (postCode) => {
    navigate(`/boardPosts/${postCode}`);
  };




  useEffect(() => {
    if (del?.status === 200) {
      alert('게시물 삭제가 완료되었습니다.');
      navigate("/boardposts");
    }
  }, [del, dispatch]);
     


// 두 코드의 차이점은 useEffect의 의존성 배열에 어떤 값을 포함시켰느냐에 있습니다.
// 첫 번째 코드는 [del, dispatch]를 의존성 배열로 사용하고 있습니다. 이 의존성 배열은 del과 dispatch가 변경될 때마다 useEffect가 실행되도록 합니다. 즉, del 또는 dispatch가 변경되면 해당 useEffect 내의 코드가 실행됩니다.
// 두 번째 코드는 [del]를 의존성 배열로 사용하고 있습니다. 이 의존성 배열은 del이 변경될 때마다 useEffect가 실행되도록 합니다. dispatch는 의존성 배열에 포함되지 않았으므로 dispatch가 변경되어도 useEffect는 실행되지 않습니다.
// 따라서 첫 번째 코드의 경우, dispatch가 변경되면 useEffect가 실행되고, 두 번째 코드의 경우 dispatch가 변경되어도 useEffect가 실행되지 않습니다. 즉, 첫 번째 코드에서는 dispatch의 변경에도 useEffect 내의 코드가 실행되지만, 두 번째 코드에서는 dispatch의 변경에는 반응하지 않습니다.

  const handleCheckboxChange = (event, postCode) => {
        // 이벤트 전파 방지
        event.stopPropagation(); 
        setSelectedPosts(postCode);
        if(selectedPosts == postCode) {
          setSelectedPosts(null);
        }
    };

  const onClickDelete = () => {
    console.log('클릭ㅎㅎ',selectedPosts)
    dispatch(callBoardPostDeleteAPI({ postCode : selectedPosts})); // postCode 배열 전달
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
                    <input
                      type="checkbox" 
                      // checked={selectedPosts.includes(post.postCode)}
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
                                <td>{post.views}</td>
                                </tr>
                                ))}
                                </tbody>
                                </table>
                                <div>
                                <button
                                        className={CSS.deletepost}
                                        onClick={onClickDelete}
                                      >
                                삭제하기
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