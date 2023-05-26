import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import SchModalCSS from './ScheduleModal.module.css';
import { callScheduleDetailAPI } from '../../../apis/ScheduleAPICalls';
import { FiX } from 'react-icons/fi';

function ScheduleModal({ setScheduleModal }) {
    const { schCode } = useParams(); // schCode 가져오기

    const { schedule } = useSelector((state) => state.scheduleReducer);

    console.log('schCode 확인! : ', schCode);

    useEffect(() => {
        (callScheduleDetailAPI({ schCode }));
    }, [schCode]);

    console.log('schCode 확인!! : ', schCode);

    /* 모달창 나가기 */
    const handleCancelEventClick = () => {
        setScheduleModal(false);
    };

    return schedule && (
        <div className={SchModalCSS.modal}>
            <div className={SchModalCSS.wrapper}>
                <div className={SchModalCSS.title}>
                    <div>일정 조회</div>
                    <FiX onClick={handleCancelEventClick} />
                </div>
                {schedule && (
                    <div key={schedule.schCode}>
                        <input
                            type='text'
                            name='schName'
                            readOnly={true}
                            value={schedule.schName}
                        />
                        <div>{schedule.schName}</div>
                        <div>{schedule.schDate}</div>
                        <div>{schedule.schEndDate}</div>
                        <div>일정 참여자</div>
                        <div>생성자 : {schedule.schAuthor}</div>
                        {/* <div>{schedule.schPrarticipant && schedule.schPrarticipant.join(', ')}</div> */}
                        <div>참여자 : {schedule.schPrarticipant.schPrarPk}</div>
                        <div>일정 설명</div>
                        <div>{schedule.schContent}</div>
                    </div>
                )}
                <button>삭제</button>
                <button>수정</button>
            </div>
        </div>
    );
}

export default ScheduleModal;