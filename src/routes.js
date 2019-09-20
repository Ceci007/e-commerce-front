import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Signin from './user/signin';
import Signup from './user/signup';
import Home from './core/home';
import Menu from './core/menu';
import PrivateRoute from './auth/privateRoute';
import AdminRoute from './auth/adminRoute';
import Dashboard from './user/dashboard';
import AdminDashboard from './user/adminDashboard';
import AddCategory from './admin/addCategory';
import AddProduct from './admin/addProduct';
import Shop from './core/shop';
import Product from './core/product';
import Cart from './core/cart';
import Orders from './admin/orders';
import Profile from './user/profile';
import ManageProducts from './admin/manageProducts';
import UpdateProduct from './admin/updateProduct';

const Routes = () => {
    return (  
        <BrowserRouter>
            <Menu />
            <Switch>
                <Route path="/" exact component={Home} />
                <Route path = "/shop" exact component={Shop} />
                <Route path = "/signin" exact component={Signin} />
                <Route path = "/signup" exact component={Signup} />
                <PrivateRoute path = "/user/dashboard" exact component={Dashboard} />
                <PrivateRoute path = "/profile/:userId" exact component={Profile} />
                <AdminRoute path="/admin/dashboard" exact component={AdminDashboard} />
                <AdminRoute path="/create/category" exact component={AddCategory} />
                <AdminRoute path="/create/product" exact component={AddProduct} />
                <AdminRoute path="/admin/products" exact component={ManageProducts} />
                <AdminRoute path="/admin/product/update/:productId" exact 
                component={UpdateProduct} />
                <AdminRoute path="/admin/orders" exact component={Orders} />
                <Route path="/product/:productId" exact component={Product} />
                <Route path="/cart" exact component={Cart} />
            </Switch>
        </BrowserRouter>
    );
}
 
export default Routes;