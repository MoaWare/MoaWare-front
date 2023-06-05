import { useDispatch, useSelector } from 'react-redux';
import SchModalCSS from './ScheduleModal.module.css';
import { callScheduleDeleteAPI } from '../../../apis/ScheduleAPICalls';
import { FiX } from 'react-icons/fi';
import moment from 'moment/moment';
import { useState } from 'react';
import SchModifyModal from '../../modal/scheduleModal/SchModifyModal';

function ScheduleModal({ setScheduleModal }) {
  const dispatch = useDispatch();
  const { schedule } = useSelector((state) => state.scheduleReducer);

  /* 일정 삭제 */
  const DeleteEventClick = () => {
    const schCode = schedule.schCode;
    dispatch(callScheduleDeleteAPI({ schCode }));
    alert('일정이 삭제되었습니다.');
  };

  /* 일정 수정 */
  const [schModifyModal, setSchModifyModal] = useState(false);
  const ModifyEventClick = () => {
    // setScheduleModal(false);
    setSchModifyModal(true);
  };

  /* 모달창 나가기 */
  const CancelEventClick = () => {
    setScheduleModal(false);
  };

  const participantNames = schedule && schedule.schPrarticipant.map((item) => item.schMember.empName);

  /* 날짜 시간제외 */
  const formatDate = (dateString) => {
    return moment(dateString).format('YYYY년 MM월 DD일');
  };

  return schedule && (
    <>
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
            <div>{formatDate(schedule.schDate)}</div>
            <div className={SchModalCSS.hyphen}>-</div>
            <div>{formatDate(schedule.schEndDate)}</div>
          </div>
          <div className={SchModalCSS.schPrar}>일정 참여자</div>
          <div className={SchModalCSS.schPrarList}>
            <div className={SchModalCSS.aut}>{schedule.schAuthor.empName}</div>
            <div className={SchModalCSS.prar}>{participantNames.join(', ')}</div>
          </div>
          <div className={SchModalCSS.schDetail}>일정 내용</div>
          <div className={SchModalCSS.schCont}>{schedule.schContent}</div>
          <div className={SchModalCSS.schBtn}>
            <button className={SchModalCSS.schDel} onClick={DeleteEventClick}>
              삭제
            </button>
            <button className={SchModalCSS.schMod} onClick={ModifyEventClick}>
              수정
            </button>
          </div>
        </div>
      </div>
      {schModifyModal && (
        <SchModifyModal setSchModifyModal={setSchModifyModal} schedule={schedule} />
      )}
    </>
  );
}

export default ScheduleModal;