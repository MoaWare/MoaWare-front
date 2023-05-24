import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import googleCalendarPlugin from '@fullcalendar/google-calendar';
import interactionPlugin from '@fullcalendar/interaction';
import '../schedule/Schedule.css';
import { callScheduleListAPI } from '../../apis/ScheduleAPICalls';

function Schedule() {
    
  const handleEventDrop = (info) => {
    // Handle event drop here
    console.log('Event dropped:', info.event);
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { schedule } = useSelector(state => state.scheduleReducer);

  useEffect(() => {
    // Dispatch the action to fetch schedule data
    dispatch(callScheduleListAPI());
  }, [dispatch]);

  console.log("일정관리 조회 : ", schedule);

  const getEventColor = (categoryCode) => {
    switch (categoryCode) {
      case 1:
        return 'rgba(200, 217, 235, 0.5)';
      case 2:
        return 'rgba(255, 230, 230, 0.5)';
      case 3:
        return 'rgba(222, 260, 229, 0.5)';
      case 4:
        return 'rgba(205, 240, 234, 0.5)';
      case 5:
        return 'rgb(236, 201, 238, 0.5)';
      case 6:
        return 'rgb(180, 206, 223, 0.5)';
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
          plugins={[dayGridPlugin, googleCalendarPlugin, interactionPlugin]} // Include the interaction plugin
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
        />
      </div>
    </div>
  );
}

export default Schedule;