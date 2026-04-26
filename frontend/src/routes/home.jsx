import React from 'react'
import Navbar from './homeElements/Navbar'
import BodyHome from './homeElements/BodyHome'
import Footer from './homeElements/FooterArea'
import './homeElements/HomeLayout.css'

export default function Home({ user }) {
    const dp = user?.fullName ? user.fullName.substring(0, 1).toUpperCase() : 'G'

    return (
        <div className="home-shell">
            <Navbar dp={dp} />
            <BodyHome />
            <Footer />
        </div>
    )
}
