import React from 'react'
import { Link } from "react-router-dom";

export const Post = (props) => {
    const handleKeyDown =(e)=>{
        e.target.style.height = 'inherit';
        e.target.style.height = `${e.target.scrollHeight}px`;
        e.target.style.height = `${Math.min(e.target.scrollHeight, 100)}px`;
    }
    return (
        <div className="card border-0" style={{width: 500}}>
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
                        <ul className="dropdown-menu dropdown-menu-end">
                            <li><p className="dropdown-item mb-0">Edit</p></li>
                            <li><p className="dropdown-item mb-0">Delete</p></li>
                            <li><p className="dropdown-item mb-0">Copy link</p></li>
                            <li><p className="dropdown-item mb-0">Report</p></li>
                        </ul>
                    </div>
                </div>
            </div>
            <img className='card-img-top rounded rounded-1' src={props.attachment} alt="..."/>
            <div className="d-flex justify-content-between mt-1">
                <div className='d-flex gap-3'>
                    <button className='name-link border-0 bg-transparent fs-4 p-0'><i className="fa-regular fa-heart"></i></button>
                    <button className='name-link border-0 bg-transparent fs-4 p-0'><i className="fa-regular fa-comment"></i></button>
                    <button className='name-link border-0 bg-transparent fs-4 p-0'><i className="fa-regular fa-paper-plane"></i></button>
                </div>
                <div>
                    <p className='fs-4 name-link mb-1'><i className="fa-regular fa-bookmark"></i></p>
                </div>
            </div>
            <p className='fw-semibold mb-1'>1,235 likes</p>
            <p className='fw-semibold mb-1'>{props.name} <span className='fw-normal'>&nbsp;{props.caption}</span></p>
            <p className='text-muted mb-1'>View all 2,531 comments</p>
            <div className='d-flex align-items-start'>
                <textarea className='border-0 comment-box col' id='comment' name='post' placeholder='Add a comment...' style={{resize: "none"}} onChange={(e)=>handleKeyDown(e)}></textarea>
                <button className='border-0 bg-transparent text-primary-emphasis fw-semibold col-auto'>
                    Post
                </button>
            </div>
        </div>
    )
}
