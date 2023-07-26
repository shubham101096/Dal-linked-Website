import React from "react";
import Nav from "react-bootstrap/Nav";
import "../styles/Footer.css";

function Footer() {
  return (
    <div className="footer">
      <div className="footer-content">
        {/* <div className="footer-address">
          <p className="office-address-title">Office Address</p>
          <p className="office-address">
            Dalhousie University Halifax, <br />
            Nova Scotia, Canada
            <br /> B3H 4R2 <br />
            1-902-494-2211
          </p>
        </div> */}
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
