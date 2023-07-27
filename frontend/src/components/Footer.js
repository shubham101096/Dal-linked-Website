/* MADE BY PIYUSH AKOLIYA */

import React from "react";
import Nav from "react-bootstrap/Nav";
import "../styles/Footer.css";

function Footer() {
  return (
    <div className="footer">
      <div className="footer-content">
        <div className="footer-links">
          <div className="footer-address">
            <Nav.Link href="/contactUs">
              <p className="office-contact-title">Contact Us</p>
            </Nav.Link>
          </div>
          <div className="footer-address">
            <Nav.Link href="/faq">
              <p className="office-faq-title">FAQ</p>
            </Nav.Link>
          </div>
        </div>
      </div>
      <hr className="horiontal-line" />
    </div>
  );
}

export default Footer;
