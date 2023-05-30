
import { Outlet } from 'react-router-dom';
import Header from '../components/common/Header';
import Navbar from '../components/common/OrgNavbar';
import './Layout.css'

function OrgLayout() {

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

export default OrgLayout;