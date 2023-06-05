import { useDispatch, useSelector } from "react-redux";
import LoginForm from "../../form/Login/LoginForm";
import LoginCSS from './Login.module.css';
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { resetEmp } from "../../modules/EmployeeModule";
import { toast } from "react-toastify";


function Login(){

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { login } = useSelector(state => state.employeeReducer);
    

    useEffect(()=>{

        if( login?.status === 200 ){
            navigate("/", { replace : true });
            dispatch(resetEmp());

        } else if( login?.state === 400 ){
            toast.error(login.message, {
                position: toast.POSITION.TOP_CENTER, 
                autoClose: 2000, 
                hideProgressBar: false, 
                progressStyle: {
                    backgroundColor: '#ff000074', 
                    height: '5px'},
                });
            dispatch(resetEmp());   
        }
        },[login]
    );


    return (
        <>
            <header className={LoginCSS.header}>
                <h3 className={LoginCSS.logo}>MOAWARE</h3>
            </header>
            <div className={LoginCSS.backgroundDiv}>
                <div className={ LoginCSS.loginDiv }>
                    <img src="./icon/moawareLoginMain.png" alt='Down' name="login"/><br/>
                    <img src="./icon/Line 1.png" alt='Down' name="login" className={LoginCSS.line}/><br/>
                    <LoginForm />
                </div>
            </div>
        </>
    )     
}

export default Login;