import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { callAdminBoardDeleteAPI, callAdminBoardListAPI } from '../../apis/AdminBoardAPICalls';
import PagingBar from "../../components/common/PagingBar";
import CSS from "./AdminBoardList.module.css";
import { NavLink, useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";


function AdminBoardList() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const boards = useSelector(state => state.boardReducer);
    const pageInfo = boards.pageInfo;
    const [selectedLists, setSelectedLists] = useState([]);
    const { del } = useSelector(state => state.boardReducer);
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(
        () => {
            dispatch(callAdminBoardListAPI({ currentPage }));
        },
        []
    );

    useEffect(() => {
        if (del?.status === 200) {
            toast.success('게시판 삭제가 완료 되었습니다.', {
                position: toast.POSITION.TOP_CENTER, // 토스트 위치 (옵션)
                autoClose: 2000, // 자동으로 닫히는 시간 (ms) (옵션)
                hideProgressBar: false, // 진행 막대 숨김 여부 (옵션)
            });
            dispatch(callAdminBoardListAPI({ currentPage }))
        }
    }, [del]);



    const handleCheckboxChange = (event, boardCode) => {
        event.stopPropagation();
        setSelectedLists(boardCode);
        if (selectedLists == boardCode) {
            setSelectedLists(null);
        }
    };
    const onClickDelete = () => {
        dispatch(callAdminBoardDeleteAPI({ boardCode: selectedLists }));
    };




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

                <table className={CSS.table}>
                    <thead>
                        <tr className={CSS.th}>
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
                                    <input
                                        type="checkbox"

                                        checked={selectedLists === b.boardCode}
                                        onChange={(event) => handleCheckboxChange(event, b.boardCode)}
                                        onClick={(event) => event.stopPropagation()} />
                                    <td>{b.boardCode}</td>
                                    <td>{b.boardName}</td>
                                </tr>
                            ))}
                    </tbody>
                </table>

                <div className={CSS.deletepost}>
                    <button onClick={onClickDelete}>삭제 하기
                    </button>
                </div>

                <div>
                    {pageInfo && <PagingBar pageInfo={pageInfo} setCurrentPage={setCurrentPage} />}
                </div>
                <div className={CSS.content2}>
                    <button>수정 하기
                    </button>
                </div>
            </div>


        </>
    );
}
export default AdminBoardList;
