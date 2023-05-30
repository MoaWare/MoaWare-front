import { Outlet } from 'react-router-dom';
import SchNavbar from '../components/common/SchNavbar';

function ScheduleLayout() {
    return(
        <div>
            <SchNavbar />
            <main>
                <Outlet />
            </main>
        </div>
    );
}

export default ScheduleLayout;