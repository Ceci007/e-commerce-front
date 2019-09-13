import React, { useState } from 'react';
import Layout from '../core/layout';
import { isAuthenticated } from '../auth/index';
import { Link } from 'react-router-dom';
import { createCategory } from './apiAdmin';

const AddCategory = () => {
    const [name, setName] = useState("");
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);
    const { user, token } = isAuthenticated();

    const handleChange = (event) => {
        setError("");
        setName(event.target.value);
    }

    const onSubmit = (event) => {
        event.preventDefault();
        setError("");
        setSuccess(false);

        createCategory(user._id, token, { name })
        .then(data => {
            if(data.error) {
                setError(true);
            } else {
                setError("");
                setSuccess(true);
            }
        });
    }

    const newCategoryForm = () => {
        return (
            <form onSubmit={onSubmit} className="mb-5 container">
                <div className="form-group px-3">
                    <input type="text" className="form-control" 
                    onChange={handleChange}
                    value={name}
                    autoFocus
                    placeholder="Add a category"
                    required />
                </div>
                <button className="btn btn-outline-primary center">Add Category</button>
            </form>
        );
    }

    const showSuccess = () => {
        if(success) {
            return <div className="alert alert-success">{ name } is created.</div>
        }
    }

    const showError = () => {
        if(error) {
            return <div className="alert alert-danger">Category should be unique.</div>
        }
    }

    const goBack = () => {
        return (
            <div className="mt-5">
                <Link to="/admin/dashboard" style={{width: "180px"}} className="btn btn-outline-primary center">
                    Back to Dashboard
                </Link>
            </div>
        );
    }

    return (  
        <Layout title="Add a new category" description={`Welcome ${user.name}, ready to add a new category?`}>
            <div className="row">
                <div className="col-md-8 offset-md-2">
                    { showSuccess() }
                    { showError() }
                    { newCategoryForm() }
                    { goBack() }
                </div>
            </div>
        </Layout>
    );
}
 
export default AddCategory;