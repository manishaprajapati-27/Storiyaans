import React from "react";
import {
  FaBars,
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaYoutube,
} from "react-icons/fa";
import { IoIosSearch } from "react-icons/io";
// import { Link } from "react-router-dom";
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
          <a to="/" className="logo">
            <h2>
              News<span>&</span>Blogs
            </h2>
            <h6 className="text-light">Read and Create</h6>
            <div className="ms-ico">
              <span>Hey!</span>
            </div>
          </a>
          <div className="nav-links d-flex justify-content-between align-items-center">
            <ul>
              <li>
                <a href="#" className="nav-link">
                  Home
                </a>
              </li>
              <li>
                <a href="#" className="nav-link">
                  About
                </a>
              </li>
              <li>
                <a href="#" className="nav-link">
                  Popular
                </a>
              </li>
              <li>
                <a href="#" className="nav-link">
                  Lifestyle
                </a>
              </li>
              <li>
                <a href="#" className="nav-link">
                  Contact Us
                </a>
              </li>
            </ul>
            <div className="search">
              <input
                type="search"
                className="form-control"
                placeholder="Search here"
              />
              <div className="icon">
                <IoIosSearch />
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
