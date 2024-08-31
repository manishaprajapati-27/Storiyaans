import React from "react";
import {
  FaBars,
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaYoutube,
  FaRegCopyright,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="footer bg-dark-alt py-1">
      <div className="container">
        <div className="d-flex justify-content-between align-items-center">
          <p className="d-flex align-items-center">
            2024
            <span className="d-flex copy">
              <FaRegCopyright />
            </span>
            copyright By Manisha.
          </p>
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
    </footer>
  );
};

export default Footer;
