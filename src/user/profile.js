import React, { useState, useEffect } from 'react';
import Layout from '../core/layout';
import { isAuthenticated } from '../auth';
import { Redirect } from 'react-router-dom';
import { read, update, updateUser } from './apiUser';

const Profile = ({ match }) => {
    const [values, setValues] = useState({
        name: "",
        email: "",
        password: "",
        error: false,
        success: false
    });

    const { name, email, password, error, success } = values;
    const { token, user } = isAuthenticated()

    const init = (userId) => {
        read(userId, token).then(data => {
            if(data.error) {
                setValues({ ...values, error: true });
            } else {
                setValues({ ...values, name: data.name, email: data.email,
                password: data.password });
            }
        });
    }

    useEffect(() => {
        init(match.params.userId);
    }, []);

    const handleChange = (name) => (event) => {
        setValues({ ...values, error: false, [name]: event.target.value });
    }

    const onSubmit = (event) => {
        event.preventDefault();
        update(match.params.userId, token, { name, email, password }).then(data => {
            if(data.error) {
                console.log(data.error);
            } else {
                updateUser(data, () => {
                    setValues({ ...values, name: data.name, email: data.email, 
                        password: data.password, success: true });
                });
            }
        });
    }

    const redirect = (success) => {
        if(success) {
            return <Redirect to="/cart" />
        }
    }

    const profileUpdate = (name, email, password) => {
        return (
            <form className="container">
                <div className="form-group">
                    <input type="text" placeholder="Change your name" 
                    onChange={handleChange("name")}
                    className="form-control" value={name} />
                </div>
                <div className="form-group">
                    <input type="email" placeholder="Change your email" 
                    onChange={handleChange("email")}
                    className="form-control" value={email} />
                </div>
                <div className="form-group">
                    <input type="password" placeholder="Change your password" 
                    onChange={handleChange("password")}
                    className="form-control" value={password} />
                </div>
                <button onClick={onSubmit} className="center btn btn-outline-primary">
                    Submit
                </button>
            </form>
        );
    }

    return (  
        <Layout title="Profile Page" description={`Welcome ${user.name}, please update your profile`}>
          <h2 className="my-4 text-center">Profile Update</h2>
          {profileUpdate(name, email, password)}
          {redirect(success)}
        </Layout>
    );
}
 
export default Profile;