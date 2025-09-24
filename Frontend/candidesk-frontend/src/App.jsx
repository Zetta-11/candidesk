import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Users from './pages/Users';
import LoginComponent from './components/LoginComponent';
import RegistrationComponent from './components/RegistrationComponent';
import AdminPanel from './pages/AminPanel';
import AdminRoute from './components/AdminRoute';

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
            <Route path="/admin/users" element={
              <AdminRoute>
                <Users />
              </AdminRoute>
            } />
            <Route path="/admin" element={
              <AdminRoute>
                <AdminPanel />
              </AdminRoute>
            } />
          </Routes>
        </div>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
