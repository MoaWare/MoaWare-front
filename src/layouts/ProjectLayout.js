
import { Outlet } from 'react-router-dom';
import Header from '../components/common/Header';
import Navbar from '../components/common/ProjNavbar';

function ProjectLayout() {

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

export default ProjectLayout;