// import { StrictMode } from 'react'
// import { createRoot } from 'react-dom/client'
// import App from './App.jsx'


// createRoot(document.getElementById('root')).render(
//   <StrictMode>
//     <App />
//   </StrictMode>,
// )

import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";  // Import BrowserRouter
import App from "./App";  // Your App component

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Router>  {/* Wrap App with Router */}
      <App />
    </Router>
  </React.StrictMode>
);
