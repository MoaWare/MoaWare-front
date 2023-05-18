
import { Outlet } from 'react-router-dom';
import Header from '../components/common/Header';
import Navbar from '../components/common/BoardNavbar';
import './Layout.css'

function BoardLayout() {

    return (
        <>
            <Header />
            <Navbar />
            <main>
                <Outlet />
            </main>
        </>
    );
}

export default BoardLayout;