import Layout from "./layouts/Layout";
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import OrganizaionList from "./pages/organization/OrganizationList";
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="org">
            <Route index element={<OrganizaionList/>}/>
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;