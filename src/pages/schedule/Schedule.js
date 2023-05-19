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
                <FullCalendar 
                    plugins={[dayGridPlugin, googleCalendarPlugin]}
                    googleCalendarApiKey={'AIzaSyD6amFkYvgsMyc38D6Sq8zTKs7gCWrwtE0'}
                    events={{
                        googleCalendarId: 'moaware@gmail.com',
                    }}
                />
            </div>
        </div>
    );

}

export default Schedule;