import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faCompass, faHeart, faMoon, faSun, faSearch, faPlusSquare, faUserCircle, faMessage, faQuestionCircle } from "@fortawesome/free-solid-svg-icons";
import "./sideNavMobile.css";

const SideNavMobile = () => {
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [searchValue, setSearchValue] = useState("");

    const handleThemeToggle = () => {
        setIsDarkMode(!isDarkMode);
    };

    const handleSearchChange = (event) => {
        setSearchValue(event.target.value);
    };
  return (
    <div className={`sidenav-mobile ${isDarkMode ? "dark" : ""}`}>
    <div className="sidenav-header">
    <img className="logo" src="https://1000logos.net/wp-content/uploads/2017/02/Instagram-Logo.png" alt="Instagram" />
        <h4 className="sidenav-title">Kodegram</h4>
 
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

    </div>
</div>
  )
}

export default SideNavMobile