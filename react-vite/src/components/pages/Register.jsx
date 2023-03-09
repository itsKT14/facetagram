import React, { useState } from 'react';
import { TabTitle } from '../../utilities/title';
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { createNewUser } from '../../service/api';

export default function Register() {
    TabTitle('Register');

    const defaultUserInput = {
        name: "",
        email: "",
        password: ""
    }

    const [userInput, setUserInput] = useState(defaultUserInput);
    const {name, email, password} = userInput;

    const defaultMsg = {
        status: "",
        message: ""
    }
    const [msg, setMsg] = useState(defaultMsg);
    const {status, message} = msg;

    const onValueChange =(e)=>{
        setUserInput({...userInput, [e.target.name]: e.target.value});
    }

    let redirect = useNavigate();
    const handleSubmit = async ()=>{
        const response = await createNewUser(userInput);

        if(response.data.status == "success") {
            redirect('/user/login');
        } else {
            setMsg(response.data);
        }
    }
    
    let error=<div></div>;
    if(status=="error"){
        error=
        <div className='alert alert-primary alert-dismissible fade show mb-0 mx-2' role='alert'>
            {message}
            <button type='button' className='btn-close' data-bs-dismiss='alert' aria-label='Close'></button>
        </div>
        ;
    }
    
    return (
        <div>
            <div style={{height: 100}} className='pt-1'>
                {error}
            </div>
            <div className="container-fluid d-flex align-items-center justify-content-center">
                <div className="bg-dark rounded rounded-4 mb-5 d-flex justify-content-center flex-column px-4 text-light" style={{height: 500, width: 500}}>
                    <h1 className="align-self-center mb-3">Register</h1>
                    <form>
                        <div className="mb-3">
                            <label htmlFor="name" className="form-label">Name</label>
                            <input type="text" className="form-control" name="name" id="name" onChange={(e)=> onValueChange(e)} value={name} required/>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">Email Address</label>
                            <input type="email" className="form-control" name="email" id="email" onChange={(e)=> onValueChange(e)} value={email} required/>
                        </div>
                        <div className="mb-2">
                            <label htmlFor="password" className="form-label">Password</label>
                            <input type="password" className="form-control" name="password" id="password" onChange={(e)=> onValueChange(e)} value={password} required/>
                        </div>
                        <div className="mb-3 form-check">
                            <input type="checkbox" className="form-check-input" id="exampleCheck1" onClick={()=>showPassword()}/>
                            <label className="form-check-label" htmlFor="exampleCheck1">Show Password</label>
                        </div>
                        
                        <div className="mb-3">
                            <p className="form-label">Already have an account?&nbsp;
                                <Link to={"/user/login"}>
                                Sign In  
                                </Link>
                            </p>
                        </div>
                        <div className="d-flex justify-content-center">
                            <button type="button" className="btn btn-primary rounded-pill" style={{width: 150}} onClick={()=> handleSubmit()}>Register</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}