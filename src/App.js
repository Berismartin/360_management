import React from'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './login';
import DashboardHome from './Dashboard';
import Users from './pages/users';
import Protected from './components/Protected';
import ManageVideos from './pages/ManageVideos';
import ManageSpaces from './pages/ManageSpaces';

import UploadVideo from './forms/VideoAddForm';
import UploadSpace from './forms/SpaceAddForm';
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
            <Route path="/manage/spaces/create" element={<Protected Component={UploadSpace} />} /> 
            {/* <Route path="/profile" element={<Protected Component={ProfilePage} />} /> */}
            {/* <Route path="*" element={<NotFound />} /> */}
          </Routes>
        </BrowserRouter> 
    </div>
  );
}

export default App;
