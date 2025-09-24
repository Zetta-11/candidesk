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
            <Route path="/users" element={<Users />} />
            <Route path="/register" element={<RegistrationComponent />} />
          </Routes>
        </div>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
