import React, { useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { signout, isAuthenticated } from '../auth';

const Menu = ({ history }) => {
    const [collapsed, setCollapsed] = useState(true);
    const classOne = collapsed ? 'collapse navbar-collapse' : 'collapse navbar-collapse show';
    const classTwo = collapsed ? 'navbar-toggler navbar-toggler-right collapsed' : 'navbar-toggler navbar-toggler-right';

    const toggleMenu = () => {
        setCollapsed(!collapsed);
    }

    return (  
        <div>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
               <div className="container">
               <Link className = "navbar-brand mx-4" to = "/">
                    <img src={process.env.PUBLIC_URL + '/img/logo.png'} alt="logo" className="logo"/>
                </Link>
                <button  
                onClick={toggleMenu} 
                className={`${classTwo} p-2 mx-4`} 
                type="button" 
                data-toggle="collapse" 
                data-target="#navbarResponsive" 
                aria-controls="navbarResponsive" 
                aria-expanded="false" 
                aria-label="Toggle navigation">
                    <span className = "navbar-toggler-icon"></span>
                </button>
               <div className={`${classOne}`} id="navbarResponsive">
               <ul className = "navbar-nav mr-auto">
                <li className="nav-item mx-auto">
                    <Link className="nav-link" to="/">Home</Link>
                </li>
                <li className="nav-item mx-auto">
                    <Link className="nav-link" to="/shop">Shop</Link>
                </li>
                {isAuthenticated() && isAuthenticated().user.role === 0 && (
                    <li className="nav-item mx-auto">
                        <Link className="nav-link" to="/user/dashboard">Dashboard</Link>
                    </li>
                )}
                {isAuthenticated() && isAuthenticated().user.role === 1 && (
                    <li className="nav-item mx-auto">
                        <Link className="nav-link" to="/admin/dashboard">Dashboard</Link>
                    </li>
                )}
                {!isAuthenticated() && (
                    <React.Fragment>
                        <li className="nav-item mx-auto">
                            <Link className="nav-link" to="/signin">Signin</Link>
                        </li>
                        <li className="nav-item mx-auto">
                            <Link className="nav-link" to="/signup">Signup</Link>
                        </li>
                    </React.Fragment>
                )}
                {isAuthenticated() && (
                    <li className="nav-item mx-auto">
                        <span className="nav-link" onClick={() => signout(() => {
                            history.push("/");
                        })}>Signout</span>
                    </li>
                )}
                </ul>
               </div>
               </div>
            </nav>
        </div>
    );
}
 
export default withRouter(Menu);