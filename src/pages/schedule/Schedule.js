import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import googleCalendarPlugin from '@fullcalendar/google-calendar';
import interactionPlugin from '@fullcalendar/interaction';
import '../schedule/Schedule.css';
import { callScheduleListAPI, callScheduleDetailAPI } from '../../apis/ScheduleAPICalls';
import ScheduleModal from '../../components/modal/scheduleModal/ScheduleModal';

function Schedule() {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { schedules, schedule } = useSelector(state => state.scheduleReducer);
  const [scheduleModal, setScheduleModal] = useState(false);

  useEffect(() => {
    dispatch(callScheduleListAPI());
  }, []);

  const handleEventDrop = (info) => {
    console.log('일정을 옮길래! :', info.event);
  };

  const getEventColor = (categoryCode) => {
    switch (categoryCode) {
      case 1:
        return 'rgba(215, 201, 254, 0.5)';
      case 2:
        return 'rgba(253, 208, 208, 0.5)';
      case 3:
        return 'rgba(252, 232, 163, 0.5)';
      case 4:
        return 'rgba(218, 245, 141, 0.5)';
      case 5:
        return 'rgba(205, 238, 249, 0.5)';
      case 6:
        return 'rgba(178, 226, 195, 0.5)';
      default:
        return 'rgb(238, 238, 238, 0.5)';
    }
  };

  /* 전체 일정 */
  const formattedEvents = schedules?.map(event => ({
    // title: event.schType.schCategoryName,
    title: event.schName,
    start: event.schDate,
    end: event.schEndDate,
    allDay: true,
    backgroundColor: getEventColor(event.schType.schCategoryCode),
    id: event.schCode
  })) || [];

  /* 상세 일정 */
  const handleEventClick = (info) => {
    const schCode = info.event.id; // Get the event id
      dispatch(callScheduleDetailAPI({ schCode }));
      setScheduleModal(true);
      console.log('handleEventClick', scheduleModal);
  };

  /* 모달창! */
  // useEffect(() => {
  //   if (schedule) {
  //     console.log('일정 누르기!: ', schedule);
  //     setScheduleModal(true);
  //   }
  // }, [schedule]);

  return (
    <>
      { scheduleModal ? <ScheduleModal setScheduleModal={setScheduleModal} schedule={schedule} /> : null }
      <div className="wrapper">
        <div className="wrap">
          <FullCalendar
            plugins={[dayGridPlugin, googleCalendarPlugin, interactionPlugin]}
            // googleCalendarApiKey={process.env.REACT_APP_GOOGLE_API_KEY}
            headerToolbar={{
              left: 'prev,today,next',
              center: 'title',
              right: 'dayGridYear,dayGridMonth,dayGridWeek,dayGridDay',
            }}
            buttonText={{
              year: '연간',
              month: '월간',
              week: '주간',
              day: '일간',
              today: '오늘',
            }}
            locale="ko"
            editable={true}
            events={formattedEvents}
            eventDrop={handleEventDrop}
            eventClick={handleEventClick}
          />
        </div>
      </div>
    </>
  );
}

export default Schedule;