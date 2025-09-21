import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Users from './pages/Users';
import LoginComponent from './components/LoginComponent';

function App() {
  return (
    <Router>
      <Header />

        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<LoginComponent />} />
          <Route path="/users" element={<Users />} />
        </Routes>

      <Footer />
    </Router>
  );
}

export default App
