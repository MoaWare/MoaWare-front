import { useState } from "react";
import { useDispatch } from "react-redux";
import { callLoginAPI } from "../../apis/MemberAPICalls";

function LoginForm() {
  const dispatch = useDispatch();

  // 폼 데이터를 한 번에 변경 및 state 저장
  const [form, setForm] = useState({
    memberId: "",
    memberPassword: "",
  });

  const onChangeHandler = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // 로그인 버튼 클릭 이벤트
  const onClickHandler = () => {
    dispatch(callLoginAPI(form));
  };

  return (
    <>
      <h1>로그인</h1>
      <input
        type="text"
        name="memberId"
        placeholder="아이디"
        autoComplete="off"
        onChange={onChangeHandler}
      />
      <input
        type="password"
        name="memberPassword"
        placeholder="패스워드"
        autoComplete="off"
        onChange={onChangeHandler}
        onKeyUp={onChangeHandler}
      />
      <button onClick={onClickHandler}>로그인</button>
    </>
  );
}

export default LoginForm;
