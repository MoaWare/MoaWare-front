import { useDispatch, useSelector } from "react-redux";
import LoginCSS from '../pages/member/Loginfind.module.css';
import { useNavigate } from "react-router-dom";


function LoginIdFind(){

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { getAccount }= useSelector(state => state.employeeReducer);
    
    const onClickLoginHandler = () => {
        navigate("/login");
    }

    const onClickIdFindHandler = () => {
        navigate("/idfind");
    }
    return (
        <div className={LoginCSS.backgroundDiv}>
            <div className={ LoginCSS.loginDiv }>
                <h1>아이디 찾기</h1>
                <p>입력하신 정보로 조회된 아이디는 {getAccount.data}입니다.</p>
                <button onClick={onClickLoginHandler} className={LoginCSS.loginbutton}>로그인</button><br/>
                <button onClick={onClickIdFindHandler}>비밀번호 찾기</button>
            </div>
        </div>
    )     
}

export default LoginIdFind;