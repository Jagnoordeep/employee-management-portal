import React from "react";
import { Link } from "react-scroll";
import "./NavBar.css";

function NavBar() {
  return (
    <nav className="navbar">
      <div className="navbar-logo">Employee Portal</div>
      <div className="navbar-nav">
        <ul>
          <li>
            <Link
              to="employee-list"
              smooth={true}
              duration={500}
              className="nav-link"
              activeClass="active"
            >
              Employees List
            </Link>
          </li>
          <li>
            <Link
              to="medical-details"
              smooth={true}
              duration={500}
              className="nav-link"
              activeClass="active"
            >
              Employees Medical Details
            </Link>
          </li>
          <li>
            <Link
              to="yearly-bonus"
              smooth={true}
              duration={500}
              className="nav-link"
              activeClass="active"
            >
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
