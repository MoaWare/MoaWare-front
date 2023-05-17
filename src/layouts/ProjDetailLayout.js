
import { Outlet } from 'react-router-dom';
import Header from '../components/common/Header';

function ProjDetailLayout() {

  return (
    <>
        <Header />
        <main>
          <Outlet/>
        </main>
    </>  
  );
}

export default ProjDetailLayout;