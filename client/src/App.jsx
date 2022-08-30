import { Routes, Route, Outlet } from 'react-router-dom'
import DashboardLayout from './Components/Layout/DashboardLayout'
import urls from './Constants/urls'
import Auth from './HoC/Auth'
import Org from './HoC/Org'
import CreateOrganization from './Pages/CreateOrganization'
import Departments from './Pages/Dashboard/Departments'
import DashboardIndex from './Pages/Dashboard/Index'
import Login from "./Pages/Login"
import Register from './Pages/Register'
import SelectOrganization from './Pages/SelectOrganization'

function App() {

  return (
    <Routes>
      <Route path={urls.HOME} element={<>Homepage</>} />
      <Route path={urls.LOGIN} element={<Login />} />
      <Route path={urls.REGISTER} element={<Register />} />
      <Route path={urls.SELECT_ORGANIZATION} element={<Auth><SelectOrganization /></Auth>} />
      <Route path={urls.CREATE_ORGANIZATION} element={<Auth><CreateOrganization /></Auth>} />
      <Route path={urls.DASHBOARD.INDEX} element={<Auth><Org><DashboardLayout><Outlet /></DashboardLayout></Org></Auth>}>
        <Route index element={<DashboardIndex />} />
        <Route path={urls.DASHBOARD.DEPARTMENTS} element={<Departments />} />
      </Route>
    </Routes>
  )
}

export default App
