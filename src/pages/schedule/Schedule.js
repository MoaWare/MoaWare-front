import React from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import googleCalendarPlugin from '@fullcalendar/google-calendar';
import interactionPlugin from '@fullcalendar/interaction'; // Import the interaction plugin
import '../schedule/Schedule.css';

function Schedule() {
    
  const handleEventDrop = (info) => {
    // Handle event drop here
    console.log('Event dropped:', info.event);
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const schedule = useSelector(state => state.scheduleReducer);

  return (
    <div className='wrapper'>
      <div className='wrap'>
        <FullCalendar
          plugins={[dayGridPlugin, googleCalendarPlugin, interactionPlugin]} // Include the interaction plugin
          googleCalendarApiKey={process.env.REACT_APP_GOOGLE_API_KEY}
          events={{
            googleCalendarId: 'moawarew@gmail.com',
          }}
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
          editable={true} // Enable event editing
          eventDrop={handleEventDrop} // Specify the event drop callback
        />
      </div>
    </div>
  );
}

export default Schedule;