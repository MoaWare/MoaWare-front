import { useEffect, } from "react";
import { useNavigate } from 'react-router-dom';import 
{ useDispatch, useSelector, } from "react-redux";
import { callBoardPostDetailAPI } from '../../apis/BoardPostAPICalls';
import CSS from "./BoardPostDetail.module.css";
import { useParams, NavLink } from "react-router-dom";

function BoardPostDetail() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { detail } = useSelector(state => state.boardPostReducer);
    const { postCode } = useParams();




    useEffect(() => {
        dispatch(callBoardPostDetailAPI({ postCode }));
    }, []);

    const onClickBackHandler = () => {
        navigate('/boardPosts');
    }

    const onClickModifyHandler = (postCode) => {
        navigate('/boardPosts/modify/${postCode}');
    }

    return (
        <>
            <div className={CSS.main}>
            <div class={CSS.menutitle}> 게시판 {">"} 상세보기 </div>
              {detail&& (
                <div className={CSS.container}  key={detail.postCode}>
                    {/* <ul style={{ display : 'flex'}}>
                        <li className={CSS.category}>분류:</li>
                        <li className={CSS.categoryInfo}>부서직급게시판</li>
                    </ul>
                    <ul style={{ display : 'flex'}}>
                        <li className={CSS.title}>제목:</li>
                        <li className={CSS.titleInfo}></li>
                    </ul> */}
                    <div className={CSS.category}>분류[{detail.postCategory}]</div>
                    <div className={CSS.content1}>
                    <ul className={CSS.td}>
                    <li style={{ fontWeight: 'bold' }} className={CSS.title}>제목: {detail.postTitle}</li>
                        <li style={{ fontWeight: 'bold' }} className={CSS.date}>작성일: {detail.createDate}</li>
                    </ul>
                    <div className={CSS.content2}>{detail.postContent}</div>
                    </div>
                </div>
                    
                    
                )}
                <div className={CSS.content3}>
                                    <button className={CSS.boardcancel} onClick = { onClickBackHandler }>이전</button>
                                    <button className={CSS.boardcancel} onClick = { onClickModifyHandler }>수정</button>
                    </div>
            </div>
                                    
        

        
            {/* <div>
             {pageInfo && <PagingBar pageInfo={pageInfo} setCurrentPage={setCurrentPage} />}
            </div> */}
            
        </>
    );
}

export default BoardPostDetail;

// useDispatch: 리덕스 스토어와 상호작용하기 위해 dispatch 함수를 가져옵니다.
// useSelector: 리덕스 스토어의 상태를 선택하기 위해 useSelector 함수를 사용합니다.
// useParams: 현재 URL의 매개변수를 가져옵니다. 화면 넘길때 사용 by path variable
// useEffect: 컴포넌트가 렌더링될 때 호출되는 부수 효과 함수입니다.

// callBoardPostDetailAPI: 게시물 세부 정보를 가져오기 위한 API 호출 함수입니다.
// BoardPostDetail 함수: 게시물 세부 정보를 표시하는 컴포넌트입니다.

{/* JSX를 사용하여 게시물 세부 정보를 표시하는 컴포넌트를 반환합니다. JSX를 다른 컴포넌트에서 사용하거나 렌더링할 수 있습니다.*/ }

// 필요한 리액트 라이브러리와 함수들을 임포트합니다.
// BoardPostDetail 함수를 선언합니다.
// useDispatch를 사용하여 dispatch 함수를 가져옵니다. 이 함수는 리덕스 액션을 디스패치하여 상태를 변경하는 데 사용됩니다.
// useSelector를 사용하여 리덕스 스토어의 상태를 선택합니다. 이를 통해 상태를 읽을 수 있습니다.
// useParams를 사용하여 현재 URL의 매개변수를 가져옵니다. 이를 통해 postCode와 같은 동적인 경로 값을 사용할 수 있습니다.
// useEffect 훅을 사용하여 컴포넌트가 렌더링될 때 API를 호출하고, 받은 데이터를 dispatch를 통해 상태로 업데이트합니다.
// ueEffect의 두 번째 인자로 빈 배열을 전달하여 컴포넌트가 처음 렌더링될 때만 호출되도록 설정합니다.

//이 코드는 React와 Redux를 사용하여 게시물 세부 정보를 표시하는 컴포넌트를 구현한 예시입니다.
//리덕스 스토어의 상태를 읽고, API를 호출하여 데이터를 가져온 뒤 상태를 업데이트하고, JSX를 사용하여 데이터를 화면에 표시합니다.
//이를 통해 동적인 게시물 세부 정보를 보여주는 기능을 구현할 수 있습니다.