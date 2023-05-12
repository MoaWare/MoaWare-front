import { Outlet } from 'react-router-dom';
import WorkNavbar from '../components/common/WorkNavbar';

function WorkLayout() {
    return(
        <div>
            <WorkNavbar/>
            <main>
                <Outlet/>
            </main>
        </div>
    );
}

export default WorkLayout;