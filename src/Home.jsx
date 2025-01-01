import React from "react";
import { Link } from "react-router-dom";
import "../Home.css"; // Import the CSS file for styling

const Home = () => {
    return (
        <div className="home-container">
            <header className="home-header">
                <h1>Welcome to Our E-Commerce Platform</h1>
                <p>Your gateway to effortless product management and seamless shopping experience.</p>
            </header>

            <section className="home-features">
                <h2>Features</h2>
                <div className="feature-cards">
                    <div className="feature-card">
                        <h3>Manage Products</h3>
                        <p>Easily add, update, or delete products in your inventory.</p>
                        <Link to="/products" className="btn">View Products</Link>
                    </div>
                    <div className="feature-card">
                        <h3>Add New Products</h3>
                        <p>Quickly add new products with an intuitive interface.</p>
                        <Link to="/add-product" className="btn">Add Product</Link>
                    </div>
                    <div className="feature-card">
                        <h3>Secure Authentication</h3>
                        <p>Enjoy secure login and logout functionality to protect your data.</p>
                        <Link to="/login" className="btn">Log In</Link>
                    </div>
                </div>
            </section>

            <footer className="home-footer">
                <p>© 2024 E-Commerce Platform. All rights reserved.</p>
            </footer>
        </div>
    );
};

export default Home;
