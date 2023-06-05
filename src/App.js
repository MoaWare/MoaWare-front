import Layout from "./layouts/Layout";
import Main from "./pages/users/Main";
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import Login from "./pages/member/Login";
import Work from "./pages/users/works/Work";
import WorkLayout from './layouts/WorkLayout';
import WorkRestReq from './pages/users/works/WorkRestReq';
import WorkRestReqList from './pages/users/works/WorkRestReqList';
import WorkRestList from './pages/users/works/WorkRestList';
import LoginIdFind from "./pages/member/LoginIdFind";
import ProtectedRoute from "./components/router/ProtectedRoute";
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
import AdminEmployees from "./pages/admin/AdminEmployees";
import BoardLayout from "./layouts/BoardLayout";
import BoardPostList from "./pages/board/BoardPostList";
import BoardPostDetail from "./pages/board/BoardPostDetail";
import PaymentMain from "./pages/payment/PaymentMain";
import MemberInfoLayout from "./layouts/MemberInfoLayout";
import MemberInfo from "./pages/member/MemberInfo";
import MemberInfoModify from "./pages/member/MemberInfoModify";
import CreateProject from "./pages/project/CreateProject";
import DoneProject from "./pages/project/DoneProject";
import AdminEmpDetail from "./pages/admin/AdminEmpDetail";
import PaymentWaitBoard from "./pages/payment/PaymentWaitBoard";
import PaymentCompleteBoard from "./pages/payment/PaymentCompleteBoard";
import PaymentingBoard from"./pages/payment/PaymentingBoard";
import PaymentRefuseBoard from "./pages/payment/PaymentRefuseBoard";
import PaymentStorageBoard from "./pages/payment/PaymentStorageBoard";
import PaymentSign from "./pages/payment/PaymentSign";
import BoardPostRegist from "./pages/board/BoardPostRegist";
import TaskUpdate from "./form/Task/TaskUpdate";
import TaskDetail from "./form/Task/TaskDetail";
import TaskRegist from "./form/Task/TaskRegist";
import AdminEmpRegist from "./pages/admin/AdminEmpRegist";
import AdminBoardRegist from "./pages/admin/AdminBoardRegist";
import AdminBoardList from "./pages/admin/AdminBoardList";
import WorkAdmin from "./pages/users/works/WorkAdmin";
import PaymentDetail from "./pages/payment/PaymentDetail";
import BoardPostModify from "./pages/board/BoardPostModify";
import PaymentWaitDetail from "./pages/payment/PaymentWaitDetail";
import PaymentStorageDetail from "./pages/payment/PaymentStorageDetail";
import AdminEmpModify from "./pages/admin/AdminEmpModify";
import WorkReqListItemDetail from './pages/users/works/WorkReqListItemDetail';

function App() {


  return (
    <BrowserRouter>
    <ToastContainer />
      <Routes >
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
            <Route path="admin" element={<WorkAdmin />} />
            <Route path="restReq" element={<WorkRestReq />} />
            <Route path="restReqList" element={<WorkRestReqList />} />
            <Route path="restList" element={<WorkRestList />} />
            <Route path="reqListItem/:leaveCode" element={<WorkReqListItemDetail />} />
          </Route>
  
          {/* 프로젝트 */}
          <Route path="project" element={<ProjectLayout />}>
            <Route index element={<ProtectedRoute projectCheck={true}><Project /></ProtectedRoute>} />
            <Route path="createProject" element={<CreateProject />} />
            <Route path="done" element={<DoneProject />} />
          </Route>

          {/* 전자 결재 */}
          <Route path="pay" element={<PayLayout />}>
            <Route index element={<PaymentMain />} />
            <Route path="draft" element={<Payment />} />
            <Route path="wait" element={<PaymentWaitBoard />} />
            <Route path="paying" element={<PaymentingBoard />} />
            <Route path="completed" element={<PaymentCompleteBoard />} />
            <Route path="refuse" element={<PaymentRefuseBoard />} />
            <Route path="storage" element={<PaymentStorageBoard />} />
            <Route path="sign" element={<PaymentSign />} />
            <Route path="payDetail/:payCode" element={ <PaymentDetail/> }/>
            <Route path="payWaitDetail/:payCode" element={ <PaymentWaitDetail/> }/>
            <Route path="payStorageDetail/:payCode" element={ <PaymentStorageDetail/> }/>
          </Route>

          {/* 일정 관리 */}
          <Route path="schedule" element={<ScheduleLayout />}>
            <Route index element={<Schedule />} />
            <Route index e lement={<Payment />} />
            <Route path="draft" element={<Payment />} />
          </Route>

          {/* 게시판 */}
            <Route path="boardPosts" element={<BoardLayout />}>
            <Route index element={<BoardPostList />} />
            <Route path=":postCode" element={<BoardPostDetail />} />
            <Route path="boards/:boardCode" element={<BoardPostList />} />
            <Route path="regist" element={
              <ProtectedRoute postCheck={true}>
                <BoardPostRegist />
              </ProtectedRoute>
              }/> 
            <Route path="modify/:postCode" element={<BoardPostModify />}/>


          </Route>
          {/* 관리자 */}
          <Route path="admin" element={
            <ProtectedRoute authCheck={true}>
              <AdminLayout />
            </ProtectedRoute> 
            }>
            <Route index element={<Admin />} />
            <Route path="emp/list" element={<AdminEmployees />} />
            <Route path="emp/list/:empCode" element={<AdminEmpDetail />} />
            <Route path="emp/regist" element={<AdminEmpRegist />}/> 
            <Route path="emp/modify/:empCode" element={<AdminEmpModify />}/>


            <Route path="board/list" element={<AdminBoardList />} />
            {/* <Route path="emp/list/:empCode" element={<AdminEmpDetail />} /> */}
            <Route path="board/regist" element={<AdminBoardRegist />}/>




          </Route>
        </Route>

        {/* 로그인  */}
        <Route path="login" element={
          <ProtectedRoute loginCheck={false}>
            <Login />
          </ProtectedRoute>}>
        </Route>
        <Route path="idfind" element={ <LoginIdFind /> } />
        <Route path="pwdfind" element={ <LoginPwdFind /> } />
         {/* 프로젝트 */}
         <Route path="task/:projCode" 
          element={              
            <ProtectedRoute projectCheck={true}>
              <ProjDetailLayout />
            </ProtectedRoute>
          }>
            <Route index element={<ProjDetail />} />
            <Route path="update/:taskCode" element={<TaskUpdate />}/>
            <Route path="detail/:taskCode" element={<TaskDetail />}/>
            <Route path="regist" element={<TaskRegist />}/>
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

export default App;
