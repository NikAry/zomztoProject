import React from 'react';
import {Link} from 'react-router-dom'
function Navbar() {
    return (
        <header className="home-navbar">
            <div className="home-brand">Zomzto</div>
            <Link className='profileData' to={'/view/user/profile'}>
                AP
            </Link>
        </header>
    );
}

export default Navbar;