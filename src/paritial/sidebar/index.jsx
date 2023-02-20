import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "../../assets/logo.png";
import { links } from "../../routes/links";
import "./sidebar.css";
export default function Sidebar() {
  const location = useLocation();
  const checkMenueActive = (root, urlName) => {
    const menuUrl = root + urlName;
    var path = window.location.pathname;
    console.log("current path:", path === menuUrl, "\n");
    path = path.replace(/\/$/, "");
    path = decodeURIComponent(path);
    // console.log("path", urlName === path);
    if (root + urlName === path) {
      return "active";
    }
  };
  useEffect(() => {
    checkMenueActive();
  }, [location]);

  return (
    <div id="sidebar">
      <div>
        <img className="sidebar-logo" src={logo} alt="Melodie Logo" />
      </div>
      <nav>
        <ul>
          {links.map((items, index) => (
            <li key={index}>
              <Link
                className={`sidebar-item ${checkMenueActive(
                  "/app/",
                  items.to
                )}`}
                to={items.to}
              >
                {items.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
