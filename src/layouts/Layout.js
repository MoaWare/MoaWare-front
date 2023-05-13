
import { Outlet } from 'react-router-dom';
import Header from '../components/common/Header';
import Navbar from '../components/common/Navbar';
import './Layout.css'

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