import { useDispatch, useSelector } from "react-redux";
import LoginCSS from '../../pages/member/Loginfind.module.css';
import { useNavigate } from "react-router-dom";


function LoginIdFind(){

    const navigate = useNavigate();

    const { id }= useSelector(state => state.employeeReducer);
    
    const onClickLoginHandler = () => {
        navigate("/login");
    }

    const onClickIdFindHandler = () => {
        navigate("/pwdfind");
    }
    return (
        <div className={LoginCSS.backgroundDiv}>
            <header className={LoginCSS.header}>
                <h3 className={LoginCSS.logo} onClick={()=>{navigate('/');}}>MOAWARE</h3>
            </header>
            <div className={ LoginCSS.loginDiv }>
                <h1>아이디 찾기</h1><br/>
                <p>입력하신 정보로 조회된 아이디는 <span className={LoginCSS.fontBolder}>{id.data}</span>입니다.</p><br/>
                <button onClick={onClickLoginHandler} className={LoginCSS.loginbutton}>로그인</button><br/>
                <div className={LoginCSS.loginfind}>
                    <button onClick={onClickIdFindHandler}>비밀번호 찾기</button>
                </div>
            </div>
        </div>
    )     
}

export default LoginIdFind;