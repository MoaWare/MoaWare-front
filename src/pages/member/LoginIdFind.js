import { useDispatch, useSelector } from "react-redux";
import LoginForm from "../../form/LoginForm";
import LoginCSS from './Login.module.css';
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { resetEmp } from "../../modules/EmployeeModule";
import IdFind from "../../form/IdFind";


function LoginIdFind(){

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { login } = useSelector(state => state.employeeReducer);

    console.log(login+"-------------------------");
    useEffect(
        ()=>{
            console.log("dddddddd");
            if(login?.status === 200 ){
                alert(login?.message);
                navigate("/", { replace : true });
                dispatch(resetEmp());
            } else if(login?.status === 400 ){
                alert(login?.message);
                dispatch(resetEmp());
            }
        },[login]
    )


    return (
        <div className={LoginCSS.backgroundDiv}>
            <div className={ LoginCSS.loginDiv }>
                <img src="./icon/moawareLoginMain.png" alt='Down' name="login"/><br/>
                <img src="./icon/Line 1.png" alt='Down' name="login" className={LoginCSS.line}/><br/>
                <IdFind />
            </div>
        </div>
    )     
}

export default LoginIdFind;