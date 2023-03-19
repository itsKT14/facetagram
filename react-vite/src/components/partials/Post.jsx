import React, { useState, useEffect } from 'react';
import Cookies from 'universal-cookie';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { likePost } from '../../service/api';

const Post = (props) => {
    const cookies = new Cookies();
    const token = cookies.get('userToken');

    const handleKeyDown =(e)=>{
        e.target.style.height = 'inherit';
        e.target.style.height = `${e.target.scrollHeight}px`;
        e.target.style.height = `${Math.min(e.target.scrollHeight, 100)}px`;
    }

    const ownerBtn = 
    <ul className="dropdown-menu dropdown-menu-end">
        <li><p className="dropdown-item mb-0">Edit</p></li>
        <li><p className="dropdown-item mb-0">Delete</p></li>
        <li><p className="dropdown-item mb-0">Copy link</p></li>
    </ul>;

    const viewBtn = 
    <ul className="dropdown-menu dropdown-menu-end">
        <li><p className="dropdown-item mb-0">Hide</p></li>
        <li><p className="dropdown-item mb-0">Copy link</p></li>
        <li><p className="dropdown-item mb-0">Report</p></li>
    </ul>;
    
    const [numLikes, setNumLikes] = useState(props.numLikes);
    const defaultWordLike = (props.numLikes>1)?"likes":"like";
    const [wordLike, setWordLike] = useState(defaultWordLike);
    const [heart, setHeart] = useState(props.isLiked);
    const likeHandle = async (postId, isLiked) =>{
        if(isLiked){
            setHeart("Liked");
            setNumLikes(numLikes+1);
            (numLikes<1)?setWordLike("like"):setWordLike("likes");
        } else {
            setHeart("Unlike");
            setNumLikes(numLikes-1);
            (numLikes>2)?setWordLike("likes"):setWordLike("like");
        }
        await likePost({token: token, post_id: postId, isLiked: isLiked});
    }

    const urlLists = props.attachment;
    const [image, setImage] = useState([]);

    useEffect( () =>{
        for(let i=0; i<urlLists.length; i++){
            const classes = (i==0)?"carousel-item active":"carousel-item";
            const img = new Image();
            img.src = urlLists[i];
            img.onload = () => {
                if(img.height>=img.width){
                    setImage(oldArray => [...oldArray, {flow: "w-100", imgUrl: urlLists[i], imgClass: classes, height: img.height}]);
                } else {
                    setImage(oldArray => [...oldArray, {flow: "h-100", imgUrl: urlLists[i], imgClass: classes, height: img.height}]);
                }
            };
        }
    }, []);

    return (
        <div className="card border-0 pb-3 mb-3 border-bottom" style={{width: 500}}>
            <div className='d-flex justify-content-between mb-2 ps-1'>
                <div className='d-flex'>
                    <Link to={`/user/profile?id=${props.user_id}`} className="nav-link me-2 fw-semibold d-flex">
                        <img className="rounded-circle border me-2" src={props.pic} alt="" style={{width: 40, height: 40}}/>
                        <p className='name-link pt-2 m-0'>{props.username}</p>
                    </Link>
                    <p className='d-flex h-100 m-0 pt-2 text-muted'> • {props.date}</p>
                </div>
                <div className='pt-2'>
                    <div className="dropdown">
                        <button className='border-0 bg-transparent' data-bs-toggle="dropdown">
                            <i className="bi bi-three-dots"></i>
                        </button>
                        {
                        (props.owner)?
                        ownerBtn
                        :
                        viewBtn
                        }
                    </div>
                </div>
            </div>
            <div id={`carousel${props.post_id}`} className="carousel slide">
                <div className="carousel-inner rounded rounded-1 w-100">
                {
                image.map((data)=>(
                    <div key={data.imgUrl} className={data.imgClass} style={{height: 500}}>
                        <div className='w-100 h-100 d-flex justify-content-center align-items-center border rounded rounded-1' style={{overflow: "hidden"}}>
                            <img className={data.flow} src={data.imgUrl}/>
                        </div>
                    </div>
                ))
                }
                </div>
                {
                (image.length>1)?
                <div>
                <button className="carousel-control-prev" type="button" data-bs-target={`#carousel${props.post_id}`} data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target={`#carousel${props.post_id}`} data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button>
                </div>
                :
                <div></div>
                }
            </div>
            <div className="d-flex justify-content-between mt-1">
                <div className='d-flex gap-3'>
                    {
                    (heart=="Liked")?
                    <button className='name-link border-0 bg-transparent fs-4 p-0' onClick={()=>likeHandle(props.post_id, false)} >
                        <FontAwesomeIcon icon="fa-solid fa-heart" className='text-danger'/>
                    </button>
                    :
                    <button className='test-link border-0 bg-transparent fs-4 p-0' onClick={()=>likeHandle(props.post_id, true)} >
                        <FontAwesomeIcon icon="fa-regular fa-heart" />
                    </button>
                    }
                    <button className='name-link border-0 bg-transparent fs-4 p-0' data-bs-toggle="modal" data-bs-target={`#viewPostModal${props.post_id}`}><i className="fa-regular fa-comment"></i></button>
                    <button className='name-link border-0 bg-transparent fs-4 p-0'><i className="fa-regular fa-paper-plane"></i></button>
                </div>
                <div>
                    <p className='fs-4 name-link mb-1'><i className="fa-regular fa-bookmark"></i></p>
                </div>
            </div>
            {
            (numLikes>0)?
            <p className='fw-semibold mb-1'>{numLikes} {wordLike}</p>
            :
            <div></div>
            }
            
            <p className='fw-semibold mb-1'>{props.username} <span className='fw-normal'>&nbsp;{props.caption}</span></p>
            <p className='text-muted mb-1'>View all 2,531 comments</p>
            <div className='d-flex align-items-start'>
                <textarea className='border-0 comment-box col' rows={1} id='comment' name='post' placeholder='Add a comment...' style={{resize: "none"}} onChange={(e)=>handleKeyDown(e)}></textarea>
                <button className='border-0 bg-transparent text-primary-emphasis fw-semibold col-auto'>
                    Post
                </button>
            </div>
        </div>
    )
}

export default Post;