import { useDispatch, useSelector } from "react-redux";
import Loginform from "../../form/LoginForm";
import { useEffect } from "react";


function Login(){

    const dispatch = useDispatch();

    const {login} = useSelector();

    useEffect(
        ()=>{

        },[]
    )

    

    return (
            <Loginform/>
    )
}

export default Login;