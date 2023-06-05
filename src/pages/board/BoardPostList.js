import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { callBoardPostDeleteAPI, callBoardpostBoardsListAPI, callBoardPostListAPI, callBoardPostListForAdminAPI} from '../../apis/BoardPostAPICalls';
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
    dispatch(callBoardPostListAPI({ currentPage }))
  }
}, [del]);
   


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
                                <td>{post.status}</td>
                                </tr>
                                ))}
                                </tbody>
                                </table>
                                <div className={CSS.deletepost}>
                                <button
                                        
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