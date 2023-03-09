import axios from "axios";
const url = "http://localhost:8080/user";

export const getAllUsers = async(getId) => {
    try {
        const id = getId || "";
        return await axios.get(`${url}/${id}`);
    } catch (error) {
        console.log(error);
    }
}

export const createNewUser = async(data) => {
    try {
        return await axios.post(url+"/add", data);
    } catch (error) {
        console.log(error);
    }
}

export const loginUser = async(data) => {
    try {
        return await axios.post(url+"/login", data);
    } catch (error) {
        console.log(error);
    }
}

export const getUserFromToken = async(data) => {
    try {
        return await axios.post(url+"/home", data);
    } catch (error) {
        console.log(error);
    }
}