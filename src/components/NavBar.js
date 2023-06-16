import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "../css/NavBar.css";
import logo from "../assests/hpe_pri_grn_rev_rgb.png"

function NavBar() {
  const [click, setClick] = useState(false);

  const handleClick = () => setClick(!click);
  return (
    <>
      <nav className="navbar">
        <div className="nav-container">
          <div className="col">
            <img src={logo} className="nav-logo" />
          </div>
          <div className="nav-button">
            <div className="dropdown">
              <button className="btn btn-info dropdown-toggle me-4" type="button" id="dropdownMenuButton2"
                data-bs-toggle="dropdown" aria-expanded="false">
                Image
              </button>
              <ul className="dropdown-menu dropdown-menu-dark menu-item" aria-labelledby="dropdownMenuButton2">
                <li><a className="dropdown-item" href="/single-image">Single</a></li>
                <li><a className="dropdown-item" href="/two-images">Double</a></li>
                <li><a className="dropdown-item" href="/multiple-images">Multiple</a></li>
              </ul>
            </div>
            <div className="dropdown">
              <button className="btn btn-info dropdown-toggle me-4" type="button" id="dropdownMenuButton2"
                data-bs-toggle="dropdown" aria-expanded="false">
                AdharCard
              </button>
              <ul className="dropdown-menu dropdown-menu-dark menu-item" aria-labelledby="dropdownMenuButton2">
                <li><a className="dropdown-item" href="/single-adharcard">Single</a></li>
                <li><a className="dropdown-item" href="/two-adharcards">Double</a></li>
                <li><a className="dropdown-item" href="/multiple-adharcards">Multiple</a></li>
              </ul>
            </div>


          </div>

          {/* <ul className={click ? "nav-menu active" : "nav-menu"}>
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
          </ul> */}
          <div className="nav-icon" onClick={handleClick}>
            <i className={click ? "fas fa-times" : "fas fa-bars"}></i>
          </div>
        </div>
      </nav>
    </>
  );
}

export default NavBar;
