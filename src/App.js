import Layout from "./layouts/Layout";
import Main from "./pages/users/Main";
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import './App.css';

import Login from "./pages/member/Login";
import Work from "./pages/users/works/Work";
import WorkLayout from './layouts/WorkLayout';
import WorkRestReq from './pages/users/works/WorkRestReq';
import WorkRestReqList from './pages/users/works/WorkRestReqList';
import WorkRestList from './pages/users/works/WorkRestList';
import LoginIdFind from "./pages/member/LoginIdFind";
import ProtectedRoute from "./components/router/ProtectedRoute";
import OrganizaionSearch from "./pages/organization/OrganizationSearch";
import OrganizationSearch from "./pages/organization/OrganizationSearch";
import OrganizationMain from "./pages/organization/OrganizationMain";
import LoginPwdFind from "./pages/member/LoginPwdFind";
import OrganizationDetail from "./pages/organization/OrganizationDetail";
import OrgLayout from "./layouts/OrgLayout";
import ProjectLayout from "./layouts/ProjectLayout";
import Project from "./pages/project/Project";
import ProjDetail from "./pages/project/ProjDetail";
import ProjDetailLayout from "./layouts/ProjDetailLayout";
import Payment from "./pages/payment/Payment";
import PayLayout from "./layouts/PayLayout";
import Schedule from "./pages/schedule/Schedule";
import ScheduleLayout from "./layouts/ScheduleLayout";
import AdminLayout from "./layouts/AdminLayout";
import Admin from "./pages/admin/Admin";
import BoardLayout from "./layouts/BoardLayout";
import BoardPostList from "./pages/board/BoardPostList";
import PaymentList from "./pages/payment/PaymentList";




function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={
          <ProtectedRoute loginCheck={true}>
            <Layout />
          </ProtectedRoute>}>
          <Route index element={<Main />} />
          {/* 조직도 */}
          <Route path="org" element={<OrgLayout />}>
            <Route index element={<OrganizationMain />} />
            <Route path="search" element={<OrganizationSearch />} />
            <Route path="detail/:empCode" element={<OrganizationDetail />} />
          </Route>
          {/* 근태관리 */}
          {/* <Route path="work"> */}
          <Route path="work" element={<WorkLayout />}>
            <Route index element={<Work />} />
            <Route path="restReq" element={<WorkRestReq />} />
            <Route path="restReqList" element={<WorkRestReqList />} />
            <Route path="restList" element={<WorkRestList />} />
          </Route>
          {/* 게시판 */}
          <Route path="board" element={<BoardLayout />}>
            <Route index element={<BoardPostList />} />

          </Route>
          {/* 프로젝트 */}
          <Route path="project" element={<ProjectLayout />}>
            <Route index element={<Project />} />
          </Route>
          {/* 전자 결재 */}
          <Route path="pay" element={<PayLayout/>}>
            <Route index element={<Payment />}/>
            <Route path="draft" element={<Payment />}/>
            <Route path="paying" element={<PaymentList/>}/>
          </Route>

          {/* 일정 관리 */}
          <Route path="schedule" element={<ScheduleLayout/>}>
            <Route index element={<Schedule />}/>
            <Route index element={<Payment/>}/>
            <Route path="draft" element={<Payment/>}/>
          </Route>
          {/* 관리자 */}
          <Route path="admin" element={<AdminLayout />}>
            <Route index element={<Admin />} />
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
              <LoginIdFind />
            </ProtectedRoute>
          } />
        <Route
          path="pwdfind"
          element={
            <ProtectedRoute>
              <LoginPwdFind />
            </ProtectedRoute>
          } />
        <Route path="proj" element={<ProjDetailLayout />}>
          <Route path="detail" element={<ProjDetail />} />
        </Route>
      </Routes>
    </BrowserRouter >
  );
}
//s
export default App;