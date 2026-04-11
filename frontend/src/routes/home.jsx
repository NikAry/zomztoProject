import React from 'react'
import Navbar from './homeElements/Navbar'
import BodyHome from './homeElements/BodyHome'
import Footer from './homeElements/FooterArea'
import './homeElements/HomeLayout.css'

export default function Home() {
    return (
        <div className="home-shell">
            <Navbar />
            <BodyHome />
            <Footer />
        </div>
    )
}
