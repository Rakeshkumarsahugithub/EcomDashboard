import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
//useEffect: Runs side effects (e.g., fetching data) when the component is mounted or updated.
// useState: Manages component-level state (e.g., product details).
// useParams: Retrieves dynamic parameters (id) from the route.
// useNavigate: Enables programmatic navigation (e.g., redirecting to another route).
// axios: Makes HTTP requests to the backend.

const UpdateProduct = () => {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [category, setCategory] = useState('');
    const [company, setCompany] = useState('');
    const { id } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

//     State variables hold the product's details (name, price, category, company).
// id: Captured from the URL parameter.
// loading: Tracks whether the component is fetching or updating data.


    // Fetch product details when the component mounts or `id` changes
    useEffect(() => {
        fetchProductDetails();
    }, [id]);

    //The fetchProductDetails function is triggered whenever the component mounts or the id changes.

    // Function to fetch product details
    const fetchProductDetails = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`http://localhost:5000/products/${id}`, { withCredentials: true });
            if (response.data) {
                const { name, price, category, company } = response.data;
                setName(name);
                setPrice(price);
                setCategory(category);
                setCompany(company);
            } else {
                alert("Product not found.");
                navigate("/products");
            }
        } catch (error) {
            console.error("Error fetching product details:", error.response || error.message);
            alert("Error fetching product details. Please try again.");
            navigate("/products");
        } finally {
            setLoading(false);
        }
    };

//     Start Loading: setLoading(true) indicates data is being fetched.
// Fetch Product:
// Sends a GET request to the backend to retrieve product details using the product ID.
// If successful, updates state variables with the product details.
// If the product is not found, alerts the user and navigates back to the product list.
// Error Handling:
// Logs the error and alerts the user.
// Redirects to the product list page if fetching fails.
// End Loading: setLoading(false) stops the loading state.

    // Function to update product
    const updateProduct = async () => {
        if (!name || !price || !category || !company) {
            return alert("All fields are required.");
        }
        if (isNaN(price) || price <= 0) {
            return alert("Please enter a valid price greater than 0.");
        }

        setLoading(true);
        try {
            const response = await axios.put(
                `http://localhost:5000/products/${id}`,
                { name, price: parseFloat(price), category, company },
                { withCredentials: true }
            );
            alert(response.data?.message || "Product updated successfully!");
            navigate("/products");
        } catch (error) {
            console.error("Error updating product:", error.response || error.message);
            const errorMessage = error.response?.data?.message || "Error updating product. Please try again.";
            alert(errorMessage);
        } finally {
            setLoading(false);
        }
    };

//     Validation:
// Ensures all fields are filled.
// Verifies the price is a valid positive number.
// Start Loading: setLoading(true) indicates the update process has begun.
// Update Product:
// Sends a PUT request to the backend with the updated product details.
// If successful:
// Alerts the user with a success message.
// Navigates to the product list page.
// Error Handling:
// Logs errors and alerts the user with a specific error message from the server, if available.
// End Loading: setLoading(false) stops the loading state.

    // Render a loading state if data is being fetched or updated
    if (loading) {
        return <div className="loading">Loading, please wait...</div>;
    }

    return (
        <div className="addproduct">
            <h1>Update Product</h1>
            <div className="form-group">
                <input
                    type="text"
                    className="inputBx"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Product Name"
                />
            </div>
            <div className="form-group">
                <input
                    type="number"
                    className="inputBx"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    placeholder="Product Price"
                />
            </div>
            <div className="form-group">
                <input
                    type="text"
                    className="inputBx"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    placeholder="Product Category"
                />
            </div>
            <div className="form-group">
                <input
                    type="text"
                    className="inputBx"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    placeholder="Product Company"
                />
            </div>
            <button className="prdbtn" onClick={updateProduct}>
                Update Product
            </button>
        </div>
    );
};

export default UpdateProduct;










