import React from 'react';
import Layout from '../core/layout';
import { isAuthenticated } from '../auth/index';
import { Link } from 'react-router-dom';

const Dashboard = () => {
    const { user: { _id, name, email, role } } = isAuthenticated();

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
                        <Link className="btn btn-primary btn-block" to="/profile/update">Update Profile</Link>
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

    const purchaseHistory = () => {
        return (
            <div className="container">
            <div className="card mb-5">
            <div className="card-header text-center">
                <h6>Purchase history</h6>
            </div>
            <ul className="list-group">
                <li className="list-group-item">history</li>
            </ul>
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
                    { purchaseHistory() }
               </div>
           </div>
        </Layout>
    );
}
 
export default Dashboard;