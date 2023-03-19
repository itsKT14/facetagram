import React, { useState, useEffect } from 'react';
import Cookies from 'universal-cookie';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import {
    ref,
    uploadBytes,
    getDownloadURL,
    listAll,
    list,
} from "firebase/storage";
import { storage } from "../../firebase";
import { v4 } from "uuid";
import { addPost } from '../../service/api';
import { async } from '@firebase/util';

const ModalCreatePost = () => {
    const [image, setImage] = useState([]);
    const [urls, setUrls] = useState([]);
    const [uploads, setUploads] = useState([]);
    const [caption, setCaption] = useState("");

    useEffect( () =>{
        if(uploads.length==image.length && image.length!=0){
            callAddPost();
        }
    }, [uploads]);

    const callAddPost = async () =>{
        const cookies = new Cookies();
        const token = cookies.get('userToken');
        const response = await addPost({token: token, caption: caption, attachment: uploads});
        console.log(response.data);
        alert("Your post has been shared");
    }

    const uploadFiles = (files) =>{
        if(files.length>3){
            alert("You can only upload a maximum of 3 files");
        }else if(files.length==0){
            //nothing
        }else{
            for(let i=0; i<files.length; i++){
                setUrls(oldArray => [...oldArray, files[i]]);
                const url = URL.createObjectURL(files[i]);
                const classes = (i==0)?"carousel-item active":"carousel-item";
                const img = new Image();
                img.src = url;
                img.onload = () => {
                    if(img.height>=img.width){
                        setImage(oldArray => [...oldArray, {flow: "h-100", imgUrl: url, imgClass: classes}]);
                    } else {
                        setImage(oldArray => [...oldArray, {flow: "w-100", imgUrl: url, imgClass: classes}]);
                    }
                };
            }
        }
    }

    const cancelFiles = () =>{
        setImage([]);
    }

    const postHandle = () =>{
        for(let i=0; i<urls.length; i++){
            const imageRef = ref(storage, `images/${urls[i].name + v4()}`);
            uploadBytes(imageRef, urls[i]).then((snapshot) => {
                getDownloadURL(snapshot.ref).then((url) => {
                    setUploads(oldArray => [...oldArray, url]);
                });
            });
        }
    }

    return (
        <div>
            <div className="modal fade" id="createPostModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" data-bs-backdrop="static" data-bs-keyboard="false">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header d-flex">
                            <h1 className="modal-title fs-5 flex-fill text-center">Create new post</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={()=>cancelFiles()}></button>
                        </div>
                        <div className="modal-body p-0 w-100 bg-black d-flex justify-content-center align-items-center" style={{height: 350}}>
                            {
                            (image.length<1)?
                            <div className='w-100 h-100 d-flex flex-column justify-content-center align-items-center bg-white gap-3'>
                                <FontAwesomeIcon icon="fa-solid fa-photo-film" style={{fontSize: 100}}/>
                                <p className='fs-4 mb-0'>Import up to 3 photos and videos</p>
                                <button type="button" className="btn btn-primary btn-sm" onClick={()=>document.getElementById('chooseFile').click()}>Select from computer</button>
                                <input id='chooseFile' type='file' accept="image/png, image/gif, image/jpeg video/mp4, video/x-m4v, video/*" onChange={(e) => uploadFiles(e.target.files)} multiple hidden/>
                            </div>
                            :
                            <div id="carouselExampleIndicators" className="carousel slide w-100">
                                {
                                (image.length>1)?
                                <div className="carousel-indicators">
                                    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                                    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
                                    {
                                    (image.length==3)?
                                    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
                                    :
                                    <div></div>
                                    }
                                </div>
                                :
                                <div></div>
                                }
                                <div className="carousel-inner w-100">
                                    {
                                    image.map((data)=>(
                                        <div key={data.imgUrl} className={data.imgClass} style={{height: 350}}>
                                            <div className='w-100 h-100 d-flex justify-content-center align-items-center'>
                                                <img className={data.flow} src={data.imgUrl}/>
                                            </div>
                                        </div>
                                    ))
                                    }
                                </div>
                                {
                                (image.length>1)?
                                <div>
                                <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
                                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                                    <span className="visually-hidden">Previous</span>
                                </button>
                                <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
                                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                                    <span className="visually-hidden">Next</span>
                                </button>
                                </div>
                                :
                                <div></div>
                                }
                            </div>
                            }
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={()=>cancelFiles()}>Cancel</button>
                            {
                            (image.length<1)?
                            <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#nextModal" disabled>&nbsp;Next&nbsp;</button>
                            :
                            <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#nextModal">&nbsp;Next&nbsp;</button>
                            }
                            
                        </div>
                    </div>
                </div>
            </div>
            <div className="modal fade" id="nextModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header d-flex">
                            <h1 className="modal-title fs-5 flex-fill text-center">Create new post</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body d-flex flex-column" style={{height: 350}}>
                            <Link className="nav-link fw-semibold d-flex">
                                <img className="rounded-circle border me-3" src="https://www.pinoytechnoguide.com/wp-content/uploads/2021/10/vivo-X70-sample-picture-person-portrait-mode.jpg" alt="" style={{width: 40, height: 40}}/>
                                <p className='name-link pt-2 m-0'>{`props.username`}</p>
                            </Link>
                            <div className='d-flex align-items-start flex-fill mt-2'>
                                <textarea className='border-0 comment-box col' rows={11} id='caption' name='caption' placeholder='Write a caption...' style={{resize: "none"}} onChange={(e)=> setCaption(e.target.value)} value={caption}></textarea>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-toggle="modal" data-bs-target="#createPostModal">&nbsp;Back&nbsp;</button>
                            <button type="button" className="btn btn-primary" onClick={()=>postHandle()}>&nbsp;Post&nbsp;</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ModalCreatePost;