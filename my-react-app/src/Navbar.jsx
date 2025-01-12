import React from "react";
import "./index.css";

function NavBar({ onLogoClick }) {
  const navBarItems = {
    left: [
      {
        label: "Home",
        icon: "fa-solid fa-house", // Font Awesome class for the Home icon
        active: true,
        onClick: () => console.log("Navigate to Home"),
      },
      {
        label: "Explore",
        icon: "fa-solid fa-compass", // Font Awesome class for the Explore icon
        active: false,
        onClick: () => console.log("Navigate to Explore"),
      },
    ],
    right: [
      {
        label: "Search",
        icon: "fa-solid fa-magnifying-glass", // Font Awesome class for the Search icon
        active: false,
        onClick: () => console.log("Open Search"),
      },
      {
        label: "Profile",
        icon: "fa-solid fa-user", // Font Awesome class for the Profile icon
        active: false,
        onClick: () => console.log("Open Profile"),
      },
    ],
  };

  return (
    <div className="navbar">
      {/* Left Section */}
      <div className="navbar-left">
        {navBarItems.left.map((item, index) => (
          <div
            key={index}
            className={`navbar-item ${item.active ? "active" : ""}`}
            onClick={item.onClick}
          >
            <i className={item.icon}></i>
            <span className="navbar-label">{item.label}</span>
          </div>
        ))}
      </div>

      {/* Center Logo */}
      <div className="navbar-center" onClick={onLogoClick}>
        {/* <i className="fa-solid fa-gamepad"></i> Example logo as an icon */}
        <p>Game Swap</p>
      </div>

      {/* Right Section */}
      <div className="navbar-right">
        {navBarItems.right.map((item, index) => (
          <div
            key={index}
            className={`navbar-item ${item.active ? "active" : ""}`}
            onClick={item.onClick}
          >
            <i className={item.icon}></i>
            <>{item.label}</>
            {/* <span className="navbar-label">{item.label}</span> */}
          </div>
        ))}
      </div>
    </div>
  );
}

export default NavBar;
