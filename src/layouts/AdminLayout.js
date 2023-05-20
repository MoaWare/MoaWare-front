import { Outlet } from 'react-router-dom';
import Header from '../components/common/Header';
import Navbar from '../components/common/AdminNavbar';
import './Layout.css'

function AdminLayout() {

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

export default AdminLayout;