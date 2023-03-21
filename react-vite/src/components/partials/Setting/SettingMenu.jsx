import React from "react";
import SettingMenu from "./SettingContent";
import './setting.css';

const SettingContent = () => {
    return (
    <div class="d-flex align-items-center "> 
        <div class="nav flex-column nav-pills me-3" id="v-pills-tab" role="tablist" aria-orientation="vertical fixed">

            <button class="nav-link active" id="v-pills-EditProfile-tab" data-bs-toggle="pill" data-bs-target="#v-pills-EditProfile" type="button" role="tab" aria-controls="v-pills-EditProfile" aria-selected="true">Edit Profile</button>

            <button class="nav-link" id="v-pills-AandW-tab" data-bs-toggle="pill" data-bs-target="#v-pills-AandW" type="button" role="tab" aria-controls="v-pills-AandW" aria-selected="false">App and Websites</button>
            
            <button class="nav-link" id="v-pills-EmailNotif-tab" data-bs-toggle="pill" data-bs-target="#v-pills-EmailNotif" type="button" role="tab" aria-controls="v-pills-EmailNotif" aria-selected="false">Email notification</button>

            <button class="nav-link" id="v-pills-PushNotif-tab" data-bs-toggle="pill" data-bs-target="#v-pills-PushNotif" type="button" role="tab" aria-controls="v-pills-PushNotif" aria-selected="false">Push notification</button>

            <button class="nav-link" id="v-pills-WYS-tab" data-bs-toggle="pill" data-bs-target="#v-pills-WYS" type="button" role="tab" aria-controls="v-pills-WYS" aria-selected="false">What you see</button>

            <button class="nav-link" id="v-pills-WCSYC-tab" data-bs-toggle="pill" data-bs-target="#v-pills-WCSYC" type="button" role="tab" aria-controls="v-pills-WCSYC" aria-selected="false">Who can see <br />your content</button>

            <button class="nav-link" id="v-pills-HOCIWY-tab" data-bs-toggle="pill" data-bs-target="#v-pills-HOCIWY" type="button" role="tab" aria-controls="v-pills-HOCIWY" aria-selected="false">How others can <br />interact with you</button>

            <button class="nav-link" id="v-pills-superVision-tab" data-bs-toggle="pill" data-bs-target="#v-pills-superVision" type="button" role="tab" aria-controls="v-pills-superVision" aria-selected="false">Supervision</button>

            <button class="nav-link" id="v-pills-YDAM-tab" data-bs-toggle="pill" data-bs-target="#v-pills-YDAM" type="button" role="tab" aria-controls="v-pills-YDAM" aria-selected="false">Your data and<br /> media</button>

            <button class="nav-link" id="v-pills-Help-tab" data-bs-toggle="pill" data-bs-target="#v-pills-Help" type="button" role="tab" aria-controls="v-pills-Help" aria-selected="false">Help</button>

        </div>
    </div>
    )

}

export default SettingContent;