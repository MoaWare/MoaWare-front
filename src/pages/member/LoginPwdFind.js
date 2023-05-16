import { useDispatch, useSelector } from "react-redux";
import LoginCSS from './Loginfind.module.css';
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { callFindAccountAPI, callIdFindAPI } from "../../apis/EmployeeAPICalls";
import LoginIdFindResult from "../../form/LoginIdFindResult";
import { resetEmp } from "../../modules/EmployeeModule";

function LoginIdFind(){

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { getAccount }= useSelector(state => state.employeeReducer);
    const [ form, setForm ] = useState({
        empCode : "",
        empId : "",
        email : ""
    });

    const onChangeHandler = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
        console.log(e.target.value); 
    };

    function onClickHandler(){
        
        if(
            !form.empCode ||
            !form.empId ||
            !form.email
        ) {
            alert("정보를 모두 입력해주세요");
            return;
        }
        
        if(dispatch(callFindAccountAPI(form))){
            dispatch(resetEmp);
        } else if(getAccount?.state === 400){
            alert(getAccount.message);
        }

    };

    const onClickLoginHandler = () => {
        navigate("/login");
    }

    const onClickIdFindHandler = () => {
        navigate("/idfind");
    }

    return (
        <div className={LoginCSS.backgroundDiv}>
            <div className={ LoginCSS.loginDiv }>
                <img src="./icon/moawareLoginMain.png" alt='Down' name="login"/><br/>
                <img src="./icon/Line 1.png" alt='Down' name="login" className={LoginCSS.line}/><br/>
                <h1 className={LoginCSS.titleblue}>비밀번호 찾기</h1><br/>
                <label>아이디 
                <input 
                    className={LoginCSS.inputbox}
                    type="text" 
                    name="empId"
                    onChange={onChangeHandler}
                    />
                </label>
                <label>사번
                <input 
                    className={LoginCSS.inputbox}
                    type="text" 
                    name="empCode"
                    onChange={onChangeHandler}
                    />
                </label>
                <label>이메일
                <input 
                    className={LoginCSS.inputbox}
                    type="text" 
                    name="email"
                    onChange={onChangeHandler}
                    />
                </label>
                <button onClick={onClickHandler} className={LoginCSS.loginbutton}>임시 비밀번호 이메일로 전송</button><br/>
                <div className={ LoginCSS.loginfind }>
                    <button onClick={onClickLoginHandler}>로그인</button><span>|</span><button onClick={onClickIdFindHandler}>아이디 찾기</button>
                </div>
            </div>
        </div>
    )   
}

export default LoginIdFind;