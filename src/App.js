import React from'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './login';
import DashboardHome from './Dashboard';
import Users from './pages/users';
import Protected from './components/Protected';
import ManageVideos from './pages/ManageVideos';
import ManageSpaces from './pages/ManageSpaces';


import DetailsVideo from './pages/DetailsVideo';
import DetailsSpace from './pages/DetailsSpace';
import VideoSegments from './pages/VideoSegments';

import UploadVideo from './forms/VideoAddForm';
import UploadSpace from './forms/SpaceAddForm';
import EquipmentAdd from './forms/EquipmentAdd';



import Departments from './pages/systemPages/departments';
import Equipments from './pages/systemPages/equipments';
import LeaveTypes from './pages/systemPages/leave_types';
import LeaveRequests from './pages/systemPages/leave_requests';
import Salaries from './pages/systemPages/salaries';
import Doccuments from './pages/systemPages/doccuments';
import Employees from './pages/systemPages/employees';
import EmployeeReg from './forms/EmployeeReg';
import ProfilePage from './pages/systemPages/profile';
import SettingsPage from './pages/systemPages/settingsPages';
import EmployeesPage from './pages/systemPages/employeeDetails';
function App() {
  return (
    <div className="App"> 
       <BrowserRouter>
          <Routes>
            <Route path="/" element={<Login />} />   
            <Route path="/dashboard" element={<Protected Component={DashboardHome} />} /> 
            <Route path="/users" element={<Protected Component={Users} />} /> 

            {/* site management */}
            <Route path="/manage/videos" element={<Protected Component={ManageVideos} />} /> 
            <Route path="/manage/spaces" element={<Protected Component={ManageSpaces} />} /> 


            <Route path="/manage/videos/create" element={<Protected Component={UploadVideo} />} /> 
            <Route path="/manage/videos/category" element={<Protected Component={VideoSegments} />} /> 
            <Route path="/manage/spaces/create" element={<Protected Component={UploadSpace} />} /> 


            <Route path="/manage/videos/details/:id" element={<Protected Component={DetailsVideo} />} /> 
            <Route path="/manage/spaces/details/:id" element={<Protected Component={DetailsSpace} />} /> 

            {/* system routes */}
            <Route path="/system/departments" element={<Protected Component={Departments} />} /> 
            <Route path="/system/equipments" element={<Protected Component={Equipments} />} /> 
            <Route path="/system/equipment/create" element={<Protected Component={EquipmentAdd} />} /> 
            <Route path="/system/leave_management/leave_types" element={<Protected Component={LeaveTypes} />} /> 
            <Route path="/system/leave_management/leave_requests" element={<Protected Component={LeaveRequests} />} /> 
            <Route path="/system/salaries" element={<Protected Component={Salaries} />} /> 
            <Route path="/system/doccuments" element={<Protected Component={Doccuments} />} /> 
            <Route path="/system/employees" element={<Protected Component={Employees} />} /> 
            <Route path="/system/employees/register" element={<Protected Component={EmployeeReg} />} /> 
            <Route path="/system/employee/details/:id" element={<Protected Component={EmployeesPage} />} /> 
            <Route path="/profile" element={<Protected Component={ProfilePage} />} />
            <Route path="/settings" element={<Protected Component={SettingsPage} />} />
            {/* <Route path="*" element={<NotFound />} /> */}
          </Routes>
        </BrowserRouter> 
    </div>
  );
}

export default App;
