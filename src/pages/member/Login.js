import { useDispatch, useSelector } from "react-redux";
import LoginForm from "../../form/LoginForm";
import LoginCSS from './Login.module.css';
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { resetEmp } from "../../modules/EmployeeModule";


function Login(){

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const {login} = useSelector(state => state.employeeReducer);

    useEffect(
        ()=>{
            if(login?.status === 200 ){
                navigate("/", { replace : true });
                dispatch(resetEmp());
            } else if(login?.status === 400 ){
                alert(login?.message)
                dispatch(resetEmp());
            }
        },[login]
    )

    const onClickIdHandler = () => {
        navigate('/idfind');
    }

    const onClickPwdHandler = () => {
        navigate('/pwdfind');
    }

    return (
        <div className={LoginCSS.backgroundDiv}>
            <div className={ LoginCSS.loginDiv }>
                <img src="./icon/moawareLoginMain.png" alt='Down' name="dept"/><br/>
                <img src="./icon/Line 1.png" alt='Down' name="dept" className={LoginCSS.line}/><br/>
                <div className={LoginCSS.loginDivForm}>
                <h1>Login</h1><br/>
                <span>모아웨어에 오신 것을 환영합니다.</span>
                <LoginForm />
                <div className={ LoginCSS.loginfind }>
                    <button onClick={onClickIdHandler}>아이디 찾기</button><span>|</span><button onClick={onClickPwdHandler}>비밀번호 찾기</button>
                </div>
                </div>
            </div>
        </div>
    )
}

export default Login;