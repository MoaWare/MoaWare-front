// // import { useEffect, useState } from "react";
// // import { useDispatch, useSelector } from "react-redux";
// // import { callBoardPostListAPI } from '../../apis/BoardPostAPICalls';
// // import PagingBar from "../../components/common/PagingBar";
// // import { useNavigate, useParams, useSearchParams } from "react-router-dom";
// import CSS from "./BoardPostList.module.css";
// // import Work from "../users/works/Work.module.css";
// import Work from "../users/works/Work.module.css";


// function BoardPostDetail({ boardPost: { boardCode, postCategory, postTitle, postContent, createDate, modifyDate } }) {

//     // const dispatch = useDispatch();
//     // {/* 스토어 안의 값을 가져와서 구독함. */ }
//     // const boardPost = useSelector(state => state.boardPostReducer);
//     // const params = useParams();
//     // const postCode = params.postCode;

//     // const [currentPage, setCurrentPage] = useState(1);


//     // useEffect(() => {
//     //     dispatch(callBoardPostDetailAPI({ postCode }));
//     // }, []);

//     return (
//         <div className={`${Work.main} content2`}>
//             <h5>{postCategory}</h5>
//             <h5>{postTitle}</h5>
//             <h5>{postContent}</h5>
//         </div>
//     );
// }

// {/*
//             <table>
//                 <tbody>
//                     <tr>
//                         <th className="table-header"><input type="checkbox" id="checkAll" /></th>
//                         <th className="table-header">No</th>
//                         <th className="table-header">분류</th>
//                         <th className="table-header">제목</th>
//                         <th className="table-header">작성일</th>
//                         <th className="table-header">수정일</th>
//                         <th className="table-header">조회수</th>
//                         <th className="table-header">상세정보</th>
//                     </tr>
//                     {boardPost.data && boardPost.data.map((board) => (
//                         <tr className="table-content" >
//                             <td></td>
//                             <td>{board.postCode}</td>
//                             <td>{board.boardCode}</td>
//                             <td>{board.postCategory}</td>
//                             <td>{board.postTitle}</td>
//                             <td>{new Date(board.writeDate).toLocaleString()}</td>
//                             <td>{new Date().toLocaleString()}</td>
//                             <td>{board.views}</td>
//                             <td>{new Date(boardPost.orderDate).toLocaleString()}</td>
//                         </tr>
//                     ))}
//                 </tbody>
//             </table>
//         </div> */}



// export default BoardPostDetail;
