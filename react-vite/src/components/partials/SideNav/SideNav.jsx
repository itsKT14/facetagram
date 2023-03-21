import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faCompass, faHeart, faMoon, faSun, faSearch, faPlusSquare, faUserCircle, faMessage } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import "./sideNav.css";

const SideNav = () => {
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [searchValue, setSearchValue] = useState("");

    const handleThemeToggle = () => {
        setIsDarkMode(!isDarkMode);
    };

    const handleSearchChange = (event) => {
        setSearchValue(event.target.value);
    };

    return (
        <div className={`sidenav ${isDarkMode ? "dark" : ""}`}>
            <div className="sidenav-header">
            <button id="test" type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#modalComplete" hidden></button>
            <img className="logo" src="https://1000logos.net/wp-content/uploads/2017/02/Instagram-Logo.png" alt="Instagram" />
                <h2 className="sidenav-title">Facetagram</h2>
            </div>
            <nav>
                <ul className="nav-list">
                <li className="nav-item">
                <Link to={"/"} className={`nav-link light ${isDarkMode ? "dark" : ""} a`}>
                    <FontAwesomeIcon icon={faHome} className="nav-icon" /><span className="nav-label">Home</span>
                    </Link>
                </li>
                <li className="nav-item">
                    <Link to={"#"} className={`nav-link light ${isDarkMode ? "dark" : ""}`}>
                    <FontAwesomeIcon icon={faSearch} className="nav-icon" />
                    <span className="nav-label">Search</span>
                    </Link>
                </li>
                <li className="nav-item">
                    <Link to={"/"} className={`nav-link light ${isDarkMode ? "dark" : ""}`}>
                    <FontAwesomeIcon icon={faCompass} className="nav-icon" />
                    <span className="nav-label">Explore</span>
                    </Link>
                </li>
                <li className="nav-item">
                    <Link to={"/"} className={`nav-link light ${isDarkMode ? "dark" : ""}`}>
                    <FontAwesomeIcon icon={faMessage} className="nav-icon" />
                    <span className="nav-label">Messages</span>
                    </Link>
                </li>
                <li className="nav-item">
                    <Link to={"/"} className={`nav-link light ${isDarkMode ? "dark" : ""}`}>
                    <FontAwesomeIcon icon={faHeart} className="nav-icon" />
                    <span className="nav-label">Notifications</span>
                    </Link>
                </li>
                <li className="nav-item">
                    <Link onClick={()=>document.getElementById('test').click()} className={`nav-link light ${isDarkMode ? "dark" : ""}`}>
                    <FontAwesomeIcon icon={faPlusSquare} className="nav-icon" />
                    <span className="nav-label">Create</span>
                    </Link>
                </li>
                <li className="nav-item">
                    <Link to={"/"} className={`nav-link light ${isDarkMode ? "dark" : ""}`}>
                    <FontAwesomeIcon icon={faUserCircle} className="nav-icon" />
                    <span className="nav-label">Profile</span>
                    </Link>
                </li>
                </ul>
                <div className="search-box">
                <FontAwesomeIcon icon={faSearch} className="search-icon" />
                <input
                    type="text"
                    placeholder="Search"
                    className={`search-input ${isDarkMode ? "dark" : ""}`}
                    value={searchValue}
                    onChange={handleSearchChange}
                />
                </div>
            </nav>
            <div className="sidenav-footer">
                <button className="theme-toggle" onClick={handleThemeToggle}>
                <FontAwesomeIcon
                    icon={isDarkMode ? faSun : faMoon}
                    className="theme-icon"
                />
                <span className="theme-label">
                    {isDarkMode ? "Light Mode" : "Dark Mode"}
                </span>
                </button>
            </div>
        </div>
    )
};

export default SideNav;