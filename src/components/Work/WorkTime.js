import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setBtnState } from '../../modules/WorkTimeModule';
import WorkNavbarCSS from '../../components/common/WorkNavbar.module.css';

function WorkTime({ onClickStartHandler, onClickEndHandler }) {
    
    const dispatch = useDispatch();
    const [today, setToday] = useState(new Date());
    // const [clickTime, setClickTime] = useState(new Date());
    const [seconds, setSeconds] = useState(0)
    const [formattedTime, setFormattedTime] = useState('00:00:00');
    const btn = useSelector(state => state.workTimeReducer.btn);
    useEffect(() => {
      
      if(btn===true) {
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
      }, [btn]);

    const handleStartClick = () => {
        // setBtn(true);
        dispatch(setBtnState(!btn));
        localStorage.setItem('clickTime', today);
        onClickStartHandler();
    }

    const handleEndClick = () => {
        // setBtn(false);
        dispatch(setBtnState(!btn));
        localStorage.removeItem('clickTime');
        onClickEndHandler();
    }

    console.log('워크타임의 버튼', btn);
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

// import { useState, useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { setBtnState } from '../../modules/WorkTimeModule';
// import WorkNavbarCSS from '../../components/common/WorkNavbar.module.css';

// function WorkTime({ onClickStartHandler, onClickEndHandler }) {
    
//     const dispatch = useDispatch();
//     const [seconds, setSeconds] = useState(0)
//     const btn = useSelector(state => state.workTimeReducer.btn);

//     useEffect(() => {

//         if(btn==true) {
//           const interval = 1000;
//           const timer = setInterval(() => {
//             setSeconds(prevSeconds => prevSeconds + 1);
//           }, interval);
      
//           return () => {
//             clearInterval(timer);
//           };
//         }
//       }, [seconds, btn]);

//     const hours = Math.floor(seconds / 3600).toString().padStart(2, '0');
//     const minutes = Math.floor((seconds % 3600) / 60).toString().padStart(2, '0');
//     const formattedSeconds = (seconds % 60).toString().padStart(2, '0');

//     const handleStartClick = () => {
//         // setBtn(true);
//         dispatch(setBtnState(!btn));
//         onClickStartHandler();
//     }

//     const handleEndClick = () => {
//         // setBtn(false);
//         dispatch(setBtnState(!btn));
//         onClickEndHandler();
//     }

//     console.log('워크타임의 버튼', btn);
//     return (
//     <div>
//         <p className={WorkNavbarCSS.ptime}>{hours}:{minutes}:{formattedSeconds}</p>
//         <div className={WorkNavbarCSS.workBtn}>
//             <button className={WorkNavbarCSS.workBtn1} onClick={handleStartClick}>출근하기</button>
//             <button className={WorkNavbarCSS.workBtn2} onClick={handleEndClick}>퇴근하기</button>
//         </div>
//     </div>
//   );
// }

// export default WorkTime;