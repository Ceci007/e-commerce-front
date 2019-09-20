import React, { useState, useEffect } from 'react';
import Layout from '../core/layout';
import { isAuthenticated } from '../auth';
import { Link } from 'react-router-dom';
import { getPurchaseHistory } from './apiUser';
import moment from 'moment';

const Dashboard = () => {
    const [history, setHistory] = useState([]);
    const { user: { _id, name, email, role } } = isAuthenticated();
    const token = isAuthenticated().token;

    const init = (userId, token) => {
        getPurchaseHistory(userId, token).then(data => {
            if(data.error) {
                console.log(data.error);
            } else {
                setHistory(data);
            }
        });
    }

    useEffect(() => {
        init(_id, token);
    }, []);

    const userLinks = () => {
        return (
            <div className="card mb-5">
                <div className="card-header">
                    <h6>User links</h6>
                </div>
                <ul className="list-group">
                    <li className="list-group-item">
                        <Link className="btn btn-primary btn-block" to="/cart">Cart</Link>
                    </li>
                    <li className="list-group-item">
                        <Link className="btn btn-primary btn-block" to={`/profile/${_id}`}>Update Profile</Link>
                    </li>
                </ul>
            </div>
        );
    }

    const userInfo = () => {
        return (
            <div className="container">
            <div className="card mb-5">
            <div className="card-header text-center">
                <h6>User information</h6>
            </div>
            <ul className="list-group">
                <li className="list-group-item">{ name }</li>
                <li className="list-group-item">{ email }</li>
                <li className="list-group-item">{ role === 1 ? "Admin" : "Regular User" }</li>
            </ul>
            </div>
        </div>
        );
    }

    const purchaseHistory = (history) => {
        return (
            <div className="container">
            <div className="card mb-5">
            <div className="card-header text-center">
                <h6>Purchase history</h6>
            </div>
            <div>
            {history.map((h, i) => {
                        return (
                            <div key={i}>
                                {h.products.map((p, i) => {
                                    return (
                                        <ul key={i} className="list-group mb-5">
                                            <li className="list-group-item">Product: {p.name}</li>
                                            <li className="list-group-item">Price: {p.price}</li>
                                            <li className="list-group-item">Purchase date: {moment(p.createdAt).fromNow()}</li>
                                        </ul>                            
                                )})}
                            </div>
                        )
                    })}
            </div>
            </div>
            </div>
        );
    }

    return (  
        <Layout title="Dashboard" description={`Welcome to your dashboard ${name}`} className="container-fluid">
           <div className="row">
               <div className="col-md-3 col-sm-12">
                    { userLinks() }
               </div>
               <div className="col-md-9 col-sm-12">
                    { userInfo() }
                    { purchaseHistory(history) }
               </div>
           </div>
        </Layout>
    );
}
 
export default Dashboard;