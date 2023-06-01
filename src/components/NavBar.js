import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "../css/NavBar.css";
import logo from "../assests/color-logo.png"

function NavBar() {
  const [click, setClick] = useState(false);

  const handleClick = () => setClick(!click);
  return (
    <>
      <nav className="navbar">
        <div className="nav-container">
          <div className="col-8">
            <img src={logo} style={{ height: 60, width: 130 }} />
          </div>
          <ul className={click ? "nav-menu active" : "nav-menu"}>
            <li className="nav-item">
              <NavLink
                exact
                to="/"
                activeClassName="active"
                className="nav-links"
                onClick={handleClick}
              >
                Single
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                exact
                to="/double"
                activeClassName="active"
                className="nav-links"
                onClick={handleClick}
              >
                Double
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                exact
                to="/multiple"
                activeClassName="active"
                className="nav-links"
                onClick={handleClick}
              >
                Multiple
              </NavLink>
            </li>
            {/* <li className="nav-item">
              <NavLink
                exact
                to="/contact"
                activeClassName="active"
                className="nav-links"
                onClick={handleClick}
              >
                Contact Us
              </NavLink>
            </li> */}
          </ul>
          <div className="nav-icon" onClick={handleClick}>
            <i className={click ? "fas fa-times" : "fas fa-bars"}></i>
          </div>
        </div>
      </nav>
    </>
  );
}

export default NavBar;
