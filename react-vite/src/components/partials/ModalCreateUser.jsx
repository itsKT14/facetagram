import React, { useState } from 'react';
import { createNewUser } from '../../service/api';
import Select from 'react-select';
import { useNavigate } from "react-router-dom";
export default function ModalCreateUser() {

    const defaultUserInput = {
        fname: "",
        lname: "",
        pic: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png",
        email: "",
        contact: "",
        status: "Offline",
        gender: "",
        address: "",
        password: ""
    }

    const options = [
        { value: 'Male', label: 'Male', name: "gender" },
        { value: 'Female', label: 'Female', name: "gender" },
    ];

    //modal create
    const [userInput, setUserInput] = useState(defaultUserInput);
    const {fname, lname, pic, email, contact, gender, address, password} = userInput;

    const onValueChange =(e)=>{
        setUserInput({...userInput, [e.target.name]: e.target.value});
        console.log(userInput);
    }

    const selectChange =(e)=>{
        console.log(e.value);
        setUserInput({...userInput, [e.name]: e.value});
    }

    // add user, useNavigate to redirect to /all route
    let redirect = useNavigate();

    const handleSubmit = async (e)=>{
        await createNewUser(userInput);
        // var genericModalEl = document.getElementById('exampleModal');
        // var modal = bootstrap.Modal.getInstance(genericModalEl);
        // modal.hide();
        //redirect('/users');
        redirect(0);
        //window.location.reload(false);
    }


    return (
        <div className="modal fade" id="exampleModal" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5" id="exampleModalLabel">Create User</h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <form>
                        <div className="modal-body px-4">
                            <div className="form-group mb-2">
                                <label htmlFor="fname">First Name:</label>
                                <input type="text" className="form-control" id="fname" name="fname" placeholder="Enter first name" onChange={(e)=> onValueChange(e)} value={fname} required/>
                            </div>
                            <div className="form-group mb-2">
                                <label htmlFor="lname">Last Name:</label>
                                <input type="text" className="form-control" id="lname" name="lname" placeholder="Enter last name" onChange={(e)=> onValueChange(e)} value={lname} required/>
                            </div>
                            <div className="form-group mb-2">
                                <label htmlFor="email">Email Address:</label>
                                <input type="email" className="form-control" id="email" name="email" placeholder="Enter email address" onChange={(e)=> onValueChange(e)} value={email} required/>
                            </div>
                            <div className="form-group mb-2">
                                <label htmlFor="contact">Mobile No:</label>
                                <input type="number" className="form-control" id="contact" name="contact" placeholder="Enter mobile number" onChange={(e)=> onValueChange(e)} value={contact} required/>
                            </div>
                            <div className="form-group mb-2">
                                <label htmlFor="gender">Gender:</label>
                                <Select
                                    id="gender"
                                    name="gender"
                                    value={options.value}
                                    options={options}
                                    defaultValue={options[0]}
                                    onChange={(e)=> selectChange(e)}
                                />
                                
                            </div>
                            <div className="form-group mb-2">
                                <label htmlFor="address">Address:</label>
                                <input type="text" className="form-control" id="address" name="address" placeholder="Enter address" onChange={(e)=> onValueChange(e)} value={address} required/>
                            </div>
                            <div className="form-group mb-2">
                                <label htmlFor="password">Password:</label>
                                <input type="password" className="form-control" id="password" name="password" placeholder="Enter password" onChange={(e)=> onValueChange(e)} value={password} required/>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                            <button type='button' className="btn btn-primary" onClick={()=> handleSubmit()}>&nbsp;&nbsp;Save&nbsp;&nbsp;</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}