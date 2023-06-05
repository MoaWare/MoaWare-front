import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import SchModalCSS from './SchModifyModal.module.css';
import { callScheduleDetailAPI, callScheduleModifyAPI } from '../../../apis/ScheduleAPICalls';
import { FiX } from 'react-icons/fi';
import moment from 'moment/moment';

function SchModifyModal({ setSchModifyModal }) {
  
  const dispatch = useDispatch();
  const { schedule } = useSelector((state) => state.scheduleReducer);

  const schCode = schedule.schCode;

  /* 일정 저장 */
  const SaveEventClick = () => {
    dispatch(callScheduleModifyAPI({schCode}));
    alert('일정이 수정 되었습니다.')
  }

  /* 일정 수정 */
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
  const [modifyMode, setModifyMode] = useState(false);
  const { modify } = useSelector(state => state.scheduleReducer);
  
  const ModifyEventClick = () => {
    setModifyMode(true)
    setForm({ ...schedule });
  }

  const onChangeHandler = (e) => {
    
    console.log("일정 타입 : ", e.target.name === 'schCategoryCode');

    if(e.target.name === 'schCategoryCode') {
      setForm({
        ...form,
        schType : {
          [e.target.name] : e.target.value
        }
      });
               
    } else if(e.target.name === 'schMember') {

      const schPrarticipant = [];
      schPrarticipant.push(
        {
          schPrarPk: {
            schCode: 0,
            schMember : e.target.value
          }  
        }
      )
      
      setForm({
        ...form, schPrarticipant
      });
    } else {
      setForm({
        ...form,
        [e.target.name] : e.target.value
      });
    }

  }

    useEffect(() => {
        dispatch(callScheduleDetailAPI({ schCode }));
    }, []);

    
  useEffect(
    () => {
      if(modify?.status === 200) {
        alert('일정 수정이 완료 되었습니다.');
      }
  }, [modify])

  /* 모달창 나가기 */
  const CancelEventClick = () => {
    // setScheduleModal(false);
    setSchModifyModal(false);
  };

  const participantNames = schedule&&schedule.schPrarticipant.map(
    (item) => item.schMember.empName
  );

  /* 날짜 시간제외 */
  const formatDate = (dateString) => {
    return moment(dateString).format('YYYY년 MM월 DD일');
  };
  
  return schedule && (
//   return (
    <div className={SchModalCSS.modal}>
      <div className={SchModalCSS.wrapper}>
        <div className={SchModalCSS.schCheck}>
          <div className={SchModalCSS.check}>일정 수정</div>
          <FiX onClick={CancelEventClick} />
        </div>
        <div className={SchModalCSS.schTitle}>
          <input
            type='text'
            name='schName'
            placeholder='일정을 입력해주세요.'
            onChange={ onChangeHandler }
            value={ schedule? schedule.schName : schedule.schName }
        />
        </div>
        <div className={SchModalCSS.schDay}>
          <input
              type='date'
              name='schDate'
              onChange={ onChangeHandler }
              // required
              // aria-required="true"
              value={ schedule? schedule.schDate : schedule.schDate }
            />
          <div className={SchModalCSS.hyphen}>-</div>
          <input
              type='date'
              name='schEndDate'
              onChange={ onChangeHandler }
              value={ schedule? schedule.schEndDate : schedule.schEndDate }
            />
        </div>
        <div className={SchModalCSS.schList}>
          <select 
            name='schCategoryCode'
            onChange={ onChangeHandler }
            // value="none"
            value={ schedule? schedule.schCategoryCode : schedule.schCategoryCode }
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
            name='schMember'
            placeholder='참여자'
            onChange={ onChangeHandler }
            value={ schedule? schedule.schMember : schedule.schMember }
          />
        </div>
        <div className={SchModalCSS.schPrar}>
            <span>일정 참여자</span>
        </div>
        {/* <div className={SchModalCSS.schDetail}>일정 내용</div> */}
        <div className={SchModalCSS.schCont}>
            <textarea
              name='schContent'
              placeholder='일정에 대한 설명을 입력해주세요.'
              onChange={ onChangeHandler }
              value={ schedule? schedule.schContent : schedule.schContent }
            />
        </div>
        <div className={SchModalCSS.schBtn}>
            <button 
              className={SchModalCSS.schDel}
              onClick={SaveEventClick}
            >저장</button>
        </div>
      </div>
    </div>
  );
}

export default SchModifyModal;