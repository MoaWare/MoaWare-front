import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setBtnState } from '../../modules/WorkTimeModule';
import WorkNavbarCSS from '../../components/common/WorkNavbar.module.css';

function WorkTime({ onClickStartHandler, onClickEndHandler }) {
    
    const dispatch = useDispatch();
    const [seconds, setSeconds] = useState(0)
    const btn = useSelector(state => state.workTimeReducer.btn);

    useEffect(() => {

        if(btn==true) {
          const timer = setInterval(() => {
            setSeconds(prevSeconds => prevSeconds + 1);
          }, 1000);
      
          return () => {
            clearInterval(timer);
          };
        }
      }, [seconds, btn]);

    const hours = Math.floor(seconds / 3600).toString().padStart(2, '0');
    const minutes = Math.floor((seconds % 3600) / 60).toString().padStart(2, '0');
    const formattedSeconds = (seconds % 60).toString().padStart(2, '0');

    const handleStartClick = () => {
        // setBtn(true);
        dispatch(setBtnState(!btn));
        onClickStartHandler();
    }

    const handleEndClick = () => {
        // setBtn(false);
        dispatch(setBtnState(!btn));
        onClickEndHandler();
    }

    console.log('워크타임의 버튼', btn);
    return (
    <div>
        <p className={WorkNavbarCSS.ptime}>{hours}:{minutes}:{formattedSeconds}</p>
        <div className={WorkNavbarCSS.workBtn}>
            <button className={WorkNavbarCSS.workBtn1} onClick={handleStartClick}>출근하기</button>
            <button className={WorkNavbarCSS.workBtn2} onClick={handleEndClick}>퇴근하기</button>
        </div>
    </div>
  );
}

export default WorkTime;