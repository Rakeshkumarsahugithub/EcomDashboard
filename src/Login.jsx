import React, { useState } from "react"; // Import React and useState for managing component state.
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation between routes.
import axios from 'axios'; // Import axios for making HTTP requests.

const Login = ({ setAuth }) => { // Functional component that accepts `setAuth` prop for updating authentication state.
    const [email, setEmail] = useState(''); // State variable to store user email.
    const [password, setPassword] = useState(''); // State variable to store user password.
    const navigate = useNavigate(); // Hook for programmatically navigating to other routes.

    // Function to handle login when the "LOGIN" button is clicked.
    const handleLogin = async () => {
        try {
            // Send a POST request to the backend login endpoint with user credentials.
            const result = await axios.post(
                'http://localhost:5000/auth/login', // API endpoint for login.
                { email, password }, // Request payload containing user email and password.
                {
                    headers: {
                        'Content-Type': 'application/json', // Set the request's content type to JSON.
                    },
                    withCredentials: true, // Include cookies in the request for session handling.
                }
            );

            alert(result.data.message); // Notify user of the success message returned by the server.

            setAuth(true); // Update the authentication state to indicate the user is logged in.

            // Redirect the user to the "/home" route after successful login.
            navigate('/home');
        } catch (error) {
            // Handle errors during the login process.
            if (error.response && error.response.data.message) {
                alert(error.response.data.message); // Display the error message sent by the server.
            } else {
                console.error("Error during login:", error); // Log the error for debugging.
                alert('An error occurred. Please try again.'); // Notify the user of a generic error.
            }
        }
    };

    // JSX code to render the login form.
    return (
        <div className="regi"> {/* Wrapper div for styling */}
            <h1>Login</h1> {/* Heading for the login page */}
            
            <label htmlFor="email" className="lab"><b>Enter Your Email:</b></label> {/* Label for email input */}
            <input
                className="inputBox2" // CSS class for styling
                type="email" // Use 'email' type for better input validation in browsers.
                placeholder="Enter Email" // Placeholder text for the email field.
                value={email} // Bind the input value to the `email` state.
                onChange={(e) => setEmail(e.target.value)} // Update the state when the user types.
            />
            <br /> {/* Line break for layout */}

            <label htmlFor="password" className="lab"><b>Enter Your Password:</b></label> {/* Label for password input */}
            <input
                className="inputBox3" // CSS class for styling
                type="password" // Use 'password' type to mask the input text.
                placeholder="Enter Password" // Placeholder text for the password field.
                value={password} // Bind the input value to the `password` state.
                onChange={(e) => setPassword(e.target.value)} // Update the state when the user types.
            />
            <br /> {/* Line break for layout */}

            <button id="sign" className="inputBox" onClick={handleLogin}>LOGIN</button> {/* Button to trigger the login function */}
        </div>
    );
};

export default Login; // Export the Login component for use in other parts of the application.








