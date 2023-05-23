import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import MemCSS from './Member.module.css';
import { callMemberInfoAPI } from "../../apis/MemberAPICalls";

function MemberInfoModify(){

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const imageInput = useRef();
    const { info } = useSelector((state) => state.memberReducer);
    const [ image , setImage ] = useState(null);
    const [ form , setForm ] = useState({ 
        empPwd : "",
        email : "",
        phone : "",
        extensionNum : ""
     });
    const [imageUrl, setImageUrl] = useState('');
    const [ isCheck , setIsCheck ] = useState(false);


    const onChangeHandler = (e) => {

        setForm({
            ...form,
            [e.target.name] : e.target.value
        });
    };
    
    useEffect(()=>{
        dispatch(callMemberInfoAPI());
    },[]);

    useEffect(() => {
        if(image) {
            const fileReader = new FileReader();
            fileReader.onload = (e) => {
                const { result } = e.target;
                if(result) {
                    setImageUrl(result);
                }
            }
            fileReader.readAsDataURL(image);
        }
    }, 
    [image]
    );

    useEffect(()=>{

        const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]{10,18}$/;

        if(passwordRegex.test(form?.empPwd)){
            setIsCheck(true);
        } else {
            setIsCheck(false);
        }

    },[form])

    const onChangeImageUpload = (e) => {
        const image = e.target.files[0];
        setImage(image);
    }

    const onClickImageUpload = () => {
        imageInput.current.click();
    }    

    const onClickHandler = () => {
        console.log("callLoginAPI",form);
        // dispatch(callMemberInfoLoginAPI(form));
    }

    const onEnterKeyHandler = (e) => {
        if(e.key === 'Enter' ) {
            console.log("callLoginAPI",form);
            // dispatch(callMemberInfoLoginAPI(form));
        }
    }

    return info && (
        <div className={MemCSS.wrapper}>
            <div className={MemCSS.divTop}>
                <h1>회원 정보 수정</h1><br/>
                <hr />
            </div>
            <div className={MemCSS.divMiddle}>
                <div className={MemCSS.midFrist}>
                    <div className={ MemCSS.memberImageDiv }>
                    <img src={ !imageUrl ? info.fileCategory.file.filePath : imageUrl} className={ MemCSS.memberImage } alt="preview"/>
                        <input                
                            style={{ display: 'none' }}
                            type="file"
                            name='productImage' 
                            accept='image/jpg,image/png,image/jpeg,image/gif'
                            onChange={ onChangeImageUpload }
                            ref={ imageInput }
                        />
                        <button 
                            className={ MemCSS.memberImageButton }
                            onClick={ onClickImageUpload } 
                        >
                            프로필 사진 변경
                            </button>
                    </div>
                </div>
                <div className={MemCSS.midSec}>
                    <div className={MemCSS.midContent}>
                        <span>사번</span> <span>{ info?.empCode }</span><br/>
                    </div>
                    <div className={MemCSS.midContent}>
                        <span>이름</span> <span>{ info?.empName }</span><br/>
                    </div>
                    <div className={MemCSS.midContent}>
                        <span>부서</span> <span>{ info?.dept?.deptName }</span><br/>
                    </div>
                    <div className={MemCSS.midContent}>
                        <span>직급</span> <span>{ info?.job?.jobName }</span><br/>
                    </div>
                </div>
                <div className={MemCSS.midThird}>
                    <label className={MemCSS.midForm}>
                        비밀번호
                        <input 
                            type="password" 
                            name="empPwd"
                            placeholder="********************************"
                            autoComplete="off"
                            onChange={ onChangeHandler }
                            value={form.empPwd}
                            />
                    </label>
                    { !isCheck && <span className={MemCSS.pwdInfo}>영문, 숫자를 포함한 10~14자 이내로 작성해주세요.</span> }
                    <label className={MemCSS.midForm}>
                        이메일
                        <input 
                            type="email" 
                            name="email"
                            placeholder={ info?.email }
                            onChange={ onChangeHandler }
                            value={form.email}
                            />
                    </label>
                    <label className={MemCSS.midForm}>
                        핸드폰
                        <input 
                            type="text" 
                            name="phone"
                            placeholder={ info?.phone }
                            onChange={ onChangeHandler }
                            value={form.phone}
                            />
                    </label>
                    <label className={MemCSS.midForm}>
                        내선번호
                        <input 
                            type="text" 
                            name="extensionNum"
                            placeholder={ info?.extensionNum }
                            onChange={ onChangeHandler }
                            value={form.extensionNum}
                            />
                    </label>
                </div>
            </div>
            <div className={MemCSS.divLow}>
                <button onClick={onClickHandler} className={MemCSS.loginbutton}>수 정</button><br/>
            </div>
        </div>
    )
}

export default MemberInfoModify;