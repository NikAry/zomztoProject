import React from 'react'
import { Link } from 'react-router-dom'

export default function Home() {
    return(
        <div>
            <h1>Welcome to Zomzto!</h1>
            <p>Your one-stop destination for delicious meals from nearby kitchens.</p>
            <Link to="/reels">
                <button style={{ padding: '10px 20px', fontSize: '16px', cursor: 'pointer' }}>
                    Watch Food Reels
                </button>
            </Link>
        </div>
    )
}   