import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setBtnState } from '../../modules/WorkTimeModule';
import WorkNavbarCSS from '../../components/common/WorkNavbar.module.css';

function WorkTime({ onClickStartHandler, onClickEndHandler }) {
    
    const dispatch = useDispatch();
    const [today, setToday] = useState(new Date());
    // const [clickTime, setClickTime] = useState(new Date());
    const [workbtn, setWorkBtn ] = useState(false);
    const localBtn = localStorage.getItem('workbtn')
    const workbtnValue = localBtn === 'true'; // 문자열을 불리언으로 변환
    const [formattedTime, setFormattedTime] = useState('00:00:00');
    //리듀서는 안 써도 됨
    // const btn = useSelector(state => state.workTimeReducer.btn);
    useEffect(() => {
      

      if(workbtnValue) {
        const interval = 1000;
        const workLocalTime = localStorage.getItem('clickTime');
        const storedDate = new Date(workLocalTime)
        const timer = setInterval(() => {
          const workTime = new Date() - storedDate;
          
          const hours = Math.floor(workTime / 3600000).toString().padStart(2, '0');
          const min = Math.floor((workTime % 3600000) / 60000).toString().padStart(2, '0');
          const sec = Math.floor((workTime % 60000) / 1000).toString().padStart(2, '0');
          console.log(formattedTime);
          const newFormattedTime = `${hours}:${min}:${sec}`;
          setFormattedTime(newFormattedTime);
        }, interval);
        
        return () => {
            clearInterval(timer);
          };
        }
      }, [workbtn]);

    const handleStartClick = () => {
        //리듀서로 관리하는 btn을 가져오는 건데 안 써도 됨
        // dispatch(setBtnState(!btn));
        localStorage.setItem('clickTime', today);
        localStorage.setItem('workbtn', true);
        onClickStartHandler();
    }

    const handleEndClick = () => {
        // dispatch(setBtnState(!btn));
        onClickEndHandler();
        localStorage.removeItem('clickTime');
        localStorage.removeItem('workbtn');
    }

    return (
    <div>
        {formattedTime && (
        <p className={WorkNavbarCSS.ptime}>{formattedTime}</p>
        )}
        <div className={WorkNavbarCSS.workBtn}>
            <button className={WorkNavbarCSS.workBtn1} onClick={handleStartClick}>출근하기</button>
            <button className={WorkNavbarCSS.workBtn2} onClick={handleEndClick}>퇴근하기</button>
        </div>
    </div>
  );
}

export default WorkTime;