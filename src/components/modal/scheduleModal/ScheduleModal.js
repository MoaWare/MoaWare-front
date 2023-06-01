import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import SchModalCSS from './ScheduleModal.module.css';
import { callScheduleDetailAPI, callScheduleDeleteAPI } from '../../../apis/ScheduleAPICalls';
import { FiX } from 'react-icons/fi';
import moment from 'moment/moment';

function ScheduleModal({ setScheduleModal, schCode: modalSchCode }) {
  const { schCode } = useParams();
  const { schedule, delsch } = useSelector((state) => state.scheduleReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    callScheduleDetailAPI({ schCode });
  }, [schCode]);

  const CancelEventClick = () => {
    setScheduleModal(false);
  };

  const participantNames = schedule && schedule.schPrarticipant.map((item) => item.schMember.empName);

  const formatDate = (dateString) => {
    return moment(dateString).format('YYYY년 MM월 DD일');
  };

  const DeleteEventClick = async () => {
    await dispatch(callScheduleDeleteAPI(modalSchCode));
    console.log('삭제좀해줘', delsch);
  };

  useEffect(() => {
    if (delsch?.status === 200) {
      alert('일정이 삭제되었습니다.');
    }
  }, [delsch]);
  
  return schedule && (
    <div className={SchModalCSS.modal}>
      <div className={SchModalCSS.wrapper}>
        <div className={SchModalCSS.schCheck}>
          <div className={SchModalCSS.check}>일정 조회</div>
          <FiX onClick={ CancelEventClick } />
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
        <div className={SchModalCSS.schDetail}>일정 설명</div>
        <div className={SchModalCSS.schCont}>{schedule.schContent}</div>
        <div className={SchModalCSS.schBtn}>
            <button 
              className={SchModalCSS.schDel}
              onClick={ DeleteEventClick }
            >
            삭제
            </button>
            {/* { getMemberId() === task?.author?.empID && (<button onClick={ updateClick }>수정</button>) } */}
            <button className={SchModalCSS.schMod}>수정</button>
        </div>
      </div>
    </div>
  );
}

export default ScheduleModal;