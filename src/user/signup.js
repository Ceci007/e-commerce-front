import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { signup } from '../auth';

const Signup = () => {
    const [values, setValues] = useState({
        name: "",
        email: "",
        password: "",
        error: "",
        success: false
    });
    const { name, email, password, error, success } = values;

    const handleChange = name => event => {
        setValues({ ...values, error: false, [name]: event.target.value });
    }

    const clickSubmit = event => {
        event.preventDefault();
        setValues({ ...values, error: false });

        signup({ name, email, password })
        .then(data => {
            if(data.error) {
                setValues({ ...values, error: data.error, success: false });
            } else {
                setValues({ ...values, name: "", email: "", password: "", error: "", success: true });
            }
        });
    }

    const showError = () => {
        return (
            <div className="alert alert-danger alert-dismissible fade show" role="alert" style={{ display: error ? "" : "none" }}>
            { error }
            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
            </div>
        );
    }

    const showSuccess = () => {
        return (
            <div className="alert alert-success alert-dismissible fade show"  role="alert" style={{ display: success ? "" : "none" }}>
            A new account was created, please <Link to="/signin">signin</Link>.
            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
            </div>
        );
    }

    return (  
        <div className="register-background">
        <div className="container">
            { showSuccess() }
            { showError() }
        <div className="box-header text-center">
            <p>Signup</p>
        </div>
        <form className="card">
            <div className="card-body">
                <div className="form-group">
                    <input onChange={handleChange("name")} type="text" 
                    className="form-control" 
                    placeholder="Enter your name." 
                    value={name} />
                </div>
                <div className="form-group">
                    <input onChange={handleChange("email")} type="email" 
                    className="form-control" 
                    placeholder="Enter your email."
                    value={email} />
                </div>
                <div className="form-group">
                    <input onChange={handleChange("password")} type="password" 
                    className="form-control" 
                    placeholder="enter your password."
                    value={password} />
                </div>
                <button onClick={clickSubmit} className="btn btn-block btn-primary">Submit</button>
            </div>
        </form>
        </div>
        </div>
    );
}
 
export default Signup;