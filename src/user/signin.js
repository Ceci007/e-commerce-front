import React, { useState } from 'react';
import { signin, authenticate, isAuthenticated } from '../auth';
import { Redirect } from 'react-router-dom';

const Signin = () => {
  const [values, setValues] = useState({
    email: "",
    password: "",
    error: "",
    loading: false,
    redirect: false
});
const { email, password, error, loading, redirect } = values;
const { user } = isAuthenticated();

const handleChange = name => event => {
    setValues({ ...values, error: false, [name]: event.target.value });
}

const clickSubmit = event => {
    event.preventDefault();
    setValues({ ...values, error: false, loading: true });

    signin({ email, password })
    .then(data => {
        if(data.error) {
            setValues({ ...values, error: data.error, loading: false });
        } else {
            authenticate(data,
              () => {
                setValues({ ...values, redirect: true });
              });
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

const showLoading = () => {
   return loading && (
     <div className="alert alert-info">
       loading...
     </div>
   );
}

const redirectUser = () => {
  if(redirect) {
    if(user && user.role === 1) {
        return <Redirect to="/admin/dashboard" />
    } else {
        return <Redirect to="/user/dashboard" />
    }
  }

  if(isAuthenticated()) {
    return <Redirect to="/" />
  }
}

return (  
    <div className="register-background">
    <div className="container">
        { showLoading() }
        { showError() }
        { redirectUser() }
    <div className="box-header text-center">
        <p>Signin</p>
    </div>
    <form className="card">
        <div className="card-body">
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
 
export default Signin;