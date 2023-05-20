
import { Outlet } from 'react-router-dom';
import Header from '../components/common/Header';
import Navbar from '../components/common/PayNavbar';
import './Layout.css'

function PayLayout() {

  return (
    <>
        <Header />
        <Navbar />
        <main>
          <Outlet/>
        </main>
    </>
  );
}

export default PayLayout;