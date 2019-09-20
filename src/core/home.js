import React, { useState, useEffect } from 'react';
import Layout from './layout';
import { getProducts } from './apiCore';
import Card from './card';
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
            { productsBySell.map((product, i) => (
            <div key={ i } className="col-md-4 col-sm-12 mb-3">
                <Card key={ i } product={ product } />
            </div>)) }
            </div>
            <h2 className="my-4 text-center">New Arrivals</h2>
            <div className="row">
            { productsByArrival.map((product, i) => (
            <div key={ i } className="col-md-4 col-sm-12 mb-3"> 
                <Card key={ i } product={ product } />
            </div>)) }
            </div>
        </Layout>
    );
}
 
export default Home;