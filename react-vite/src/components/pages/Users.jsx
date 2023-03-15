import React, { useState, useEffect } from 'react';
import { TabTitle } from '../../utilities/title';
import {getAllUsers, createNewUser} from '../../service/api';
import Navbar from '../partials/Navbar';
import Card from '../partials/Card';
import ModalCreateUser from '../partials/ModalCreateUser';

export default function Home() {
    TabTitle('Users');
    const [users, setUsers] = useState([]);
    const [searchName, setSearchName] = useState('');

    useEffect(() =>{
        getUsers();
    }, []);

    const getUsers = async () =>{
        const response = await getAllUsers();
        setUsers(response.data);
    }

    const addUser = async() =>{
        await createNewUser(users);
        redirect('/all');
    }
    
    const getName = (e) =>{
        setSearchName(e.target.value)         
    }

    const filterNameUser = users.filter(userName =>{
        return userName.fname.toLowerCase().includes(searchName.toLowerCase()) 
        || userName.lname.toLowerCase().includes(searchName.toLowerCase());
    })

    return (
        <div>
            <Navbar></Navbar>
            <div className='container' style={{marginTop: 50}}>
                <div className="d-flex align-items-center justify-content-between pb-0 mb-0">
                    <h1 className="ms-2">Users</h1>
                    <div className="d-flex">
                        <div className="form-group has-search me-3">
                            <span className="fa fa-search form-control-feedback"></span>
                            <input type="text" className="form-control" placeholder="Search User..." onChange={getName}/>
                        </div>
                        <div className="col-auto">
                            <button className="btn btn-success me-2" data-bs-toggle="modal" data-bs-target="#exampleModal">Create&nbsp;&nbsp;<i className="fa-solid fa-plus"></i></button>
                        </div>
                    </div>
                </div>
                <div className="border-top pt-3 mb-5">
                    {
                    (users.length>0)?
                    <div className='d-flex flex-wrap ps-3 gap-3'>
                        {
                        filterNameUser.map((data)=>(
                            <div key={data._id}>
                                <Card userId={data.user_id} pic={data.pic} fname={data.fname} lname={data.lname} email={data.email}/>
                            </div>
                        ))
                        }
                    </div>
                    :
                    <p>No records</p>
                    }
                </div>
            </div>
            <ModalCreateUser/>
        </div>
    )
}