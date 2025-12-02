import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Users from './pages/Users';
import Candidates from './pages/Candidates';
import LoginComponent from './components/LoginComponent';
import RegistrationComponent from './components/RegistrationComponent';
import AdminPanel from './pages/AminPanel';
import AdminRoute from './components/AdminRoute';
import { Outlet } from 'react-router-dom';
import Vacancies from './pages/Vacancies';
import Tasks from './pages/Tasks';
import Logs from './pages/Logs';
import HrRoute from './components/HrRoute';
import HrPage from './pages/HrPage';
import TLRoute from './components/TLRoute';
import TLPage from './pages/TLPage';
import ProfilePage from './pages/Profile';
import ChangePasswordPage from './pages/ChangePassword';
import TasksBoard from './pages/TasksBoard';

function App() {
  return (
    <div className="app-container">
      <Router>
        <Header />
        <div className="main-content">
          <Routes>
            <Route path="/home" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/login" element={<LoginComponent />} />
            <Route path="/register" element={<RegistrationComponent />} />
            <Route path='/profile' element={<ProfilePage/>} />
            <Route path="/change-password" element={<ChangePasswordPage />} />
            <Route path='/tasks' element={<TasksBoard/>} />


            <Route path="/admin" element={<AdminRoute><Outlet /></AdminRoute>}>
              <Route index element={<AdminPanel />} /> 
              <Route path="users" element={<Users />} />
              <Route path="candidates" element={<Candidates />} />
              <Route path="vacancies" element={<Vacancies />} />
              <Route path="tasks" element={<Tasks />} />
              <Route path="logs" element={<Logs />} />
            </Route>

            <Route path='/hr' element={<HrRoute><Outlet /></HrRoute>}>
              <Route index element={<HrPage />} />
            </Route>

            <Route path='/tl' element={<TLRoute><Outlet /></TLRoute>}>
              <Route index element={<TLPage />} />
            </Route>
          </Routes>
        </div>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
