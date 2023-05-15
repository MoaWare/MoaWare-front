import { useDispatch } from "react-redux";
import LoginForm from "../../form/LoginForm";
import LoginCSS from './Login.module.css';
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";


function LoginIdFindResult(){

    const navigate = useNavigate();
    const dispatch = useDispatch();


    useEffect(
        ()=>{
            
        },[]
    )


    return (
        <div className={LoginCSS.backgroundDiv}>
            <div className={ LoginCSS.loginDiv }>
                <h1>아이디 찾기</h1>
                <span></span>
            </div>
        </div>
    )     
}

export default LoginIdFindResult;