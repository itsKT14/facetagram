import React from 'react';
import Home from '../pages/Home';
import Users from '../pages/Users';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Profile from '../pages/Profile';
import Test1 from '../pages/Test1';
import Test2 from '../pages/Test2';
import Test3 from '../pages/Test3';
import { Route, Routes, Navigate } from 'react-router-dom';

export default function RouterConvention() {
  return (
        <Routes>
            <Route index element={<Navigate to='/home' />} />
            <Route path='/home' element={<Home/>} />
            <Route path='/user/login' element={<Login/>} />
            <Route path='/user/register' element={<Register/>} />
            <Route path='/user/profile' element={<Profile/>} />
            <Route path='/test1' element={<Test1/>} />
            <Route path='/test2' element={<Test2/>} />
            <Route path='/test3' element={<Test3/>} />
        </Routes>   
  )
}