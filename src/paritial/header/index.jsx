import React from "react";
import searchIcon from "../../assets/icons/Search.png";
import tvIcon from "../../assets/icons/TV.png";
import radioIcon from "../../assets/icons/Radio.png";
import bellIcon from "../../assets/icons/Bell.png";

export default function Header() {
  return (
    <>
      <div className="header">
        <div>
          <img src={searchIcon} alt="search-icon" />{" "}
          <span style={{ marginInline: "10px" }}>
            Search anything in your mind
          </span>
        </div>
        <div>
          <img src={tvIcon} alt="search-icon" />{" "}
          <span style={{ marginInline: "10px" }}>2 TV</span>
        </div>
        <div>
          <img src={radioIcon} alt="search-icon" />{" "}
          <span style={{ marginInline: "10px" }}>3 Radio</span>
        </div>
        <div>
          <img src={bellIcon} alt="search-icon" />{" "}
          <span style={{ marginInline: "10px" }}>4 Notification</span>
        </div>
        <div>
          <span style={{ marginInline: "10px" }}>5 Profile</span>
        </div>
      </div>
    </>
  );
}
