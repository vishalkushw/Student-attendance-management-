import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AdminLogin from './pages/AdminLogin';
import Dashboard from './pages/Dashboard';
import AddStudent from './pages/AddStudent';
import DisplayPage from './pages/DisplayPage';
import Search from './pages/Search';
import AttendanceRecords from './pages/AttendanceRecords';
import Dash from './pages/Dash';

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AdminLogin />} />
          <Route path="/dashboard" element={<Dashboard />}>
          <Route index element={<Dash />} />
            <Route path="insert" element={<AddStudent />} />
            <Route path="display" element={<DisplayPage />} />
            <Route path="search" element={<Search />} />
            <Route path="attendance" element={<AttendanceRecords />} />

          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
};
export default App;