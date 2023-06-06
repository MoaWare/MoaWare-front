import { useEffect, useState } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { callBoardPostDetailForAdminAPI, callBoardPostUpdateAPI } from '../../apis/BoardPostAPICalls';
import CSS from "./BoardPostModify.module.css";

function BoardPostModify() {
    const { postCode } = useParams();
    const { detail } = useSelector(state => state.boardPostReducer);
    const { modify } = useSelector(state => state.boardPostReducer);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [form, setForm] = useState({});


    /* 읽기모드와 수정모드를 구분 */
    const [modifyMode, setModifyMode] = useState(false);

    /* 최초 랜더링 시 게시물 상세 정보 조회 */
    useEffect(() => {
        dispatch(callBoardPostDetailForAdminAPI({ postCode }));
    }, []);

    useEffect(
        () => {
            if (modify?.status === 200) {
                toast.success('게시물 수정이 완료 되었습니다.', {
                  position: toast.POSITION.TOP_CENTER, // 토스트 위치 (옵션)
                  autoClose: 2000, // 자동으로 닫히는 시간 (ms) (옵션)
                  hideProgressBar: false, // 진행 막대 숨김 여부 (옵션)
                });
                navigate('/boardPosts', { replace: true });
            }
        },
        [modify]
    )

    /* 입력 양식의 값 변경될 때 */
    const onChangeHandler = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    }

    /* 수정 모드 변경 이벤트 */
    const onClickModifyModeHandler = () => {
        setModifyMode(true);
        setForm({ ...detail });
    }


    /* 게시판 (코드별) 분류가 변경될 때 */
    const onChangeBoardCodeHandler = (e) => {
        setForm({
            ...form,
            board: { boardCode: e.target.value }
        });
    }



    /* 게시물 수정 저장 버튼 클릭 이벤트 */
    const onClickBoardPostUpdateHandler = () => {

        const formData = new FormData();
        formData.append("postCode", form.postCode);
        formData.append("board.boardCode", form.board.boardCode);
        formData.append("postTitle", form.postTitle);
        formData.append("status", form.status);
        formData.append("postContent", form.postContent);

        dispatch(callBoardPostUpdateAPI(formData));
    }

    const inputStyle = !modifyMode ? { backgroundColor: 'lightgrey' } : null;
    const checkValue = !modifyMode ? detail.board?.boardCode : form.board?.boardCode;


    const onClickBackHandler = () => {
        navigate('/boardPosts');
    }


    return (
        <>
            <div className={CSS.main}>
                <div class={CSS.menutitle}> 게시판 {">"} 수정 </div>
                {detail && (
                    <table>
                        <div className={CSS.container} key={detail.postCode}>
                            <tbody>


                                <tr>
                                    <td><label>게시글 번호: </label></td>
                                    <td>
                                        <input
                                            name='postCode'
                                            placeholder='게시글 번호'
                                            type='number'
                                            className={CSS.title}
                                            onChange={onChangeHandler}
                                            value={!modifyMode ? detail.postCode : detail.postCode}
                                            readOnly={!modifyMode}
                                            style={inputStyle}
                                        />
                                    </td>
                                </tr>

                                <tr>
                                    <td><label>제목: </label></td>
                                    <td>
                                        <input
                                            name='postTitle'
                                            placeholder='제목'
                                            className={CSS.title}
                                            onChange={onChangeHandler}
                                            value={!modifyMode ? detail.postTitle : form.postTitle}
                                            readOnly={!modifyMode}
                                            style={inputStyle}
                                        />
                                    </td>
                                </tr>

                                <tr>
                                    <td><label>게시판 분류: </label></td>
                                    <td>
                                        <label>

                                            <input
                                                type="radio"
                                                name="boardCode"
                                                onChange={onChangeBoardCodeHandler}
                                                value={1}
                                                readOnly={!modifyMode}
                                                checked={checkValue == 1}
                                            /> 공지사항
                                        </label> &nbsp;
                                        <label>
                                            <input
                                                type="radio"
                                                name="boardCode"
                                                onChange={onChangeBoardCodeHandler}
                                                value={2}
                                                readOnly={!modifyMode}
                                                checked={checkValue == 2}
                                            /> 자유게시판
                                        </label> &nbsp;
                                        <label>
                                            <input
                                                type="radio"
                                                name="boardCode"
                                                onChange={onChangeBoardCodeHandler}
                                                value={3}
                                                readOnly={!modifyMode}
                                                checked={checkValue == 3}
                                            /> 부서&직급게시판
                                        </label> &nbsp;
                                        <label>
                                            <input
                                                type="radio"
                                                name="boardCode"
                                                onChange={onChangeBoardCodeHandler}
                                                value={4}
                                                readOnly={!modifyMode}
                                                checked={checkValue == 4}
                                            /> 마이게시판
                                        </label> &nbsp;
                                        <label>
                                            <input
                                                type="radio"
                                                name="boardCode"
                                                onChange={onChangeBoardCodeHandler}
                                                value={5}
                                                readOnly={!modifyMode}
                                                checked={checkValue == 5}
                                            /> FAQ게시판
                                        </label>
                                    </td>
                                </tr>

                                <tr>
                                    <td><label>노출 여부: </label></td>
                                    <td>
                                        <label>
                                            <input
                                                type="radio"
                                                name="status"
                                                onChange={onChangeHandler}
                                                value="Y"
                                                readOnly={!modifyMode}
                                                checked={(!modifyMode ? detail.status : form.status) === 'Y' ? true : false}
                                            />
                                            Y
                                        </label> &nbsp;
                                        <label>
                                            <input
                                                type="radio"
                                                name="status"
                                                onChange={onChangeHandler}
                                                value="N"
                                                readOnly={!modifyMode}
                                                checked={(!modifyMode ? detail.status : form.status) === 'N' ? true : false}
                                            /> N</label>
                                    </td>
                                </tr>

                                <tr>
                                    <td><label>내용</label></td>
                                    <td>
                                        <textarea
                                            className={CSS.content2}
                                            name='postContent'
                                            onChange={onChangeHandler}
                                            value={!modifyMode ? detail.postContent : form.postContent}
                                            readOnly={!modifyMode}
                                            style={inputStyle}
                                        ></textarea>
                                    </td>
                                </tr>
                            </tbody>
                        </div>
                    </table>
                )}
                <div className={CSS.content3}>
                    <button className={CSS.boardcancel} onClick={onClickBackHandler}>이전</button>
                    {!modifyMode &&
                        <button onClick={onClickModifyModeHandler}>
                            수정 모드
                        </button>
                    }
                    {modifyMode &&
                        <button onClick={onClickBoardPostUpdateHandler}    >
                            게시물 수정 저장하기
                        </button>
                    }
                </div>
            </div>

        </>
    );
}

export default BoardPostModify;
