import "../../App.css";
import React, { useState, useEffect } from "react";
import {
    ref,
    uploadBytes,
    getDownloadURL,
    listAll,
    list,
} from "firebase/storage";
import { storage } from "../../firebase";
import { v4 } from "uuid";

const ImageUploader = () => {
    const [imageUpload, setImageUpload] = useState(null);
    const [imageUrls, setImageUrls] = useState([]);

    const imagesListRef = ref(storage, "images/");
    const uploadFile = () => {
        if (imageUpload == null) return;
        const imageRef = ref(storage, `images/${imageUpload.name + v4()}`);
        uploadBytes(imageRef, imageUpload).then((snapshot) => {
            getDownloadURL(snapshot.ref).then((url) => {
                setImageUrls((prev) => [...prev, url]);
                console.log(imageUpload);
            });
        });
    };

    useEffect(() => {
        listAll(imagesListRef).then((response) => {
            response.items.forEach((item) => {
                getDownloadURL(item).then((url) => {
                    setImageUrls((prev) => [...prev, url]);
                });
            });
        });
    }, []);
    return (
        <div className="container-lg mt-5 d-flex align-items-center flex-column">
            <div>
                <input type="file" onChange={(event) => setImageUpload(event.target.files[0])}/>
                <button onClick={uploadFile} className='btn btn-danger'> Upload Image</button>
            </div>
            <div>
            {
                imageUrls.map( (url)=>(
                    <div key={url}>
                        <img key={url} src={url} style={{width: 200, margin: 20}} />
                    </div>
                ))
            }
            </div>
        </div>
    )
}

export default ImageUploader