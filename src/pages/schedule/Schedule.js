import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import googleCalendarPlugin from '@fullcalendar/google-calendar';
import interactionPlugin from '@fullcalendar/interaction';
import '../schedule/Schedule.css';
import { callScheduleListAPI } from '../../apis/ScheduleAPICalls';
import ScheduleModal from '../../components/modal/scheduleModal/ScheduleModal';

function Schedule() {
    
  const handleEventDrop = (info) => {
    console.log('이벤트를 옮길래! :', info.event);
  };

  const handleEventClick = (info) => {
    console.log('이벤트 클릭~ :', info.event);
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { schedule } = useSelector(state => state.scheduleReducer);

  useEffect(() => {
    dispatch(callScheduleListAPI());
  }, [dispatch]);

  console.log("일정 나와라! : ", schedule);

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

  const formattedEvents = schedule?.map(event => ({
    title: event.schType.schCategoryName,
    start: event.schDate,
    end: event.schEndDate,
    allDay: true,
    backgroundColor: getEventColor(event.schType.schCategoryCode)
  })) || [];

  return (
    <div className='wrapper'>
      <div className='wrap'>
        <FullCalendar
          plugins={[dayGridPlugin, googleCalendarPlugin, interactionPlugin]}
          googleCalendarApiKey={process.env.REACT_APP_GOOGLE_API_KEY}
          // events={{
            // googleCalendarId: 'moawarew@gmail.com';
          // }}
          events={ formattedEvents }
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
            today: '오늘'
          }}
          locale='ko'
          editable={true}
          eventDrop={handleEventDrop}
          eventClick={handleEventClick}
        />
      </div>
    </div>
  );
}

export default Schedule;