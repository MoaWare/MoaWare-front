import SchModalCSS from './ScheduleModal.module.css';

function ScheduleModal({ setSchedule,setScheduleModal }) {

    /* 돌아가기 버튼 */
    const handleCancleEventClick = () => {
        setScheduleModal(false); // 모달을 닫음
    }

    return (
        <div className={SchModalCSS.modal}>
            <div className={SchModalCSS.modalContainer}>
                <div className={SchModalCSS.wrapper}>
                    <div>모달입니당모달입니당모달입니당모달입니당모달입니당모달입니당모달입니당모달입니당모달입니당</div>
                    <button
                        onClick={ handleCancleEventClick }
                    >
                    취소하기
                    </button>
                </div>
            </div>
        </div>
    );

}

export default ScheduleModal;