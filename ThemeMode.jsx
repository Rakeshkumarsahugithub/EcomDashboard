
 import React, { useState, useEffect } from "react";
 import "./ThemeMode.css";

// const ThemeMode = () => {
//     const [theme, setTheme] = useState(() => {
//         // Load theme from local storage or default to light mode
//         return localStorage.getItem("theme") || "light";
//     });

//     useEffect(() => {
//         document.body.className = theme; // Apply the theme to the body
//         localStorage.setItem("theme", theme); // Save theme to local storage
//     }, [theme]);

//     const toggleTheme = () => {
//         setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
//     };

//     return (
//         <div className="theme-mode">
//             <button onClick={toggleTheme} className="theme-toggle-btn">
//                 {theme === "light" ? "🌙 Dark Mode" : "☀️ Light Mode"}
//             </button>
//         </div>
//     );
// };

// export default ThemeMode;


const ThemeMode = () => {
    const [theme, setTheme] = useState(() => {
        return localStorage.getItem("theme") || "light";
    });

    useEffect(() => {
        document.body.className = theme;
        localStorage.setItem("theme", theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
    };

    return (
        <div className="theme-mode">
            <div
                className={`theme-toggle ${theme}`}
                onClick={toggleTheme}
            >
                <div className="sun-icon"></div>
                <div className="theme-toggle-handle"></div>
                <div className="moon-icon"></div>
            </div>
        </div>
    );
};

export default ThemeMode;

