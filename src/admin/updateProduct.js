import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import Layout from '../core/layout';
import { isAuthenticated } from '../auth';
import { getProduct, getCategories, updateProduct } from './apiAdmin';

const UpdateProduct = ({ match }) => {
    const { user, token } = isAuthenticated();
    const [values, setValues] = useState({
        name: "",
        description: "",
        price: "",
        categories: [],
        category: "",
        shipping: "",
        quantity: "",
        photo: "",
        loading: false,
        error: "",
        createdProduct: "",
        redirect: false,
        formData: "",
        success: false
    });
    const {
        name,
        description,
        price,
        categories,
        category,
        shipping,
        quantity,
        photo,
        loading,
        error,
        createdProduct,
        redirect,
        formData,
        success
    } = values;

    const init = (productId) => {
        getProduct(productId).then(data => {
            if(data.error) {
                setValues({ ...values, error: data.error });
            } else {
                setValues({ ...values, name: data.name,
                description: data.description, price: data.price, 
                category: data.category._id, shipping: data.shipping,
                quantity: data.quantity, formData: new FormData() });

                initCategories();
            }
        })
    }

    const initCategories = () => {
        getCategories().then(data => {
            if(data.error) {
                setValues({ ...values, error: data.error });
            } else {
                setValues({ categories: data, formData: new FormData() });
            }
        });
    }

    useEffect(() => {
        init(match.params.productId);
    }, []);

    const handleChange = name => event => {
        const value = name === "photo" ? event.target.files[0] : event.target.value;
        formData.set(name, value);
        setValues({ ...values, [name]: value });
    }

    const onSubmit = (event) => {
        event.preventDefault();
        setValues({ ...values, error: "", loading: true });

        updateProduct(match.params.productId, user._id, token, formData)
        .then(data => {
            if(data.error) {
                setValues({ ...values, error: data.error, success: false });
            } else {
            setValues({ ...values, name: "", description: "",
            photo: "", price: "", quantity: "", loading: false,
            createdProduct: data.name, redirect: true, success: true });
            }
        });
    }

    const newPostForm = () => {
        return (
            <form className="mb-5 container" onSubmit={onSubmit}>
                <div className="custom-file mb-3">
                    <input type="file" name="photo" accept="image/*"
                    onChange={handleChange("photo")} id="photo"
                    className="custom-file-input" />
                    <label className="custom-file-label" htmlFor="photo">
                        
                    </label>
                </div>
                <div className="form-group">
                    <input type="text" className="form-control" 
                    value={name} placeholder="Enter product name"
                    onChange={handleChange("name")} />
                </div>
                <div className="form-group">
                    <textarea className="form-control" 
                    value={description} placeholder="Enter product description"
                    onChange={handleChange("description")}
                    rows="4" cols="10" />
                </div>
                <div className="form-group">
                    <input type="number" className="form-control" 
                    value={price} placeholder="Enter product price"
                    onChange={handleChange("price")} />
                </div>
                <div className="form-group">
                    <select className="form-control" 
                    onChange={handleChange("category")} >
                        <option>Select a category</option>
                        { categories && categories.map((cat, i) => 
                            (<option key={ i } value={ cat._id }>{ cat.name }</option>)) }
                    </select>
                </div>
                <div className="form-group">
                    <input type="number" className="form-control" 
                    value={quantity} placeholder="Enter product quantity"
                    onChange={handleChange("quantity")} />
                </div>
                <div className="form-group">
                    <select className="form-control" 
                    onChange={handleChange("shipping")}>
                        <option>Please select your shipping</option>
                        <option value="0">No</option>
                        <option value="1">Yes</option>
                    </select>
                </div>
                <button className="btn btn-outline-info center">Edit Product</button>
            </form>
        );
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
            <div className="alert alert-success alert-dismissible fade show" role="alert" style={{ display: success ? "" : "none" }}>
                The product is updated
                <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
        );
    }

    const showLoading = () => {
        return loading && (
        <div className="alert alert-info">
            Loading...
        </div>);
    }

    const redirectUser = () => {
        if(redirect) {
            if(!error) {
                return <Redirect to="/admin/products" />
            }
        }
    }

    return (  
        <Layout title="Add a new product" description={`Welcome ${user.name}, ready to add a new product?`} >
        <div className="row">
            <div className="col-md-8 offset-md-2">
               { showLoading() }
               { showSuccess() }
               { showError() }
               { newPostForm() }
               { redirectUser() }
            </div>
        </div>
    </Layout>
    );
}
 
export default UpdateProduct;