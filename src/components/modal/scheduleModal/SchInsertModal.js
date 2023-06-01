import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import SchIModalCSS from './SchInsertModal.module.css';
import { callScheduleInsertAPI } from '../../../apis/ScheduleAPICalls';
import { FiX } from 'react-icons/fi';

function SchInsertModal({ setSchInsertModal }) {
  
  const dispatch = useDispatch();
  const { insert } = useSelector((state) => state.scheduleReducer);
  // const { schCode } = useParams();
  const [form, setForm] = useState({
    // schCode: schCode,
    schName: "",
    schContent: "",
    schDate: "",
    schEndDate: "",
    schType: {
      schCategoryCode: ""
    }
  })

  const onChangeHandler = (e) => {
    
    console.log("스케줄 타입 : ", e.target.name === 'schCategoryCode');

    if(e.target.name === 'schCategoryCode') {
      setForm({
        ...form,
        schType : {
          [e.target.name] : e.target.value
        }
      });
    } else {
      setForm({
          ...form,
          [e.target.name] : e.target.value
        });
      }
    }
    
    const SchInsertClick = () => {
      dispatch(callScheduleInsertAPI(form));
      console.log('인서트대라얍~', insert)
    };
    
    console.log('form', form);

  /* 생성 후 일정관리로 이동 */
  useEffect(() => {
    if(insert?.status === 200) {
      alert('일정 생성이 완료 되었습니다.');
      setSchInsertModal(false);
      window.location.reload(); // 새로고침
    }
  }, [insert]
  );
    
  /* 모달창 나가기 */
  const CancelInsertClick = () => {
    setSchInsertModal(false);
  };

  return (
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
            onChange={ onChangeHandler }
          />
        </div>
        <div className={SchIModalCSS.schDay}>
          <input
              type='date'
              name='schDate'
              onChange={ onChangeHandler }
              // required
              // aria-required="true"
            />
          <div className={SchIModalCSS.hyphen}>-</div>
          <input
              type='date'
              name='schEndDate'
              onChange={ onChangeHandler }
            />
        </div>
        <div className={SchIModalCSS.schList}>
          <select 
            name='schCategoryCode'
            onChange={ onChangeHandler }
            // value="none"
          >
            <option value="none" disabled >일정 분류</option>
            <option value="1">회사 일정</option>
            <option value="2">프로젝트 일정</option>
            <option value="3">직급별 일정</option>
            <option value="4">부서별 일정</option>
            <option value="5">팀별 일정</option>
            <option value="6">개인 일정</option>
          </select>
          <input
            type='text'
            name='schPrarticipant'
            placeholder='참여자'
            onChange={ onChangeHandler }
          />
        </div>
        {/* <div className={SchIModalCSS.schDetail}>일정 설명</div> */}
        <div className={SchIModalCSS.schCont}>
            <textarea
              name='schContent'
              placeholder='일정에 대한 설명을 입력해주세요.'
              onChange={ onChangeHandler }
            />
        </div>
        <div className={SchIModalCSS.schBtn}>
            <button 
              className={SchIModalCSS.schDel}
              onClick={CancelInsertClick}
            >
            취소
            </button>
            <button 
              className={SchIModalCSS.schMod}
              onClick={ SchInsertClick }
            >
            생성
          </button>
        </div>
      </div>
    </div>
  );

}

export default SchInsertModal;