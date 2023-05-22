import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import LoginCSS from "./Login.module.css"
import { useNavigate } from "react-router-dom";
import { callMemberInfoLoginAPI } from "../../apis/MemberAPICalls";
import MemCSS from './Member.module.css';

function MemberInfo(){

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { member } = useSelector((state) => state.memberReducer);

    const [form,setForm] = useState({
        empPwd : ""
    });

    useEffect(()=>{
        if(member?.status === 200){
            navigate('/member/modify');
            console.log("/navigate");
        }
    },[member]);

    const onChangeHandler = (e) => {
        setForm({
            [e.target.name] : e.target.value
        });
    };
    
    const onClickHandler = () => {
        console.log("callLoginAPI",form);
        dispatch(callMemberInfoLoginAPI(form));
    }

    const onClickPwdHandler = () => {
        navigate('/pwdfind');
    }

    const onEnterKeyHandler = (e) => {
        if(e.key === 'Enter' ) {
            console.log("callLoginAPI",form);
            dispatch(callMemberInfoLoginAPI(form));
        }
    }

    return (
        <>
            <img className={MemCSS.mainImg} src="./icon/moawareLoginMain.png" alt='Down' name="login"/><br/>
            <img className={MemCSS.hrImg} src="./icon/Line 1.png" alt='Down' name="login" /><br/>
            <div className={MemCSS.formDiv}>
                <p className={MemCSS.fromDiv}>회원 정보 수정</p><br/>
                <span className={LoginCSS.subtitleTiny}>회원정보 수정을 위해 비밀번호를 입력해주세요.</span><br/>
                <input 
                    type="password" 
                    name="empPwd"
                    placeholder="비밀번호"
                    autoComplete="off"
                    onChange={ onChangeHandler }
                    onKeyUp={ onEnterKeyHandler }
                    /><br/>
                <button onClick={onClickHandler} className={MemCSS.loginbutton}>확 인</button><br/>
                <div className={ MemCSS.buttonCenter }>
                    <button onClick={ onClickPwdHandler }>비밀번호 찾기</button>
                </div>
            </div>
        </>
    )
}

export default MemberInfo;