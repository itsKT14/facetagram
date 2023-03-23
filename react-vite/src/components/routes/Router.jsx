import React from 'react';
import Home from '../pages/Home';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Profile from '../pages/Profile';
import Test1 from '../pages/Test1';
import Test2 from '../pages/Test2';
import Test3 from '../pages/Test3';
import Chatlogin from '../pages/Chatlogin';
import Chatregister from '../pages/Chatregister';
import Chathome from '../pages/Chathome';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

import { Route, Routes, Navigate } from 'react-router-dom';

export default function RouterConvention() {
    const {currentUser} = useContext(AuthContext);

    const ProtectedRoute = ({children}) =>{
        if(!currentUser){
            return <Navigate to="/chat/login"/>;
        }
        return children;
    }
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
            <Route path='/chat/login' element={<Chatlogin/>} />
            <Route path='/chat/register' element={<Chatregister/>} />
            <Route path='/chat/home' element={
                <ProtectedRoute>
                    <Chathome/>
                </ProtectedRoute>} />
        </Routes>   
    )
}