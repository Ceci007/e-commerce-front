import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Layout from './layout';
import { getCart, removeItem } from './cartHelpers';
import Card from './card';
import Checkout from './checkout';

const Cart = () => {
    const [items, setItems] = useState([]);
    const [run, setRun] = useState(false);

    useEffect(() => {
        setItems(getCart());
    }, [run]);

    const showItems = (items) => {
        return (
            <div>
                <h2 className="my-4 text-center">
                    Your cart has {`${items.length}`} items
                </h2>
                {items.map((product, i) => (<div key={i} className="my-4 mx-4">
                    <Card key={i} 
                    product={product} 
                    showAddToCartButton={false}
                    showRemoveProductButton={true}
                    cartUpdate={true}
                    setRun={setRun}
                    run={run} /></div>))}
            </div>
        );
    }

    const noItemsMessage = () => {
        return (
            <div className="alert alert-danger mx-4">
            Your cart is empty, <Link to="/shop">continue shopping</Link>
            </div>
        );
    }

    return (  
        <Layout title="Shopping Cart" description="Manage your cart items">
            <div className="row">
                <div className="col-md-6 col-sm-12">
                    {items.length > 0 ? showItems(items) : noItemsMessage()}
                </div>
                <div className="col-md-6 col-sm-12">
                <h2 className="my-4 text-center">
                    Your cart sumary
                </h2>
                <Checkout products={items} />
                </div>
            </div>
        </Layout>
    );
}
 
export default Cart;