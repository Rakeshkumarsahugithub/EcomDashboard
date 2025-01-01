import React, { useState } from "react"; // Import React and the useState hook for managing component state.
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation between routes.
import axios from "axios"; // Import axios for making HTTP requests.

const SignUp = () => {
    // State variables for user inputs: name, email, password, and confirmPassword.
    const [name, setName] = useState(""); // Stores the user's name.
    const [email, setEmail] = useState(""); // Stores the user's email.
    const [password, setPassword] = useState(""); // Stores the user's password.
    const [confirmPassword, setConfirmPassword] = useState(""); // Stores the confirmation password.

    const navigate = useNavigate(); // Hook for programmatically navigating to another route.

    // Function to validate password based on specific requirements.
    const validatePassword = (password) => {
        // Regex to ensure the password includes:
        // At least one lowercase letter, one uppercase letter, one number, one special character, and is at least 8 characters long.
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        return passwordRegex.test(password); // Returns true if the password matches the regex.
    };

    // Function to handle the signup process.
    const collectData = async () => {
        // Check if the password meets the validation requirements.
        if (!validatePassword(password)) {
            alert(
                "Password must be at least 8 characters long and include uppercase, lowercase, number, and special character."
            );
            return; // Exit the function if the password is invalid.
        }

        // Check if the password and confirmPassword match.
        if (password !== confirmPassword) {
            alert("Passwords do not match."); // Alert the user if passwords don't match.
            return; // Exit the function if passwords don't match.
        }

        try {
            // Send a POST request to the signup endpoint with user data.
            const result = await axios.post(
                "http://localhost:5000/auth/signup", // API endpoint for signup.
                { name, email, password, confirmPassword }, // Data to send in the request body.
                { withCredentials: true } // Include credentials (e.g., cookies) in the request.
            );

            alert(result.data.message); // Display the response message (e.g., "Signup successful").
            
            // Reset input fields after successful signup.
            setName("");
            setEmail("");
            setPassword("");
            setConfirmPassword("");
            
            // Navigate to the login page after signup.
            navigate("/login");
        } catch (error) {
            // Handle errors during the signup process.
            console.error("Error during signup:", error.response?.data?.message || error.message); // Log error details.
            alert(error.response?.data?.message || "Signup failed. Please try again."); // Alert user about the error.
        }
    };

    // JSX code to render the signup form.
    return (
        <div className="regi"> {/* Wrapper div for the registration form */}
            <h1>Register</h1> {/* Heading for the signup form */}
            <label className="lab"><b>Enter Your Name:</b></label> {/* Label for name input */}
            <input className="inputBox" type="text" placeholder="Enter Name" value={name} onChange={(e) => setName(e.target.value)} /><br /> {/* Input field for name */}
            <label className="lab"><b>Enter Your Email:</b></label> {/* Label for email input */}
            <input className="inputBox2" type="email" placeholder="Enter Email" value={email} onChange={(e) => setEmail(e.target.value)} /><br /> {/* Input field for email */}
            <label className="lab"><b>Enter Your Password:</b></label> {/* Label for password input */}
            <input className="inputBox3" type="password" placeholder="Enter Password" value={password} onChange={(e) => setPassword(e.target.value)} /><br /> {/* Input field for password */}
            <label className="lab"><b>Confirm Your Password:</b></label> {/* Label for confirmPassword input */}
            <input className="inputBox4" type="password" placeholder="Confirm Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} /><br /> {/* Input field for confirmPassword */}
            <button id="sign" className="inputBox" onClick={collectData}>SIGN UP</button> {/* Button to trigger the signup process */}
        </div>
    );
};

export default SignUp; // Export the SignUp component for use in other parts of the app.


