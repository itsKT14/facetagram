import React, { useState, useEffect} from 'react'
import Navbar from '../partials/Navbar';
import Cookies from 'universal-cookie';
import { TabTitle } from '../../utilities/title';
import { useNavigate } from "react-router-dom";
import { getUserFromToken, getUserProfile } from '../../service/api';
import { ModalLogout } from '../partials/ModalLogout';

export default function Profile() {
    TabTitle('Profile');
    let redirect = useNavigate();
    const cookies = new Cookies();
    const token = cookies.get('userToken');

    const [user, setUser] = useState({});
    const {username, pic} = user;

    const [posts, setPosts] = useState([]);

    useEffect( () =>{
        loadUserDetails(token);
        loadProfile();
    }, []);

    const loadUserDetails = async (getToken) =>{
        const response = await getUserFromToken({token: getToken});
        if(response.data.status == "success") {
            setUser(response.data.user);
        } else {
            redirect('/user/login');
        }
    }

    const loadProfile = async (getToken) =>{
        const queryParameters = new URLSearchParams(window.location.search);
        const paramId = queryParameters.get("id");
        const response = await getUserProfile({token: getToken, id: paramId});
    }

    const loadPosts = async (getToken) =>{
        // const response = await getProfilePostsFromToken({token: getToken});
        // if(response.data.status == "success") {
        //     setPosts(response.data.allPosts);
        // } else {
        //     redirect('/user/login');
        // }
    }

    return (
        <div>
            <Navbar username={username} pic={pic} ></Navbar>
            <ModalLogout></ModalLogout>
            <div className='container-lg d-flex justify-content-center mt-5'>
                <div className='d-flex'>
                    <div>
                        <img src={pic} alt="" style={{height: 150, width: 150}}/>
                    </div>
                </div>
            </div>
        </div>
    )
}