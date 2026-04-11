import React from 'react';
import { Link } from 'react-router-dom';

function BodyHome() {
    return (
        <main className="home-main">
            <section className="home-hero">
                <h2>Offers and discounts</h2>
                <p>Explore curated meals, partner offers, and local deals in one beautiful place.</p>
            </section>

            <section className="home-section-wrapper">
                <div className="home-section-title">Dishes</div>
                <div className="home-grid">
                    <div className="home-card">Popular dishes</div>
                    <div className="home-card">Freshly cooked</div>
                </div>
            </section>

            <section className="home-section-wrapper">
                <div className="home-section-title">Stores</div>
                <div className="home-grid">
                    <div className="home-card">Nearby kitchens</div>
                    <div className="home-card">Top sellers</div>
                </div>
            </section>
        </main>
    );
}

export default BodyHome;