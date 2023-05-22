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
import PaymentList from "./pages/payment/PaymentList";
import BoardLayout from "./layouts/BoardLayout";
import BoardPostList from "./pages/board/BoardPostList";
import BoardPostDetail from "./pages/board/BoardPostDetail";
import PaymentMain from "./pages/payment/PaymentMain";
import MemberInfoLayout from "./layouts/MemberInfoLayout";
import MemberInfo from "./pages/member/MemberInfo";
import MemberInfoModify from "./pages/member/MemberInfoModify";
// import Notice from "./pages/board/Notice";
// import Free from "./pages/board/Free";
// import DeptRank from "./pages/board/DeptRank";
import CreateProject from "./pages/project/CreateProject";
import DoneProject from "./pages/project/DoneProject";





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
          <Route path="boardPosts" element={<BoardLayout />}>
            <Route index element={<BoardPostList />} />
            <Route path=":postCode" element={<BoardPostDetail />} />
            <Route path="boards/:boardCode" element={<BoardPostList />} />


          
            

          </Route>
          {/* 프로젝트 */}
          <Route path="project" element={
            <ProtectedRoute projectCheck={true}>
              <ProjectLayout />
            </ProtectedRoute>}>
            <Route index element={<Project />} />
            <Route path="createProject" element={<CreateProject />} />
            <Route path="done" element={<DoneProject />} />
            {/* <Route path="proj" element={<ProjDetailLayout />}>
              <Route path="detail/:projCode" element={<ProjDetail />} />
              </Route> */}
          </Route>
          {/* 전자 결재 */}
          <Route path="pay" element={<PayLayout />}>
            <Route index element={<PaymentMain />} />
            <Route path="draft" element={<Payment />} />
            <Route path="paying" element={<PaymentList />} />
          </Route>

          {/* 일정 관리 */}
          <Route path="schedule" element={<ScheduleLayout />}>
            <Route index element={<Schedule />} />
            <Route index e lement={<Payment />} />
            <Route path="draft" element={<Payment />} />
          </Route>
          {/* 관리자 */}
          <Route path="admin" element={
            <ProtectedRoute authCheck={true}>
              <AdminLayout />
            </ProtectedRoute> 
            }>
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
            <ProtectedRoute loginCheck={false}>
              <LoginPwdFind />
            </ProtectedRoute>
          } />
        {/* 프로젝트 */}
        <Route path="project/proj" element={<ProjDetailLayout />}>
        <Route 
          path="proj" 
          element={
            <ProtectedRoute projectCheck={true}>
              <ProjDetailLayout />
            </ProtectedRoute>
          }>
          <Route path="detail/:projCode" element={<ProjDetail />} />
        </Route>
        </Route>
        {/* 회원 정보 */}
        <Route 
          path="member"
          element={
            <ProtectedRoute loginCheck={true}>
              <MemberInfoLayout />
            </ProtectedRoute>
          }>
            <Route index element={<MemberInfo />}/>
            <Route path="modify" element={<MemberInfoModify />} />
          </Route>
      </Routes>
    </BrowserRouter >
  );
}
//s
export default App;