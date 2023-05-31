import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { callAdminBoardListAPI } from '../../apis/AdminBoardAPICalls';
import PagingBar from "../../components/common/PagingBar";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import CSS from "./AdminBoardList.module.css";
import { NavLink } from 'react-router-dom';


function AdminBoardList() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const boards = useSelector(state => state.boardReducer);


    const pageInfo = boards.pageInfo;




    const [currentPage, setCurrentPage] = useState(1);
    useEffect(
        () => {
    
            dispatch(callAdminBoardListAPI({ currentPage }));
            },
           [currentPage]
           );



    // const onClickTableTr = (boardCode) => {

    //     navigate(`/admin/boards/list/${boardCode}`);

    // };

    // const onClickProductInsert = () => {
    //     navigate("/product-registration");
    // };

    return (
        <>

        
            <div className={CSS.main}>
            <div class={CSS.menutitle}> 게시판
            <div className={CSS.content}>
                    <button>
                        <NavLink to="/admin/board/regist">
                        게시판 생성
                        </NavLink>
                    </button>
                    </div>  </div>  
                

                <table className={CSS.table }>

                    <thead>
                        <tr className={ CSS.th }> 
                        <th className="table-header"><input type="checkbox" id="checkAll" /></th>

                            <th>게시판 코드</th>
                            <th>게시판 이름</th>
                            
                        </tr>
                    </thead>
                        <tbody>
                    
                            {boards.data &&
                                boards.data.map((b) => (
                                    
                                    <tr
                                    className={CSS.td}
                                    key={b.boardCode}>
                                    <td>
                                        <input type="checkbox" id="checkAll" onClick={(e) => e.stopPropagation()} />
                                    </td>
                                    <td>{b.boardCode}</td>
                                    <td>{b.boardName}</td>
                                
                                
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
                                    <div>
                {pageInfo && <PagingBar pageInfo={pageInfo} setCurrentPage={setCurrentPage} />}
            </div>
            </div>
            
            
        </>
    );
}

export default AdminBoardList;