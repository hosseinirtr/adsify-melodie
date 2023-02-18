import React from "react";
import searchIcon from "../../assets/icons/Search.png";
import tvIcon from "../../assets/icons/TV.png";
import radioIcon from "../../assets/icons/Radio.png";
import bellIcon from "../../assets/icons/Bell.png";
import { useScrollPosition } from "../../hooks";
import "./header.css";

export default function Header() {
  const scrollPosition = useScrollPosition();

  return (
    <>
      <div className={`${scrollPosition > 20 ? "shadow- " : ""}header`}>
        <div className="header-search-section">
          <img src={searchIcon} alt="search-icon" />{" "}
          <span style={{ marginInline: "10px" }}>
            Search anything in your mind
          </span>
        </div>
        <div className="header-section">
          <img src={tvIcon} alt="tv" />{" "}
          <span style={{ marginInline: "0px" }}></span>
        </div>
        <div className="header-section">
          <img src={radioIcon} alt="radio" />{" "}
          <span style={{ marginInline: "0px" }}></span>
        </div>
        <div className="header-section">
          <img src={bellIcon} alt="notification" />{" "}
          <span style={{ marginInline: "0px" }}></span>
        </div>
        <div id="header-profile">
          <span style={{ marginInline: "0px" }}>Profile</span>
        </div>
      </div>
    </>
  );
}
