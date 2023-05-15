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
        console.log("callLoginAPI",form);
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
            <h1 className={LoginCSS.titleblue}>Login</h1><br/>
            <span className={LoginCSS.subtitleTiny}>모아웨어에 오신 것을 환영합니다.</span><br/>
            <input 
                className={LoginCSS.inputbox}
                type="text" 
                name="empId"
                placeholder="아이디"
                autoComplete="off"
                onChange={onChangeHandler}
                />
            <input 
                type="password" 
                name="empPwd"
                placeholder="비밀번호"
                autoComplete="off"
                onChange={onChangeHandler}
                /><br/>
            <button onClick={onClickHandler} className={LoginCSS.loginbutton}>L O G I N</button><br/>
            <div className={ LoginCSS.loginfind }>
                <button onClick={onClickIdHandler}>아이디 찾기</button><span>|</span><button onClick={onClickPwdHandler}>비밀번호 찾기</button>
            </div>
        </>
    )
}

export default Loginform;