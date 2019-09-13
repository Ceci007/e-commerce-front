import React from 'react';
import Layout from '../core/layout';
import { isAuthenticated } from '../auth/index';
import { Link } from 'react-router-dom';

const AdminDashboard = () => {
    const { user: { _id, name, email, role } } = isAuthenticated();

    const adminLinks = () => {
        return (
            <div className="card mb-5">
                <div className="card-header">
                    <h6>Admin links</h6>
                </div>
                <ul className="list-group">
                    <li className="list-group-item">
                        <Link className="btn btn-primary btn-block" to="/create/category">
                            Create Category
                        </Link>
                    </li>
                    <li className="list-group-item">
                        <Link className="btn btn-primary btn-block" to="/create/product">
                            Create Product
                        </Link>
                    </li>
                </ul>
            </div>
        );
    }

    const adminInfo = () => {
        return (
            <div className="container">
            <div className="card mb-5">
            <div className="card-header text-center">
                <h6>Admin information</h6>
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

    return (  
        <Layout title="Dashboard" description={`Welcome to your dashboard ${name}`} className="container-fluid">
           <div className="row">
               <div className="col-md-3 col-sm-12">
                    { adminLinks() }
               </div>
               <div className="col-md-9 col-sm-12">
                    { adminInfo() }
               </div>
           </div>
        </Layout>
    );
}
 
export default AdminDashboard;