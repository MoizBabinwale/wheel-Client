import * as React from "react";
import { useState, useEffect } from "react";
import { IoIosSearch } from "react-icons/io";
import { RxCross2 } from "react-icons/rx";
import { GiHamburgerMenu } from "react-icons/gi";
import { Link } from "react-router-dom";
import { useNavigation } from "../context/NavContext";
import { AuthContext } from "../context/AuthProvider";
import { useContext } from "react";

// import Box from '@mui/material/Box';
// import Avatar from '@mui/material/Avatar';
// import Menu from '@mui/material/Menu';
// import MenuItem from '@mui/material/MenuItem';
// import ListItemIcon from '@mui/material/ListItemIcon';
// import Divider from '@mui/material/Divider';
// import IconButton from '@mui/material/IconButton';
// import Typography from '@mui/material/Typography';
// import Tooltip from '@mui/material/Tooltip';
// import PersonAdd from '@mui/icons-material/PersonAdd';
// import Settings from '@mui/icons-material/Settings';
// import Logout from '@mui/icons-material/Logout';

function Navbar() {
  const { isNavOpen, toggleNav } = useNavigation();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { isLoggedIn, logout } = useContext(AuthContext);
  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
  };

  return (
    <nav className={`nav ${isSearchOpen ? "openSearch" : ""} ${isNavOpen ? "openNav" : ""}`}>
      <i className="uil uil-bars navOpenBtn" onClick={toggleNav}>
        <GiHamburgerMenu onClick={() => setIsSearchOpen(false)} />
      </i>
      <Link className="Nav-link-tag logo" to="/">
        Spin the wheel
      </Link>
      <ul className="nav-links">
        <i className="uil uil-times navCloseBtn" onClick={toggleNav}>
          <RxCross2 onClick={() => setIsSearchOpen(false)} />
        </i>
        <li>
          <Link className="Nav-link-tag" to="/">
            Home
          </Link>
        </li>

        {isLoggedIn ? (
          <li className=" Nav-link-tag cursor-pointer text-white" onClick={logout}>
            Logout
          </li>
        ) : (
          <li>
            <Link className="Nav-link-tag" to="/login">
              Login
            </Link>
          </li>
        )}
      </ul>
      <i className={`uil ${isSearchOpen ? "uil-times" : "uil-search"} search-icon`} id="searchIcon" onClick={toggleSearch}>
        {isSearchOpen ? <RxCross2 /> : <IoIosSearch />}
      </i>
      <div className="search-box">
        <input className="bg-white" type="text" placeholder="Search here..." />
        <i className="uil uil-search search-icon">
          <IoIosSearch />
        </i>
      </div>
    </nav>
  );
}

export default Navbar;
