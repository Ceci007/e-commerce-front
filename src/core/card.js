import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import ShowImage from './showImage';
import moment, { updateLocale } from 'moment';
import { addItem, updateItem, removeItem } from './cartHelpers';

const Card = ({ 
    product, 
    showViewProductButton = true, 
    showOtherDetails = false, 
    showAddToCartButton = true,
    showRemoveProductButton = false,
    cartUpdate = false,
    setRun = f => f,
    run = undefined
 }) => {
    const [redirect, setRedirect] = useState(false);
    const [count, setCount] = useState(product.count)

    const showViewButton = (showViewProductButton) => {
        return (
            showViewProductButton &&
            <Link to={`/product/${product._id}`} >
            <button className="btn btn-outline-primary my-2 mx-1">
                View Product
            </button>
            </Link>
        );
    }

    const showAddToCart = (showAddToCartButton) => {
        return (
            showAddToCartButton && 
            <button onClick={addToCart} className="btn btn-outline-info my-2 mx-1">
                Add to cart
            </button>
        );
    }

    const showRemoveProduct = (showRemoveProductButton) => {
        return (
            showRemoveProductButton &&
            <button onClick={() => {removeItem(product._id); setRun(!run);}} 
            className="btn btn-outline-danger my-2 mx-1">
                Delete
            </button>
        );
    }

    const showDetails = (showOtherDetails) => {
        return (
            showOtherDetails &&
            <React.Fragment>
                <p>Category: {product.category && product.category.name}</p>
                <p>Added on {moment(product.createdAt).fromNow()}</p>
                {product.quantity > 0 ? 
                <span className="badge badge-primary width">In Stock</span> 
                : <span className="badge badge-danger width">Out of Stock</span>}<br />
            </React.Fragment>
        );
    }

    const addToCart = () => {
        addItem(product, () => {
            setRedirect(true);
        });
    }

    const shouldRedirect = (redirect) => {
        if(redirect) {
            return <Redirect to="/cart" />
        }
    }

    const handleChange = (productId) => (event) => {
        setRun(!run);
        setCount(event.target.value < 1 ? 1 : event.target.value);
        if(event.target.value >= 1) {
            updateItem(productId, event.target.value);
        }
    }

    const showCartUpdateOptions = (cartUpdate) => {
        return (
            cartUpdate && 
            <div className="input-group mb-3">
                <div className="input-group-prepend">
                    <span className="input-group-text">
                        Adjust Quantity
                    </span>
                </div>
                <input type="number" className="form-control" value={count} 
                onChange={handleChange(product._id)} />
            </div>
        );
    }

    return (  
            <div className="card">
                <div className="card-header text-center">{ product.name }</div>
                <div className="card-body">
                    {shouldRedirect(redirect)}
                    <ShowImage item={product} url="product" />
                    <p>{ product.description }</p>
                    <p>${ product.price }</p>
                    {showDetails(showOtherDetails)}
                    <div className="center">
                    {showViewButton(showViewProductButton)}
                    {showRemoveProduct(showRemoveProductButton)}
                    {showAddToCart(showAddToCartButton)}
                    {showCartUpdateOptions(cartUpdate)}
                    </div>
                </div>
            </div>
    );
}
 
export default Card;