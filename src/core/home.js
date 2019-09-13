import React, { useState, useEffect } from 'react';
import Layout from './layout';
import { getProducts } from './apiCore';
import Cart from './cart';
import Search from './search';

const Home = () => {
    const [productsBySell, setProductsBySell] = useState([]);
    const [productsByArrival, setProductsByArrival] = useState([]);
    const [error, setError] = useState(false);

    const loadProductBySell = () => {
        getProducts("sold").then(data => {
            if(data.error) {
                setError(data.error);
            } else {
                setProductsBySell(data);
            }
        });
    }
    
    const loadProductByArrival = () => {
        getProducts("createdAt").then(data => {
            if(data.error) {
                setError(data.error);
            } else {
                setProductsByArrival(data);
            }
        });
    }

    useEffect(() => {
        loadProductByArrival();
        loadProductBySell();
    }, []);

    return (  
        <Layout title="Home Page" description="Node React E-Commerce App" className="container">
            <Search />
            <h2 className="my-4 text-center">Best Sellers</h2>
            <div className="row">
            { productsBySell.map((product, i) => (<Cart key={ i } product={ product } />)) }
            </div>
            <h2 className="my-4 text-center">New Arrivals</h2>
            <div className="row">
            { productsByArrival.map((product, i) => (<Cart key={ i } product={ product } />)) }
            </div>
        </Layout>
    );
}
 
export default Home;