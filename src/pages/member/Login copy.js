import { useNavigate } from "react-router-dom";
import LoginForm from "../../components/form/LoginForm";
import LoginCSS from './Login.module.css';
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { resetMember } from "../../modules/MemberModule";

function Login() {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    /* API 요청을 통해 반환 된 로그인 결과 값 */
    const { login } = useSelector(state => state.memberReducer);

    useEffect(
        () => {
            if(login?.status === 200) {
                navigate("/", { replace : true });
                dispatch(resetMember());
            } else if(login?.state === 400) {
                alert(login.message);
                dispatch(resetMember());
            }
        },
        [login]
    );

    /* 회원 가입 버튼 클릭 시 회원 가입 페이지로 이동 */
    const onClickRegisterHandler = () => {
        navigate('/register');
    }

    return (
        <div className={ LoginCSS.backgroundDiv }>
            <div className={ LoginCSS.loginDiv }>
                <LoginForm/>
                <button
                    style={ { border: 'none', margin: 0, fontSize: '10px', height: '10px'} }
                    onClick={ onClickRegisterHandler }
                >
                    회원가입
                </button>
            </div>
        </div>
    );

}

export default Login;