import React, { useState, useEffect} from 'react'
import Navbar from '../partials/Navbar';
import Cookies from 'universal-cookie';
import { TabTitle } from '../../utilities/title';
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { getUserFromToken, getHomePostsFromToken } from '../../service/api';
import { ModalLogout } from '../partials/ModalLogout';
import { Post } from '../partials/Post';

export default function Home() {
    TabTitle('Home');
    let redirect = useNavigate();
    const cookies = new Cookies();
    const token = cookies.get('userToken');

    const [user, setUser] = useState({});
    const {username, pic} = user;

    const [posts, setPosts] = useState([]);

    useEffect( () =>{
        verifyUser(token);
        loadPosts(token);
    }, []);

    const verifyUser = async (getToken) =>{
        const response = await getUserFromToken({token: getToken});
        if(response.data.status == "success") {
            setUser(response.data.user);
        } else {
            redirect('/user/login');
        }
    }

    const loadPosts = async (getToken) =>{
        const response = await getHomePostsFromToken({token: getToken});
        if(response.data.status == "success") {
            setPosts(response.data.allPosts);
        } else {
            redirect('/user/login');
        }
    }

    return (
        <div>
            <Navbar username={username} pic={pic} ></Navbar>
            <ModalLogout></ModalLogout>
            <div className='container-lg d-flex justify-content-center mt-5'>
            {
            (posts.length>0)?
            <div className='d-flex flex-wrap flex-column gap-3'>
                {
                posts.map((data)=>(
                    <div key={data.id}>
                        <Post user_id={data.user_id} username={data.username} pic={data.pic} caption={data.caption} attachment={data.attachment} date={data.date}/>
                    </div>
                ))
                }
            </div>
            :
            <p>No post to show</p>
            }
            </div>
        </div>
    )
}