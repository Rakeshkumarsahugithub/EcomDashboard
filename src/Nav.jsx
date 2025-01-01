import React from "react";
import { Link } from "react-router-dom";


const Nav = ({ isAuthenticated, handleLogout }) => {
    return (
        <nav>
            {!isAuthenticated ? (
                <ul className="navul right">
                    <li><Link to="/signup">Sign Up</Link></li>
                    <li><Link to="/login">Log In</Link></li>
                </ul>
            ) : (
                <ul className="navul">
                    <li><Link to="/home" className="home-link">Home</Link></li>
                    <li><Link to="/products" className="home-link">Products</Link></li>
                    <li><Link to="/add-product" className="home-link">Add Product</Link></li>
                    <li>
                        <button className="Logbtn" onClick={handleLogout}>
                            Logout
                        </button>
                    </li>
                </ul>
            )}
        </nav>
    );
};

export default Nav;


