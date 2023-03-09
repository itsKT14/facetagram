import React from 'react';
import Home from '../pages/Home';
import Users from '../pages/Users';
import Login from '../pages/Login';
import Register from '../pages/Register';
import { Route, Routes, Navigate } from 'react-router-dom';

export default function RouterConvention() {
  return (
        <Routes>
            <Route index element={<Navigate to='/user/login' />} />
            <Route path='/home' element={<Home/>} />
            <Route path='/user/login' element={<Login/>} />
            <Route path='/user/register' element={<Register/>} />
        </Routes>   
  )
}