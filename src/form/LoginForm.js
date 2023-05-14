import { useDispatch } from "react-redux";
import { callLoginAPI } from "../apis/EmployeeAPICalls";
import { useState } from "react";

function Loginform(){

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

    return (
        <>
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
        </>
    )
}

export default Loginform;