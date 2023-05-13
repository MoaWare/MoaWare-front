import Layout from "./layouts/Layout";
import Main from "./pages/users/Main";

import { BrowserRouter, Routes, Route } from 'react-router-dom'
import OrganizaionList from "./pages/organization/OrganizationList";
import './App.css';
import Login from "./pages/member/Login";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="org">
            <Route index element={<OrganizaionList/>}/>
          </Route>
          <Route path="auth" element={<Login/>}/> 
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;