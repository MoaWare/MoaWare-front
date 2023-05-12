import { Outlet } from 'react-router';
import Header from '../components/common/Header';

function Layout() {
  return (
    <>
        <Header />
        <Outlet/>
    </>
  );
}

export default Layout;