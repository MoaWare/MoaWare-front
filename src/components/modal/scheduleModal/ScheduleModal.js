import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import SchModalCSS from './ScheduleModal.module.css';
import { callScheduleDetailAPI } from '../../../apis/ScheduleAPICalls';
import { FiX } from 'react-icons/fi';

function ScheduleModal({ setScheduleModal }) {
  
  const { schCode } = useParams(); // schCode 가져오기

  const { schedule } = useSelector((state) => state.scheduleReducer);

  useEffect(() => {
    callScheduleDetailAPI({ schCode }); // 함수 호출 수정
  }, [schCode]);

  /* 모달창 나가기 */
  const CancelEventClick = () => {
    setScheduleModal(false);
  };

  const participantNames = schedule.schPrarticipant.map(
    (item) => item.schMember.empName
  );
  
  return schedule && (
    <div className={SchModalCSS.modal}>
      <div className={SchModalCSS.wrapper}>
        <div className={SchModalCSS.schCheck}>
          <div className={SchModalCSS.check}>일정 조회</div>
          <FiX onClick={CancelEventClick} />
        </div>
        <div className={SchModalCSS.schTitle}>
          <div className={SchModalCSS.box}></div>
          <div>{schedule.schName}</div>
        </div>
        <div className={SchModalCSS.schDay}>
            <div>{schedule.schDate}</div>
            <div>{schedule.schEndDate}</div>
        </div>
        <div className={SchModalCSS.schPrar}>일정 참여자</div>
        <div className={SchModalCSS.schPrarList}>
            <div className={SchModalCSS.aut}>{schedule.schAuthor.empName}</div>
            <div className={SchModalCSS.prar}>{participantNames.join(', ')}</div>
        </div>
        <div className={SchModalCSS.schDetail}>일정 설명</div>
        <div className={SchModalCSS.schCont}>{schedule.schContent}</div>
        <div className={SchModalCSS.schBtn}>
            <button className={SchModalCSS.schDel}>삭제</button>
            <button className={SchModalCSS.schMod}>수정</button>
        </div>
      </div>
    </div>
  );
}

export default ScheduleModal;