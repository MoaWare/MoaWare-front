import { Outlet } from 'react-router';
import Header from '../components/common/Header';
import Navbar from '../components/common/Navbar';
import './Layout.css'
import { Outlet } from 'react-router-dom';

function Layout() {
  return (
    <>
        <Header />
        <Outlet/>
        <Navbar />
        <main>
          <Outlet/>
        </main>
    </>
  );
}

export default Layout;