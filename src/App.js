import Layout from "./layouts/Layout";
import Main from "./pages/users/Main";

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import OrganizaionList from "./pages/organization/OrganizationList";
import './App.css';

import Login from "./pages/member/Login";

import Work from "./pages/users/works/Work";



function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Main/>} />
          <Route path="org">
            <Route index element={<OrganizaionList/>}/>
          </Route>
          {/* 로그인  */}
          <Route path="login" element={<Login/>}/>
          {/* 근태관리 */}
            <Route path="work">
          {/* <Route path="work" element={ <WorkLayout/>}> */}
            <Route index element={<Work/>}/> 
          </Route>

        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;