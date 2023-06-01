import { useNavigate } from 'react-router-dom';
import WorkBtnCSS from './WorkBtn.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { callTimeInsertAPI, callTimeQuitAPI } from '../../apis/WorkAPICalls';
import WorkTime from '../Work/WorkTime';
import { setBtnState } from '../../modules/WorkTimeModule';

function WorkBtn() { // 컴포넌트 이름을 대문자로 시작하도록 수정
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { myWork } = useSelector(state => state.workReducer);
  const btn = useSelector(state => state.workTimeReducer.btn);
  const { insert } = useSelector(state => state.workReducer);
  const { quit } = useSelector(state => state.workReducer);

  const onClickStartTime = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");
    const workDate = `${year}-${month}-${day}`;
    dispatch(callTimeInsertAPI({ workDate }));
  };
  
  const onClickEndTime = () => {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const min = now.getMinutes().toString().padStart(2, '0');
    const sec = now.getSeconds().toString().padStart(2, '0');
    const quitTime = new Date().toISOString().substr(0, 11) + `${hours}:${min}:${sec}`;
    console.log(quitTime);
    dispatch(callTimeQuitAPI({ quitTime }));
  };

  useEffect(() => {
    if (insert?.status === 200) {
      alert('출근 등록 되었습니다.');
      navigate("/work");
    } else if (insert?.state === 400) {
      alert(insert.message);
    }

    if (quit?.status === 200) {
      alert('퇴근 등록 되었습니다.');
      navigate("/work");
    } else if (quit?.state === 400) {
      alert(quit.message);
    }
  }, [insert, quit]);

  // console.log('insert: ', insert);
  // console.log('btn: ', btn);

  return (
    <nav className={WorkBtnCSS.navbar}>
      <div className={WorkBtnCSS.wrap2}>
        {myWork ? (
          <div>
            <p className={WorkBtnCSS.p}>근태 관리</p>
            <div className={WorkBtnCSS.ptime}></div>
            <div className={WorkBtnCSS.workBtn}>
              <WorkTime
                onClickStartHandler={onClickStartTime}
                onClickEndHandler={onClickEndTime}
              />
            </div>
            {myWork.data && myWork.data.length > 0 ? (
              <div className={WorkBtnCSS.p2} key={myWork.data[0].workPk.workTime}>
                <div>
                  <p className={WorkBtnCSS.ptime2}>출근시간</p>
                  <p className={WorkBtnCSS.ptime2}>{myWork.data[0].workTime ? myWork.data[0].workTime.substring(11, 19) : ""}</p>
                </div>
                <div>
                  <p className={WorkBtnCSS.ptime2}>퇴근시간</p>
                  <p className={WorkBtnCSS.ptime2}>{myWork.data[0].quitTime ? myWork.data[0].quitTime.substring(11, 19) : ""}</p>
                </div>
              </div>
            ) : 
            // data객체가 없다면
            (
              <div>
                <p></p>
              </div>
            )}
          </div>
        ) : 
        // mywork 가없다면
        (
          <div>

          </div>
        )}
      </div>
    </nav>
  );
}

export default WorkBtn;