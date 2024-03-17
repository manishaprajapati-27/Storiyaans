import React from "react";
import {
  FaBars,
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaYoutube,
} from "react-icons/fa";
// import { FaFacebookF } from "react-icons/fa";

const Navbar = () => {
  return (
    <header className="header">
      <div className="top-nav">
        <div className="container">
          <div className="d-flex justify-content-between">
            <div className="cat">
              <FaBars /> Categories
            </div>
            <div className="social-icons">
              <a href="#">
                <FaFacebookF />
              </a>
              <a href="#">
                <FaInstagram />
              </a>
              <a href="#">
                <FaLinkedinIn />
              </a>
              <a href="#">
                <FaYoutube />
              </a>
            </div>
          </div>
        </div>
      </div>
      <nav className="navbar">
        <div className="container">
          <a href="#">Storiyaans</a>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
