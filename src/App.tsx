import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import theme from './theme';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import ApplyLicense from './pages/ApplyLicense';
import TheoryTest from './pages/TheoryTest';
import PracticalTest from './pages/PracticalTest';
import DocumentUpload from './pages/DocumentUpload';
import HowItWorks from './pages/HowItWorks';
import DrivingLessons from './pages/DrivingLessons';
import SimulatorTest from './pages/SimulatorTest';
import GamifiedLessons from './pages/GamifiedLessons';
import ProtectedRoute from './components/ProtectedRoute';
import { AuthProvider } from './contexts/AuthContext';

const AppContent = () => {
  return (
    <Router>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/how-it-works" element={<HowItWorks />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/apply"
            element={
              <ProtectedRoute>
                <ApplyLicense />
              </ProtectedRoute>
            }
          />
          <Route
            path="/theory-test"
            element={
              <ProtectedRoute>
                <TheoryTest />
              </ProtectedRoute>
            }
          />
          <Route
            path="/practical-test"
            element={
              <ProtectedRoute>
                <PracticalTest />
              </ProtectedRoute>
            }
          />
          <Route
            path="/documents"
            element={
              <ProtectedRoute>
                <DocumentUpload />
              </ProtectedRoute>
            }
          />
          <Route
            path="/driving-lessons"
            element={
              <ProtectedRoute>
                <DrivingLessons />
              </ProtectedRoute>
            }
          />
          <Route
            path="/simulator-test"
            element={
              <ProtectedRoute>
                <SimulatorTest />
              </ProtectedRoute>
            }
          />
          <Route
            path="/gamified-lessons"
            element={
              <ProtectedRoute>
                <GamifiedLessons />
              </ProtectedRoute>
            }
          />
        </Routes>
        <Footer />
        <ToastContainer />
      </ThemeProvider>
    </Router>
  );
};

const App = () => {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
};

export default App; 