import axios from "axios";
const url = "http://localhost:8080";

export const getAllUsers = async(getId) => {
    try {
        const id = getId || "";
        return await axios.get(`${url}/user/${id}`);
    } catch (error) {
        console.log(error);
    }
}

export const createNewUser = async(data) => {
    try {
        return await axios.post(url+"/user/add", data);
    } catch (error) {
        console.log(error);
    }
}

export const loginUser = async(data) => {
    try {
        return await axios.post(url+"/user/login", data);
    } catch (error) {
        console.log(error);
    }
}

export const getUserFromToken = async(data) => {
    try {
        return await axios.post(url+"/user/home", data);
    } catch (error) {
        console.log(error);
    }
}

export const getUserProfile = async(data) => {
    try {
        return await axios.post(url+"/user/profile", data);
    } catch (error) {
        console.log(error);
    }
}

export const addPost = async(data) => {
    try {
        return await axios.post(url+"/post/add", data);
    } catch (error) {
        console.log(error);
    }
}

export const getHomePostsFromToken = async(data) => {
    try {
        return await axios.post(url+"/post/home-posts", data);
    } catch (error) {
        console.log(error);
    }
}

// export const getProfilePostsFromToken = async(data) => {
//     try {
//         return await axios.post(url+"/post/profile-posts", data);
//     } catch (error) {
//         console.log(error);
//     }
// }