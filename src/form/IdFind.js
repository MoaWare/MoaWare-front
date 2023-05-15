import { useDispatch } from "react-redux";
import { callLoginAPI } from "../apis/EmployeeAPICalls";
import { useState } from "react";
import LoginCSS from "./Login.module.css"
import { useNavigate } from "react-router-dom";

function IdFind(){

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
        console.log(form);
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
            <h1>아이디 찾기</h1><br/>
            <span>사번</span>
            <input 
                type="text" 
                name="empNo"
                onChange={onChangeHandler}
                /><br/>
            <span>이름</span>
            <input 
                type="text" 
                name="empName"
                onChange={onChangeHandler}
                /><br/>
            <span>이메일</span>
            <input 
                type="email" 
                name="email"
                onChange={onChangeHandler}
                /><br/>
            <button onClick={onClickHandler} className="login-button">아이디 찾기</button><br/>
            <div className={ LoginCSS.loginfind }>
                <button onClick={onClickIdHandler}>로그인</button><span>|</span><button onClick={onClickPwdHandler}>비밀번호 찾기</button>
            </div>
        </>
    )
}

export default IdFind;