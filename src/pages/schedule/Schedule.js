import React from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import googleCalendarPlugin from '@fullcalendar/google-calendar';
// import ScheduleCSS from './Schedule.module.css'
import '../schedule/Schedule.css';

function Schedule() {

    return (
        <div className='wrapper'>
            <div className='wrap'>
                <div className='schedule'>일정관리</div>
                <FullCalendar
                    plugins={[dayGridPlugin, googleCalendarPlugin]}
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
                        year: '년간',
                        month: '월간',
                        week: '주간',
                        day: '일간',
                        today: '오늘'
                    }}
                    locale='ko'
                    // 타이틀 수정하는 코드 https://fullcalendar.io/docs/titleFormat
                    // titleFormat={{
                    //     year: 'numeric', month: 'numeric', day:'2-digit'
                    // }}
                />
            </div>
        </div>
    );

}

export default Schedule;