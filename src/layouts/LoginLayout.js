
import { Outlet } from 'react-router-dom';
import Header from '../components/common/Header';
import './Layout.css'

function LoginLayout() {

  return (
    <>
        <Header />
        <main>
          <Outlet/>
        </main>
    </>
  );
}

export default LoginLayout;