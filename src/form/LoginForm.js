import { useDispatch } from "react-redux";
import { callLoginAPI } from "../apis/EmployeeAPICalls";
import { useState } from "react";
import LoginCSS from "./Login.module.css"
import { useNavigate } from "react-router-dom";

function Loginform(){

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [form,setForm] = useState({
        empId : "",
        empPwd : ""
    });

    const onChangeHandler = (e) => {
        setForm({
            ...form,
            [e.target.name] : e.target.value
        });
    };

    const onClickHandler = () => {
        dispatch(callLoginAPI(form));
    }

    const onClickIdHandler = () => {
        navigate('/idfind');
    }

    const onClickPwdHandler = () => {
        navigate('/pwdfind');
    }

    return (
        <>
            <h1>Login</h1><br/>
            <span>모아웨어에 오신 것을 환영합니다.</span>
            <input 
                type="text" 
                placeholder="아이디"
                autoComplete="off"
                onChange={onChangeHandler}
                /><br/>
            <input 
                type="password" 
                placeholder="비밀번호"
                autoComplete="off"
                onChange={onChangeHandler}
                /><br/>
            <button onClick={onClickHandler} className="login-button">LOGIN</button><br/>
            <div className={ LoginCSS.loginfind }>
                <button onClick={onClickIdHandler}>아이디 찾기</button><span>|</span><button onClick={onClickPwdHandler}>비밀번호 찾기</button>
            </div>
        </>
    )
}

export default Loginform;