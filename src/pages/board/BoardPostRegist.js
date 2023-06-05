import { useNavigate } from 'react-router-dom';
import CSS from './BoardPostRegist.module.css';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { callBoardPostRegistAPI } from '../../apis/BoardPostAPICalls';

function BoardPostRegist() {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { regist } = useSelector(state => state.boardPostReducer);
    const [form, setForm] = useState({});





    /* 게시글 등록 후 regist 값이 확인 되면 게시글 목록으로 이동 */
    useEffect(
        () => {
            if (regist?.status === 200) {
                alert('게시글 등록이 완료 되었습니다.');
                navigate('/boardPosts', { replace: true });
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


    /* 게시글 등록 버튼 클릭 이벤트 */
    const onClickRegistHandler = () => {
        /* 서버로 전달할 FormData 형태의 객체 설정 */
        const formData = new FormData();
        formData.append("board.boardCode", form.boardCode);
        formData.append("writer.empCode", form.empCode);
        formData.append("postCategory", form.postCategory);
        formData.append("postTitle", form.postTitle);
        formData.append("createDate", form.createDate);
        formData.append("postContent", form.postContent);


        dispatch(callBoardPostRegistAPI(formData));
    }




    const onClickBackHandler = () => {
        navigate('/boardPosts');
    }




    return (
        <div className={CSS.backgroundDiv}>
            <div className={CSS.registerDiv}>
                <h1>글 작성</h1>






                <input
                    type="number"
                    name="empCode"
                    placeholder="작성자"
                    onChange={onChangeHandler}
                    list="empCodeOptions" />

                <datalist id="empCodeOptions">
                    <option value="1">관리자</option>
                    <option value="2">일반</option>
                </datalist>


                <input
                    type="number"
                    name="boardCode"
                    placeholder="분류"
                    onChange={onChangeHandler}
                    list="boardCodeOptions"
                />

                <datalist id="boardCodeOptions">
                    <option value="1">공지사항</option>
                    <option value="2">자유 게시판</option>
                    <option value="3">부서&직급게시판</option>
                </datalist>


                <input
                    type="text"
                    name="postCategory"
                    placeholder="세부 분류"
                    onChange={onChangeHandler}
                />

                <input
                    type="text"
                    name="postTitle"
                    placeholder="제목"
                    onChange={onChangeHandler} />
                <div className={CSS.dateInputContainer}>
                    <input
                        type="date"
                        name="createDate"
                        onChange={onChangeHandler}
                        className={CSS.dateInput}
                    />
                    <label htmlFor="createDate" className={CSS.datePlaceholder}>
                        작성일 : 오늘 날짜를 선택해주세요 🡆
                    </label>
                </div>



                <textarea className={CSS.content}
                    type="text"
                    name="postContent"
                    placeholder="내용"
                    //autoComplete='off'
                    onChange={onChangeHandler} />

                <button
                    onClick={onClickRegistHandler}    >
                    등록
                </button>
                <button
                    style={{ border: 'none', margin: 0, fontSize: '15px', height: '2.3vw' }}
                    onClick={onClickBackHandler}        >
                    이전
                </button>
            </div>
        </div>
    );
}

export default BoardPostRegist;