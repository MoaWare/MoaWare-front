import { useNavigate } from 'react-router-dom';
import CSS from './AdminBoardRegist.module.css';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { callAdminBoardRegistAPI } from '../../apis/AdminBoardAPICalls';

function AdminBoardRegist() {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { regist } = useSelector(state => state.boardReducer);
    const [form, setForm] = useState({});

    /* 게시판 등록 후 regist 값이 확인 되면 게시판 관리 페이지로 이동 */
    useEffect(
        () => {
            if (regist?.status === 200) {
                alert('게시판 생성이 완료 되었습니다.');
                navigate('/admin/board/list', { replace: true });
            }
        },
        [regist]
    );


    /* 입력 양식의 값이 변경 될 때 */
    const onChangeHandler = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    }

    /* 게시판 생성 버튼 클릭 이벤트 */
    const onClickRegistHandler = () => {
        /* 서버로 전달할 FormData 형태의 객체 설정 */
        const formData = new FormData();
        formData.append("boardCode", form.boardCode);
        formData.append("boardName", form.boardName);
        dispatch(callAdminBoardRegistAPI(formData));
    }




    const onClickBackHandler = () => {
        navigate('/admin/board/list');
    }



    return (
        <div className={CSS.backgroundDiv}>
            <div className={CSS.registerDiv}>
                <h1>게시판 생성</h1>

                <input
                    type="number"
                    name="boardCode"
                    placeholder="게시판 코드"
                    onChange={onChangeHandler}
                    list="boardCodeOptions"
                />

                <datalist id="boardCodeOptions" className={CSS.datalistOptions}>
                    <option value="6">6번 이후 자유 입력</option>
                    <option value="7">번호 선택후 이름 입력</option>

                </datalist>

                <input
                    type="text"
                    name="boardName"
                    placeholder="게시판 이름"
                    onChange={onChangeHandler} />



                <button
                    onClick={onClickRegistHandler}    >
                    등록
                </button>

                <button
                    style={{ border: 'none', margin: 0, fontSize: '15px', height: '2.3vw' }}
                    onClick={onClickBackHandler}    >
                    이전
                </button>
            </div>
        </div>
    );
}

export default AdminBoardRegist;