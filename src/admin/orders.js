import React, { useState, useEffect } from 'react';
import Layout from '../core/layout';
import { isAuthenticated } from '../auth';
import { listOrders, getStatusValues, updateOrderStatus } from './apiAdmin';
import moment from 'moment';

const Orders = () => {
    const [orders, setOrders] = useState([]);
    const [statusValues, setStatusValues] = useState([]);
    const { user, token } = isAuthenticated()

    const loadOrders = () => {
        listOrders(user._id, token).then(data => {
            if(data.error) {
                console.log(data.error);
            } else {
                setOrders(data);
            }
        });
    }

    const loadStatusValues = () => {
        getStatusValues(user._id, token).then(data => {
            if(data.error) {
                console.log(data.error);
            } else {
                setStatusValues(data);
            }
        });
    }

    useEffect(() => {
        loadOrders();
        loadStatusValues();
    }, []);

    const showOrdersLength = () => {
        if(orders.length > 0) {
            return (
                <h2 className="my-4 text-center">Total orders {orders.length}</h2>
            );
        } else {
            return (
                <h2 className="my-4 text-center">No orders</h2>
            );
        }
    }

    const showInput = (key, value) => {
        return (
            <div className="input-group my-2 mr-sm-2">
                <div className="input-group-prepend">
                    <div className="input-group-text">{key}</div>
                </div>
                <input type="text" value={value} className="form-control" readOnly />
            </div>
        );
    }

    const handleStatusChange = (event, orderId) => {
        updateOrderStatus(user._id, token, orderId, event.target.value)
        .then(data => {
            if(data.error) {
                console.log("status update failed");
            } else {
                loadOrders();
            }
        });
    }

    const showStatus = (order) => {
        return (
            <div className="form-group">
                <p className="mark my-4">Status: {order.status}</p>
                <select className="form-control" 
                onChange={(event) => handleStatusChange(event, order._id)}>
                    <option>Update status</option>
                    {statusValues.map((status, i) => 
                        (<option key={i} value={status}>{status}</option>))}
                </select>
            </div>
        );
    }

    return (  
        <Layout title="Orders" description={`Welcome ${user.name}, you can manage the orders`}>
            <div className="row">
                <div className="col-md-8 offset-md-2">
                   {showOrdersLength()}
                   {orders.map((order, oIndex) => {
                       return (
                           <div className="my-4" key={oIndex}>
                               <ul className="list-group">
                                   <li className="list-group-item orange-bg">
                                   Order ID: {order._id}
                                   </li>
                                   <li className="list-group-item">
                                       {showStatus(order)}
                                   </li>
                                   <li className="list-group-item">
                                   Transaction ID: {order.transaction_id}
                                   </li>
                                   <li className="list-group-item">
                                   Amount: ${order.amount}
                                   </li>
                                   <li className="list-group-item">
                                   Ordered by: {order.user.name}
                                   </li>
                                   <li className="list-group-item">
                                   Oredered on: {moment(order.createdAt).fromNow()}
                                   </li>
                                   <li className="list-group-item">
                                   Delivery address: {order.address}
                                   </li>
                                   <li className="list-group-item">
                                    Total products in order: {order.products.length}
                                    </li>
                                </ul>
                                {order.products.map((product, pIndex) => (
                                    <div className="mb-6" key={pIndex}>
                                       <div>
                                        {showInput("Product name", product.name)}
                                        {showInput("Product price", product.price)}
                                        {showInput("Product total", product.count)}
                                        {showInput("Product id", product._id)}
                                        </div>
                                        <hr />
                                    </div>
                                ))}
                           </div>
                       );
                   })}
                </div>
            </div>
        </Layout>
    );
}
 
export default Orders;