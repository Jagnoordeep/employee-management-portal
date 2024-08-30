import React from "react";
import { Link } from "react-router-dom"; // Use React Router's Link for navigation
import "./NavBar.css";

function NavBar() {
  return (
    <nav className="navbar">
      <div className="navbar-logo">Employee Portal</div>
      <div className="navbar-nav">
        <ul>
          <li>
            <Link to="/" className="nav-link">
              Employees List
            </Link>
          </li>
          <li>
            <Link to="/medical-details" className="nav-link">
              Employees Medical Details
            </Link>
          </li>
          <li>
            <Link to="/yearly-bonus" className="nav-link">
              Employees Yearly Bonus Calculation
            </Link>
          </li>
        </ul>
      </div>
      <div className="navbar-profile">
        <img src="https://via.placeholder.com/40" alt="Profile" />
        <span>Employees</span>
      </div>
    </nav>
  );
}

export default NavBar;
