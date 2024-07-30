import React from'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './login';
import DashboardHome from './Dashboard';

function App() {
  return (
    <div className="App">
       <BrowserRouter>
          <Routes>
            <Route path="/" element={<Login />} /> 
            <Route path="/dashboard" element={<DashboardHome />} /> 
            {/* <Route path="/profile" element={<Protected Component={ProfilePage} />} /> */}
            {/* <Route path="*" element={<NotFound />} /> */}
          </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;
