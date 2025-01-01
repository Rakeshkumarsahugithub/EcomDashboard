// import React, { useState } from "react"; // Import React and the useState hook for state management.
// import axios from "axios"; // Import axios for making HTTP requests.

// const AddProduct = () => { // Define the `AddProduct` functional component.
//     const [name, setName] = useState(''); // State variable for the product name.
//     const [price, setPrice] = useState(''); // State variable for the product price.
//     const [category, setCategory] = useState(''); // State variable for the product category.
//     const [company, setCompany] = useState(''); // State variable for the product company.
//     const [error, setError] = useState(false); // State variable to track validation errors.

//     const addProduct = async () => { // Function to handle adding a product.
//         // Check if all fields are filled; if not, show validation errors.
//         if (!name || !price || !category || !company) {
//             setError(true); // Set error to true to display validation messages.
//             return; // Stop further execution until the form is valid.
//         }

//         try {
//             const result = await axios.post( // Send a POST request to the backend to add a new product.
//                 "http://localhost:5000/products", // Backend endpoint for adding a product.
//                 { name, price, category, company }, // Pass the product details in the request body.
//                 { withCredentials: true } // Include cookies in the request for authentication.
//             );

//             alert("Product added successfully!"); // Notify the user of successful product addition.

//             // Clear the input fields after adding the product.
//             setName('');
//             setPrice('');
//             setCategory('');
//             setCompany('');
//             setError(false); // Reset the error state.
//         } catch (error) {
//             console.error("Error adding product:", error); // Log the error for debugging.
//             alert("Failed to add product. Please try again."); // Notify the user of the failure.
//         }
//     };

//     return (
//         <div className="addproduct"> {/* Wrapper div for styling */}
//             <h1>Add Product...</h1> {/* Heading for the form */}
            
//             {/* Input for Product Name */}
//             <input
//                 type="text"
//                 placeholder="Enter product name" // Placeholder text
//                 className="inputBx" // CSS class for styling
//                 value={name} // Bind input value to the `name` state
//                 onChange={(e) => setName(e.target.value)} // Update state on input change
//             />
//             {error && !name && <span id="popup">Enter valid name</span>} {/* Validation message */}

//             {/* Input for Product Price */}
//             <input
//                 type="text"
//                 placeholder="Enter product price" // Placeholder text
//                 className="inputBx" // CSS class for styling
//                 value={price} // Bind input value to the `price` state
//                 onChange={(e) => setPrice(e.target.value)} // Update state on input change
//             />
//             {error && !price && <span id="popup">Enter valid price</span>} {/* Validation message */}

//             {/* Input for Product Category */}
//             <input
//                 type="text"
//                 placeholder="Enter product category" // Placeholder text
//                 className="inputBx" // CSS class for styling
//                 value={category} // Bind input value to the `category` state
//                 onChange={(e) => setCategory(e.target.value)} // Update state on input change
//             />
//             {error && !category && <span id="popup">Enter valid category</span>} {/* Validation message */}

//             {/* Input for Product Company */}
//             <input
//                 type="text"
//                 placeholder="Enter product company" // Placeholder text
//                 className="inputBx" // CSS class for styling
//                 value={company} // Bind input value to the `company` state
//                 onChange={(e) => setCompany(e.target.value)} // Update state on input change
//             />
//             {error && !company && <span id="popup">Enter valid company</span>} {/* Validation message */}

//             {/* Button to submit the form */}
//             <button className="prdbtn" onClick={addProduct}>Add Product</button> {/* On click, call `addProduct` */}
//         </div>
//     );
// };

// export default AddProduct; // Export the component to be used in other parts of the application.



import React, { useState } from "react";
import axios from "axios";
// Imports React and the useState hook for state management.
// Imports axios to make HTTP requests.

const AddProduct = () => {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [category, setCategory] = useState('');
    const [company, setCompany] = useState('');
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false); // State to track loading status
    const [successMessage, setSuccessMessage] = useState(''); // State for success message

//     Initializes state variables for input fields (name, price, category, company).
// Adds error to track input validation errors.
// Adds loading to show a spinner or "Adding..." while the API request is in progress.
// Adds successMessage to display feedback for the user (success or failure message).


    const addProduct = async () => {
        setError(false);
        setSuccessMessage('');

//         Resets error and successMessage at the start of each call to avoid old messages showing.


        if (!name || !price || isNaN(price) || !category || !company) {
            setError(true);
            return;
        }

//         Ensures all fields are filled.
// Checks if price is numeric using isNaN.

        setLoading(true); // Show loading indicator
 //Sets loading to true to show feedback during the API call.
        try {
            await axios.post(
                "http://localhost:5000/products",
                { name, price, category, company },
                { withCredentials: true }
            );

            setSuccessMessage("Product added successfully!"); // Show success message

            // Clear the input fields
            setName('');
            setPrice('');
            setCategory('');
            setCompany('');
        } catch (error) {
            console.error("Error adding product:", error);
            setSuccessMessage("Failed to add product. Please try again."); // Show failure message
        } finally {
            setLoading(false); // Hide loading indicator
        }
    };

//     Tries to send a POST request to the backend with the input data.
// On success:
// Updates successMessage with a positive message.
// Clears all input fields.
// On failure:
// Logs the error to the console.
// Updates successMessage with an error message.
// Finally:
// Resets loading to false.


    return (
        <div className="addproduct">
            <h1>Add Product...</h1>

            <input
                type="text"
                placeholder="Enter product name"
                className="inputBx"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            {error && !name && <span id="popup">Enter valid name</span>}
{/* 
            Input field for the product name, linked to name state.
If error is true and name is empty, shows a validation message. */}

            <input
                type="number"
                placeholder="Enter product price"
                className="inputBx"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
            />
            {error && (!price || isNaN(price)) && <span id="popup">Enter a valid numeric price</span>}

            <input
                type="text"
                placeholder="Enter product category"
                className="inputBx"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
            />
            {error && !category && <span id="popup">Enter valid category</span>}

            <input
                type="text"
                placeholder="Enter product company"
                className="inputBx"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
            />
            {error && !company && <span id="popup">Enter valid company</span>}

            <button className="prdbtn" onClick={addProduct} disabled={loading}>
                {loading ? "Adding..." : "Add Product"}
            </button>

            {/* Display success or failure message Button to trigger the addProduct function.
Disabled when loading is true to prevent multiple submissions.
Shows "Adding..." when loading is true.
Displays the success or failure message when successMessage is not empty.
 */}
            {successMessage && <p className="message">{successMessage}</p>}
        </div>
    );
};

export default AddProduct;