import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import SchModalCSS from './ScheduleModal.module.css';
import { callScheduleInsertAPI } from '../../../apis/ScheduleAPICalls';
import { FiX } from 'react-icons/fi';

function SchInsertModal({ setSchInsertModal }) {

  // const { schCode } = useParams(); // schCode 가져오기

  const { schedule } = useSelector((state) => state.scheduleReducer);

  useEffect(() => {
    callScheduleInsertAPI(); // 함수 호출 수정
  }, []);

  /* 모달창 나가기 */
  const CancelInsertClick = () => {
    setSchInsertModal(false);
  };
  
  return schedule && (
    <div className={SchModalCSS.modal}>
      <div className={SchModalCSS.wrapper}>
        <FiX onClick={CancelInsertClick} />
        하이루입니당ㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋ
        하이루입니당ㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋ
        하이루입니당ㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋ
        하이루입니당ㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋ
        하이루입니당ㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋ
        하이루입니당ㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋ
        하이루입니당ㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋ
        하이루입니당ㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋ
        하이루입니당ㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋ
      </div>
    </div>
  );

}

export default SchInsertModal;