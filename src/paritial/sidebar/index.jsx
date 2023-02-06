import React from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.png";
import { links } from "../../routes/links";

export default function Sidebar() {
  return (
    <div id="sidebar">
      <div>
        <img className="sidebar-logo" src={logo} alt="Melodie Logo" />
      </div>
      <nav>
        <ul>
          {links.map((items, index) => (
            <li key={index}>
              <Link to={items.to}>{items.name}</Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
