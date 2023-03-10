import React, { useState, useEffect} from 'react'
import { TabTitle } from '../../utilities/title';
import Navbar from '../partials/Navbar';
import { useNavigate } from "react-router-dom";
import { getUserFromToken } from '../../service/api';
import Cookies from 'universal-cookie';

export default function Home() {
    TabTitle('Home');
    let redirect = useNavigate();
    const cookies = new Cookies();
    const token = cookies.get('userToken');

    const defaultUser = {
        name: "",
        email: ""
    }
    const [user, setUser] = useState(defaultUser);
    const {name, pic} = user;

    useEffect( () =>{
        loadUserDetails(token);
    }, []);

    const loadUserDetails = async (getToken) =>{
        const response = await getUserFromToken({token: getToken});
        console.log(response);
        if(response.data.status == "success") {
            setUser(response.data.user);
        } else {
            redirect('/user/login');
        }
    }

    return (
        <div>
            <Navbar name={name} pic={pic} ></Navbar>
            <div className="d-flex align-items-center justify-content-center" style={{height: "92vh"}}>
                <div className="container-fluid bg-dark flex-column d-flex align-items-center justify-content-center homeBanner">
                    <p className="text-white homeHeader">Welcome WD37</p>
                    <p className="text-white homeDetail">Capstone - Group 3</p>
                </div>
            </div>
        </div>
    )
}