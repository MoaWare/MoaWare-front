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
    </>
  );
}

export default Layout;