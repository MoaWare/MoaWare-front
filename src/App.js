import Layout from "./layouts/Layout";
import Main from "./pages/users/Main";

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import OrganizationList from "./pages/organization/OrganizationList";
import './App.css';

import Login from "./pages/member/Login";
import Work from "./pages/users/works/Work";
import WorkLayout from './layouts/WorkLayout';
import WorkRestReq from './pages/users/works/WorkRestReq';
import WorkRestReqList from './pages/users/works/WorkRestReqList';
import WorkRestList from './pages/users/works/WorkRestList';
import LoginIdFind from "./pages/member/LoginIdFind";
import ProtectedRoute from "./components/router/ProtectedRoute";
import LoginIdFindResult from "./form/LoginIdFindResult";
import LoginPwdFindResult from "./pages/member/LoginPwdFind";
import OrganizaionSearch from "./pages/organization/OrganizationSearch";
import OrganizationSearch from "./pages/organization/OrganizationSearch";
import OrganizationMain from "./pages/organization/OrganizationMain";




function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={
          <ProtectedRoute loginCheck={true}>
            <Layout />
          </ProtectedRoute>}>
          <Route index element={<Main/>} />
          {/* 조직도 */}
          <Route path="org">
            <Route index element={<OrganizationMain/>}/>
            <Route path="search" element={<OrganizationSearch/>}/>
          </Route>
          {/* 근태관리 */}
            {/* <Route path="work"> */}
          <Route path="work" element={ <WorkLayout/>}>
            <Route index element={<Work/>}/>
            <Route path="restReq" element={<WorkRestReq/>}/>
            <Route path="restReqList" element={<WorkRestReqList/>}/>
            <Route path="restList" element={<WorkRestList/>}/>
          </Route>

        </Route>
        {/* 로그인  */}
        <Route path="login" element={
            <ProtectedRoute loginCheck={false}>
              <Login />
            </ProtectedRoute>}>
        </Route>
        <Route 
          path="idfind" 
          element={
            <ProtectedRoute loginCheck={false}>
              <LoginIdFind/>
            </ProtectedRoute>
          }/>
        <Route 
          path="idresult" 
          element={
            <ProtectedRoute>
              <LoginIdFindResult/>
            </ProtectedRoute>
          }/>
        <Route 
          path="pwdfind" 
          element={
            <ProtectedRoute>
              <LoginPwdFindResult/>
            </ProtectedRoute>
          }/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;