import React from 'react';
import {Link} from 'react-router-dom'
function Navbar(props) {
    const dp = props.dp || 'G'; // Default to 'G' if dp is not provided
    console.log("Navbar received dp prop:", dp);
    return (
        <header className="home-navbar">
            <div className="home-brand">Zomzto</div>
            <Link className='profileData' to={'/view/user/profile'}>
                <div className="home-dp">{dp}</div>
            </Link>
        </header>
    );
}

export default Navbar;