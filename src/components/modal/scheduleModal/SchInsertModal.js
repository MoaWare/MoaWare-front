import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import SchIModalCSS from './SchInsertModal.module.css';
import { callScheduleInsertAPI } from '../../../apis/ScheduleAPICalls';
import { FiX } from 'react-icons/fi';

function SchInsertModal({ setSchInsertModal }) {

  const { schedule } = useSelector((state) => state.scheduleReducer);

  useEffect(() => {
    callScheduleInsertAPI();
  }, []);

  /* 모달창 나가기 */
  const CancelInsertClick = () => {
    setSchInsertModal(false);
  };
  
  return schedule && (
    <div className={SchIModalCSS.modal}>
      <div className={SchIModalCSS.wrapper}>
        <div className={SchIModalCSS.schCheck}>
          <div className={SchIModalCSS.check}>일정 생성</div>
          <FiX onClick={CancelInsertClick} />
        </div>
        <div className={SchIModalCSS.schTitle}>
          <input
            type='text'
            name='schName'
            placeholder='일정을 입력해주세요.'
          />
        </div>
        <div className={SchIModalCSS.schDay}>
          <input
              type='date'
              name='schDate'
              // required
              // aria-required="true"
            />
          <div className={SchIModalCSS.hyphen}>-</div>
          <input
              type='date'
              name='schEndDate'
            />
        </div>
        <div className={SchIModalCSS.schList}>
          {/* <select>
            <option value="none" disabled selected>일정 분류</option>
            <option>회사 일정</option>
            <option>프로젝트 일정</option>
            <option>직급별 일정</option>
            <option>부서별 일정</option>
            <option>팀별 일정</option>
            <option>개인 일정</option>
          </select> */}
          <input
            type='text'
            name='schPrarticipant'
            placeholder='참석자'
          />
        </div>
        <div className={SchIModalCSS.schCont}>
            <input
              type='text'
              name='schContent'
              placeholder='일정에 대한 설명을 입력해주세요.'
            />
        </div>
        <div className={SchIModalCSS.schBtn}>
            <button className={SchIModalCSS.schDel}>삭제</button>
            <button className={SchIModalCSS.schMod}>수정</button>
        </div>
        <div></div>
      </div>
    </div>
  );

}

export default SchInsertModal;