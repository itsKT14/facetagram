import React, { useState, useEffect } from 'react';
import Cookies from 'universal-cookie';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { likePost } from '../../service/api';
import { addComment } from '../../service/api';
import Comment from './Comment';

const Post = (props) => {
    const cookies = new Cookies();
    const token = cookies.get('userToken');

    const getParentId = (element) =>{
        document.getElementById(element).remove();
    }

    const ownerBtn = 
    <ul className="dropdown-menu dropdown-menu-end">
        <li><p className="dropdown-item mb-0 nav-menu" style={{cursor: "pointer"}}>Edit</p></li>
        <li><p className="dropdown-item mb-0 nav-menu" style={{cursor: "pointer"}}>Delete</p></li>
        <li><p className="dropdown-item mb-0 nav-menu" style={{cursor: "pointer"}}>Copy link</p></li>
    </ul>;

    const viewBtn = 
    <ul className="dropdown-menu dropdown-menu-end">
        <li onClick={()=>getParentId(`post${props.post_id}`)}><p className="dropdown-item mb-0 nav-menu" style={{cursor: "pointer"}}>Hide</p></li>
        <li><p className="dropdown-item mb-0 nav-menu" style={{cursor: "pointer"}}>Copy link</p></li>
        <li><p className="dropdown-item mb-0 nav-menu" style={{cursor: "pointer"}}>Report</p></li>
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

    const [comment, setComment] = useState("");
    const handleKeyDown =(e)=>{
        setComment(e.target.value);
        e.target.style.height = 'inherit';
        e.target.style.height = `${e.target.scrollHeight}px`;
        e.target.style.height = `${Math.min(e.target.scrollHeight, 100)}px`;
    }

    const [numComments, setNumComments] = useState(props.numComments);
    const defaultWordComment = (props.numComments>1)?"comments":"comment";
    const [wordComment, setWordComment] = useState(defaultWordComment);
    const [commentBox, setCommentBox] = useState([]);
    const commentHandle = async () =>{
        const response = await addComment({token: token, post_id: props.post_id, comment_to: "", comment: comment});
        const addedComment = response.data.commentAdded;
        const user = response.data.user;
        setComment("");
        setNumComments(numComments+1);
        setCommentBox(oldArray => [...oldArray, {
            comment_id: addedComment._id,
            user_id: addedComment.comment_user_id,
            comment_to: addedComment.comment_to,
            comment: addedComment.comment,
            username: user.username,
            pic: user.pic
        }]);
    }

    const urlLists = props.attachment;
    const [image, setImage] = useState([]);
    const [viewImage, setViewImage] = useState([]);

    useEffect( () =>{
        for(let i=0; i<urlLists.length; i++){
            const classes = (i==0)?"carousel-item active":"carousel-item";
            const img = new Image();
            img.src = urlLists[i];
            img.onload = () => {
                if(img.height>=img.width){
                    setImage(oldArray => [...oldArray, {flow: "w-100", imgUrl: urlLists[i], imgClass: classes, height: img.height}]);
                    setViewImage(oldArray => [...oldArray, {flow: "h-100", imgUrl: urlLists[i], imgClass: classes, height: img.height}]);
                } else {
                    setImage(oldArray => [...oldArray, {flow: "h-100", imgUrl: urlLists[i], imgClass: classes, height: img.height}]);
                    setViewImage(oldArray => [...oldArray, {flow: "w-100", imgUrl: urlLists[i], imgClass: classes, height: img.height}]);
                }
            };
        }
    }, []);

    return (
        <div id={`post${props.post_id}`}>
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
                {
                (props.caption!=="")?
                <p className='fw-semibold mb-1'>{props.username} <span className='fw-normal'>&nbsp;{props.caption}</span></p>
                :
                <div></div>
                }
                {
                (numComments>0)?
                <p className='text-muted mb-1' data-bs-toggle="modal" data-bs-target={`#viewPostModal${props.post_id}`} style={{cursor: "pointer"}}>View all {numComments} {wordComment}</p>
                :
                <div></div>
                }
                {
                commentBox.map((data)=>(
                    <p key={data.comment_id} className='fw-semibold mb-1'>{data.username} <span className='fw-normal'>&nbsp;{data.comment}</span></p>
                ))
                }
                <div className='d-flex align-items-start'>
                    <textarea className='border-0 comment-box col' rows={1} id='comment' name='post' placeholder='Add a comment...' style={{resize: "none"}} onChange={(e)=>handleKeyDown(e)} value={comment}></textarea>
                    {
                    (comment!=="")?
                    <button className='border-0 bg-transparent text-primary-emphasis fw-semibold col-auto' onClick={()=>commentHandle()}>
                        Post
                    </button>
                    :
                    <div></div>
                    }
                </div>
            </div>
            <div className="modal fade" id={`viewPostModal${props.post_id}`} tabIndex="-1" aria-hidden="true">
                <div className="modal-dialog modal-xl">
                    <div className="modal-content d-flex flex-row" style = {{height:"90vh"}}>
                        <div id={`viewcarousel${props.post_id}`} className="carousel slide w-50 h-100">
                            <div className="carousel-inner h-100 w-100 bg-black">
                            {
                            viewImage.map((data)=>(
                                <div key={data.imgUrl} className={data.imgClass} style={{height: "100%"}}>
                                    <div className='w-100 h-100 d-flex justify-content-center align-items-center' style={{overflow: "hidden"}}>
                                        <img className={data.flow} src={data.imgUrl}/>
                                    </div>
                                </div>
                            ))
                            }
                            </div>
                            {
                            (viewImage.length>1)?
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
                            <div id='style-4' className="modal-body overflow-auto h-100">
                                <div className=''>
                                    {
                                    (props.caption!=="")?
                                    <div className='d-flex align-items-start mb-3'>
                                        <Link to={`/user/profile?id=${props.user_id}`} className="nav-link fw-semibold d-flex">
                                            <img className="rounded-circle border me-3" src={props.pic} alt="img" style={{width: 40, height: 40}}/>
                                        </Link>
                                        <div className=''>
                                            <div className='pt-2 m-0'>
                                                <Link to={`/user/profile?id=${props.user_id}`} className="nav-link fw-semibold name-link me-2 d-inline">
                                                {props.username}
                                                </Link>
                                                {props.caption}
                                            </div>
                                            <div style={{fontSize: 13, color: "gray"}}>{props.update}</div>
                                        </div>
                                    </div>
                                    :
                                    <div></div>
                                    }
                                    {(numComments>0) && (
                                        <Comment key={props.post_id} post_id={props.post_id} numComments={numComments}></Comment>
                                    )}
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
                                <p style={{fontSize: 10, color: "gray"}}>{props.mdy}</p>
                                <div className='d-flex align-items-start'>
                                    <textarea className='border-0 comment-box col' rows={1} id='comment' name='post' placeholder='Add a comment...' style={{resize: "none"}} onChange={(e)=>handleKeyDown(e)} value={comment}></textarea>
                                    {
                                    (comment!=="")?
                                    <button className='border-0 bg-transparent text-primary-emphasis fw-semibold col-auto' onClick={()=>commentHandle()}>
                                        Post
                                    </button>
                                    :
                                    <div></div>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Post;