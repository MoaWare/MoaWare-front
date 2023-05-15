import { useDispatch, useSelector } from "react-redux";
import LoginCSS from './LoginFind.module.css';
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";


function LoginIdFind(){

    const navigate = useNavigate();
    const dispatch = useDispatch();


    useEffect(
        ()=>{

        },[]
    )

    return (
        <div className={LoginCSS.backgroundDiv}>
            <div className={ LoginCSS.loginDiv }>
                <img src="./icon/moawareLoginMain.png" alt='Down' name="login"/><br/>
                <img src="./icon/Line 1.png" alt='Down' name="login" className={LoginCSS.line}/><br/>
                <h1 className={LoginCSS.titleblue}>아이디 찾기</h1><br/>
                <label>사번
                <input 
                    className={LoginCSS.inputbox}
                    type="text" 
                    name="empCode"
                    />
                </label>
                <label>이름
                <input 
                    className={LoginCSS.inputbox}
                    type="text" 
                    name="empName"
                    />
                </label>
                <label>이메일
                <input 
                    className={LoginCSS.inputbox}
                    type="text" 
                    name="email"
                    />
                </label>
                <button className={LoginCSS.loginbutton}>아이디 찾기</button><br/>
                <div className={ LoginCSS.loginfind }>
                    <button >로그인</button><span>|</span><button >비밀번호 찾기</button>
                </div>
            </div>
        </div>
    )     
}

export default LoginIdFind;