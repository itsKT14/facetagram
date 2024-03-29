import React, { useState, useEffect} from 'react'
import Navbar from '../partials/Navbar';
import Cookies from 'universal-cookie';
import { TabTitle } from '../../utilities/title';
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { getUserFromToken, getHomePostsFromToken } from '../../service/api';
import ModalLogout from '../partials/ModalLogout';
import Post from '../partials/Post';
import ModalCreatePost from '../partials/ModalCreatePost';
import ModalLoading from '../partials/ModalLoading';
import ModalComplete from '../partials/ModalComplete';
import Footer from '../partials/Footer';

export default function Home() {
    TabTitle('Home');
    let redirect = useNavigate();
    const cookies = new Cookies();
    const token = cookies.get('userToken');
    const [likeModal, setLikeModal] = useState(0);

    useEffect( () =>{
        loadNavnVerify(token);
        loadPosts(token);
    }, []);

    const [user, setUser] = useState({});
    const {user_id, username, pic} = user;
    const loadNavnVerify = async (getToken) =>{
        const response = await getUserFromToken({token: getToken});
        if(response.data.status == "success") {
            setUser(response.data.user);
        } else {
            redirect('/user/login');
        }
    }

    const [posts, setPosts] = useState(['loading']);
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
            <Navbar user_id={user_id} username={username} pic={pic} ></Navbar>
            <ModalLogout></ModalLogout>
            <ModalCreatePost user_id={user_id} username={username} pic={pic} reloadPosts={loadPosts} page={"home"}></ModalCreatePost>
            <button id="modalLoadingBtn" type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#modalLoading" hidden></button>
            <ModalComplete></ModalComplete>
            <button id="modalCompleteBtn" type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#modalComplete" hidden></button>
            <ModalLoading></ModalLoading>
            <div className='container-lg d-flex justify-content-center mt-5'>
            {
            (posts.length>0 && posts[0]!=="loading")?
            <div className='d-flex flex-wrap flex-column gap-3'>
                {
                posts.map((data)=>(
                    <Post key={data.id} post_id={data.id} user_id={data.user_id} username={data.username} 
                    pic={data.pic} caption={data.caption} attachment={data.attachment} date={data.date} 
                    update={data.update} owner={data.owner} isLiked={data.isLiked} numLikes={data.numLikes} 
                    numComments={data.numComments} mdy={data.mdy} likeModal={likeModal} setLikeModal={setLikeModal}/>
                ))
                }
            </div>
            :
            <div>
                {
                (posts[0]=="loading")?
                <div className="d-flex justify-content-center">
                    <div className="spinner-border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
                :
                <p>No post to show</p>
                }
            </div>
            }
            </div>
            <Footer></Footer>
        </div>
    )
}