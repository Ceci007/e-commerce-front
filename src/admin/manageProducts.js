import React, { useState, useEffect } from 'react';
import Layout from '../core/layout';
import { isAuthenticated } from '../auth';
import { Link } from 'react-router-dom';
import { getProducts, deleteProduct } from './apiAdmin';

const ManageProducts = () => {
    const { user, token } = isAuthenticated();
    const [products, setProducts] = useState([]);

    const loadProducts = () => {
        getProducts().then(data => {
            if(data.error) {
                console.log(data.error);
            } else {
                setProducts(data);
            }
        });
    }

    const destroy = (productId)  => {
        deleteProduct(productId, user._id, token).then(data => {
            if(data.error) {
                console.log(data.error);
            } else {
                loadProducts();
            }
        });
    }

    useEffect(() => {
        loadProducts();
    }, []);

    return (  
        <Layout title="Manage your products" description={`Welcome ${user.name}, here you can manage your products`}>
            <div className="row">
                <div className="col-12">
                <h2 className="my-4 text-center">Total {products.length} products</h2>
                    <ul className="list-group">
                        {products.map((product, i) => (
                            <li key={i} 
                            className="list-group-item d-flex justify-content-between align-items-center">
                            {product.name}
                            <Link className="ml-auto mx-2" to={`/admin/product/update/${product._id}`}>
                                <span className="btn btn-outline-info">
                                    Edit
                                </span>
                            </Link>
                            <span className="mx-2" onClick={() => destroy(product._id)} 
                            className="btn btn-outline-danger">
                                Delete
                            </span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </Layout>
    );
}
 
export default ManageProducts;