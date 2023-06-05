import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import MemCSS from './Member.module.css';
import { callMemberInfoAPI, callMemberModifyAPI } from "../../apis/MemberAPICalls";
import { toast } from "react-toastify";


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
    const [ file, setFile ] = useState({ });
    const [ isCheck , setIsCheck ] = useState(false);
    const userImage = '../icon/user.jpg';
    
    /* 회원 정보 조회 */
    useEffect(()=>{

        dispatch(callMemberInfoAPI());

    },[]);


    /* 기본값 설정 */
    useEffect(()=>{

        if(info){

            const { email, phone, extensionNum } = info;
        
            setForm({ empPwd: '', email, phone, extensionNum });
        }

    },[info]);


    /* 비밀번호 유효성 검사 */
    useEffect(()=>{

        const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]{10,18}$/;

        if(passwordRegex.test(form?.empPwd)){
            setIsCheck(true);
        } else {
            setIsCheck(false);
        }

    },[form])


    /* 이미지 업로드 */
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
    }, [image]);


    const { modify } = useSelector(state => state.memberReducer);
    
    useEffect(() => {
        if(modify?.status === 200) {
            toast.success(modify?.message, {
                position: toast.POSITION.TOP_CENTER, 
                autoClose: 2000, 
                hideProgressBar: false,
              });
            navigate('/');
        }
    }, [modify]);



    const onChangeHandler = (e) => {

        setForm({
            ...form,
            [e.target.name] : e.target.value
        });
        console.log(e.target.value);
    };

    const onChangeImageUpload = (e) => {
        const image = e.target.files[0];
        setImage(image);
    }

    const onClickImageUpload = () => {
        imageInput.current.click();
    }    

    /* 수정 버튼 클릭 이벤트 */
    const onClickHandler = () => {

        if( !form.empPwd ||
            !form.email ||
            !form.phone ||
            !form.extensionNum 
            ){
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
        
        if(!isCheck){
            alert("비밀번호 양식 오류  \n영문, 숫자를 포함한 10~14자 이내로 작성해주세요.");
        }
        

        console.log("callLoginAPI",form);

        const formData = new FormData();

        formData.append("fileCategory.emp.empPwd", form?.empPwd);
        formData.append("fileCategory.emp.email", form?.email);
        formData.append("fileCategory.emp.phone", form?.phone);
        formData.append("fileCategory.emp.extensionNum", form?.extensionNum);

        if(image){
            formData.append("fileInfo", image);
        }

        console.log("formData", formData);

        dispatch(callMemberModifyAPI(formData));
    }

    useEffect(()=>{
        
        if(info){
    
            info.fileCategory.forEach((file) => {
    
                if(file.fcategoryType === 'emp'){

                    setFile(file);
                    
                    return;
                }
            });
        }
    },[info]);
    
    console.log("file",file?.file?.filePath);

    return info && (
        <div className={MemCSS.wrapper}>
            <div className={MemCSS.divTop}>
                <h1>회원 정보 수정</h1><br/>
                <hr />
            </div>
            <div className={MemCSS.divMiddle}>
                <div className={MemCSS.midFrist}>
                    <div className={ MemCSS.memberImageDiv }>
                    <img 
                        src={ !imageUrl ? file?.file?.filePath : imageUrl } 
                        className={ MemCSS.memberImage } 
                        onError={(e) => { e.target.src = userImage; }}
                        alt='profile'
                        />
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
                            onChange={ onChangeHandler }
                            value={ form?.email }
                            />
                    </label>
                    <label className={MemCSS.midForm}>
                        핸드폰
                        <input 
                            type="text" 
                            name="phone"
                            onChange={ onChangeHandler }
                            value={ form?.phone }
                            />
                    </label>
                    <label className={MemCSS.midForm}>
                        내선번호
                        <input 
                            type="text" 
                            name="extensionNum"
                            onChange={ onChangeHandler }
                            value={  form?.extensionNum  }
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