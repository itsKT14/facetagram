import React from 'react'
import ImageUploader from '../partials/ImageUploader';
import SideNav from '../partials/SideNav/SideNav';
import SideNavMobile from '../partials/SideNav/SideNavMobile';
// import ChatHome from '../chat/ChatView/ChatHome';

export default function Test1() {
    return (
        <div>
                        
            <div>
            <SideNav/>
            </div>
            <div><SideNavMobile/></div>
            <div>
            <ImageUploader/>
            </div>

           {/* <ChatHome/> */}
        </div>
    )
}
