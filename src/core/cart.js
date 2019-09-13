import React from 'react';
import { Link } from 'react-router-dom';
import ShowImage from './showImage';

const Cart = ({ product }) => {
    return (  
        <div className="col-md-4 col-sm-12 mb-3">
            <div className="card">
                <div className="card-header text-center">{ product.name }</div>
                <div className="card-body">
                    <ShowImage item={product} url="product" />
                    <p>{ product.description }</p>
                    <p>${ product.price }</p>
                    <div className="center">
                    <Link to="/" >
                        <button className="btn btn-outline-primary my-2 mx-1">
                            View Product
                        </button>
                    </Link>
                    <button className="btn btn-outline-info my-2 mx-1">
                        Add to cart
                    </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
 
export default Cart;