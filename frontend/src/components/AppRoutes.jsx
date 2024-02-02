// AppRoutes.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomeScreen from '../screens/WelcomeScreen';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import AdminScreen from '../screens/AdminScreen';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<HomeScreen />} />
      <Route path="/login" element={<LoginScreen />} />
      <Route path="/register" element={<RegisterScreen />} />
      <Route path="/admin" element={<AdminScreen />} />
    </Routes>
  );
};

export default AppRoutes;
