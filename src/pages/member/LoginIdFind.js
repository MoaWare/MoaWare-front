import { useDispatch, useSelector } from "react-redux";
import LoginCSS from './Loginfind.module.css';
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { callFindAccountAPI } from "../../apis/EmployeeAPICalls";
import LoginIdFindResult from "../../form/Login/LoginIdFindResult";
import { toast } from "react-toastify";



function LoginIdFind(){

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { id } = useSelector(state => state.employeeReducer);
    const [ form, setForm ] = useState({
        empCode : "",
        empName : "",
        email : ""
    });



    useEffect(() => {
        if( id?.state === 400 ){
            toast.error(id.message, {
                position: toast.POSITION.TOP_CENTER, 
                autoClose: 2000, 
                hideProgressBar: false, 
                progressStyle: {
                    backgroundColor: '#ff000074', 
                    height: '5px', 
                },
                });
            setForm({});
        }
    },[id])


    const onChangeHandler = (e) => {

        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };


    const onClickHandler =()=>{

        if(
            !form.empCode ||
            !form.empName ||
            !form.email
        ) {
            toast.error("정보를 모두 입력해주세요", {
                position: toast.POSITION.TOP_CENTER, 
                autoClose: 2000, 
                hideProgressBar: false, 
                progressStyle: {
                  backgroundColor: '#ff000074', 
                  height: '5px', 
                },
              });
            return;
        }

        dispatch(callFindAccountAPI(form));
    };

    const onClickLoginHandler = () => {
        navigate("/login");
    }

    const onClickPwdFindHandler = () => {
        navigate("/pwdfind");
    }

    return id ? <LoginIdFindResult/> : (
        <>
            <header className={LoginCSS.header}>
                <h3 className={LoginCSS.logo} onClick={()=>{navigate('/');}}>MOAWARE</h3>
            </header>
            <div className={LoginCSS.backgroundDiv}>
                <div className={ LoginCSS.loginDiv }>
                    <img src="./icon/moawareLoginMain.png" alt='Down' name="login"/><br/>
                    <img src="./icon/Line 1.png" alt='Down' name="login" className={LoginCSS.line}/>
                    <div className={LoginCSS.loginDivForm}>
                        <h1 className={LoginCSS.titleblue}>아이디 찾기</h1><br/>
                        <div className={LoginCSS.findFormInput}>
                            <label>사번
                            <input 
                                className={LoginCSS.inputbox}
                                type="text" 
                                name="empCode"
                                value={form.empCode}
                                onChange={onChangeHandler}
                                />
                            </label>
                            <label>이름 
                            <input 
                                className={LoginCSS.inputbox}
                                type="text" 
                                name="empName"
                                value={form.empName}
                                onChange={onChangeHandler}
                                />
                            </label>
                            <label>이메일
                            <input 
                                className={LoginCSS.inputbox}
                                type="text" 
                                name="email"
                                value={form.email}
                                onChange={onChangeHandler}
                                />
                            </label>
                        </div>
                        <button onClick={onClickHandler} className={LoginCSS.loginbutton}>아이디 찾기</button><br/>
                        <div className={ LoginCSS.loginfind }>
                            <button onClick={onClickLoginHandler}>로그인</button><span className={LoginCSS.spaceBar}>|</span><button onClick={onClickPwdFindHandler}>비밀번호 찾기</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )   
}

export default LoginIdFind;