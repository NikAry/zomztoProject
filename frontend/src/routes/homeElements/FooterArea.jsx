import { House, ShoppingBag, Video } from 'lucide-react';
import React from 'react';
import { Link } from 'react-router-dom';


function FooterArea() {
  return (
    <>
    <footer className="home-footer">
      <nav className="footer-nav" aria-label="Homepage navigation">
        <Link to="/" className="footer-item">
          <House />
        </Link>
        <Link to="/reels" className="footer-item">
          <Video />
        </Link>
        <Link to="/cart" className="footer-item">
          <ShoppingBag />
        </Link>
      </nav>
    </footer>
    
    </>
  );
}

export default FooterArea;
