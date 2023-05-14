import Layout from "./layouts/Layout";
import Main from "./pages/users/Main";

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import OrganizaionList from "./pages/organization/OrganizationList";
import './App.css';
import Work from "./pages/users/works/Work";
import WorkLayout from './layouts/WorkLayout';
import WorkRestReq from './pages/users/works/WorkRestReq';
import WorkRestReqList from './pages/users/works/WorkRestReqList';
import WorkRestList from './pages/users/works/WorkRestList';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Main/>} />
          <Route path="org">
            <Route index element={<OrganizaionList/>}/>
          </Route>
          {/* 근태관리 탭 */}
            {/* <Route path="work"> */}
          <Route path="work" element={ <WorkLayout/>}>
            <Route index element={<Work/>}/>
            <Route path="restReq" element={<WorkRestReq/>}/>
            <Route path="restReqList" element={<WorkRestReqList/>}/>
            <Route path="restList" element={<WorkRestList/>}/>
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;