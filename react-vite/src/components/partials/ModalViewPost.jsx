import React, { useState, useEffect } from 'react';
import Cookies from 'universal-cookie';
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { likePost } from '../../service/api';

const ModalViewPost = (props) => {
    const cookies = new Cookies();
    const token = cookies.get('userToken');

    const handleKeyDown =(e)=>{
        e.target.style.height = 'inherit';
        e.target.style.height = `${e.target.scrollHeight}px`;
        e.target.style.height = `${Math.min(e.target.scrollHeight, 100)}px`;
    }

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
                    setImage(oldArray => [...oldArray, {flow: "h-100", imgUrl: urlLists[i], imgClass: classes, height: img.height}]);
                } else {
                    setImage(oldArray => [...oldArray, {flow: "w-100", imgUrl: urlLists[i], imgClass: classes, height: img.height}]);
                }
            };
        }
    }, []);

    return (
        <div className="modal fade" id={`viewPostModal${props.post_id}`} tabIndex="-1" aria-hidden="true">
            <div className="modal-dialog modal-xl">
                <div className="modal-content d-flex flex-row" style = {{height:"90vh"}}>
                    <div id={`viewcarousel${props.post_id}`} className="carousel slide w-50 h-100">
                        <div className="carousel-inner h-100 w-100 bg-black">
                        {
                        image.map((data)=>(
                            <div key={data.imgUrl} className={data.imgClass} style={{height: "100%"}}>
                                <div className='w-100 h-100 d-flex justify-content-center align-items-center' style={{overflow: "hidden"}}>
                                    <img className={data.flow} src={data.imgUrl}/>
                                </div>
                            </div>
                        ))
                        }
                        </div>
                        {
                        (image.length>1)?
                        <div>
                        <button className="carousel-control-prev" type="button" data-bs-target={`#viewcarousel${props.post_id}`} data-bs-slide="prev">
                            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                            <span className="visually-hidden">Previous</span>
                        </button>
                        <button className="carousel-control-next" type="button" data-bs-target={`#viewcarousel${props.post_id}`} data-bs-slide="next">
                            <span className="carousel-control-next-icon" aria-hidden="true"></span>
                            <span className="visually-hidden">Next</span>
                        </button>
                        </div>
                        :
                        <div></div>
                        }
                    </div>
                    <div className='w-50 h-100 d-flex flex-column border-start'>
                        <div className="modal-header">
                            <Link to={`/user/profile?id=${props.user_id}`} className="nav-link fw-semibold d-flex">
                                <img className="rounded-circle border me-3" src={props.pic} alt="" style={{width: 40, height: 40}}/>
                                <p className='name-link pt-2 m-0'>{props.username}</p>
                            </Link>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div id='style-4' className="modal-body overflow-auto flex-fill">
                            <div className='' style={{height: 900}}>
                                <div className='d-flex align-items-start mb-3'>
                                    <Link to={`/user/profile?id=`} className="nav-link fw-semibold d-flex">
                                        <img className="rounded-circle border me-3" src="https://www.pinoytechnoguide.com/wp-content/uploads/2021/10/vivo-X70-sample-picture-person-portrait-mode.jpg" alt="" style={{width: 40, height: 40}}/>
                                    </Link>
                                    <div className=''>
                                        <div className='pt-2 m-0'>
                                            <Link to={`/user/profile?id=`} className="nav-link fw-semibold name-link me-2 d-inline">
                                            kennethtan
                                            </Link>
                                            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Qui iste error non incidunt pariatur dolore nisi unde laboriosam sapiente fugiat.
                                        </div>
                                        <div style={{fontSize: 13, color: "gray"}}>3w</div>
                                    </div>
                                </div>
                                <div className='d-flex align-items-start mb-3'>
                                    <Link to={`/user/profile?id=`} className="nav-link fw-semibold d-flex">
                                        <img className="rounded-circle border me-3" src="https://www.pinoytechnoguide.com/wp-content/uploads/2021/10/vivo-X70-sample-picture-person-portrait-mode.jpg" alt="" style={{width: 40, height: 40}}/>
                                    </Link>
                                    <div className=''>
                                        <div className='pt-2 m-0'>
                                            <Link to={`/user/profile?id=`} className="nav-link fw-semibold name-link me-2 d-inline">
                                            kennethtan
                                            </Link>
                                            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Qui iste error non incidunt pariatur dolore nisi unde laboriosam sapiente fugiat.
                                        </div>
                                        <div style={{fontSize: 13, color: "gray"}}>3w</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="modal-body d-flex flex-column border-top pt-1">
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
                                    <button className='name-link border-0 bg-transparent fs-4 p-0'><i className="fa-regular fa-comment"></i></button>
                                    <button className='name-link border-0 bg-transparent fs-4 p-0'><i className="fa-regular fa-paper-plane"></i></button>
                                </div>
                                <div>
                                    <p className='fs-4 name-link mb-1'><i className="fa-regular fa-bookmark"></i></p>
                                </div>
                            </div>
                            {
                            (numLikes>0)?
                            <p className='fw-semibold my-1' style={{fontSize: 14}}>{numLikes} {wordLike}</p>
                            :
                            <div></div>
                            }
                            <p style={{fontSize: 10, color: "gray"}}>{props.date}</p>
                            <div className='d-flex align-items-start'>
                                <textarea className='border-0 comment-box col' rows={1} id='comment' name='post' placeholder='Add a comment...' style={{resize: "none"}} onChange={(e)=>handleKeyDown(e)}></textarea>
                                <button className='border-0 bg-transparent text-primary-emphasis fw-semibold col-auto'>
                                    Post
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ModalViewPost;