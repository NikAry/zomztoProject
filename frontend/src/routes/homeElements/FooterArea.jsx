import React from 'react';
import { Link } from 'react-router-dom';


function Footer() {
  return (
    <>
    <footer className="home-footer">
      <nav className="footer-nav" aria-label="Homepage navigation">
        <Link to="/" className="footer-item active">
          Home
        </Link>
        <Link to="/reels" className="footer-item">
          Reels
        </Link>
        <Link to="/cart" className="footer-item">
          Cart
        </Link>
      </nav>
    </footer>
    
    </>
  );
}

export default Footer;
