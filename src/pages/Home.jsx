import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
  return (
    <div className="home-container">
      <section className="hero-section">
        <div className="hero-content">
          <h1>Welcome to Football Tickets</h1>
          <p>Get your tickets for the biggest matches in football</p>
          <Link to="/tickets" className="cta-button">Browse Tickets</Link>
        </div>
      </section>

      <section className="features-section">
        <h2>Why Choose Us</h2>
        <div className="features-grid">
          <div className="feature-card">
            <span className="feature-icon">🎫</span>
            <h3>Secure Tickets</h3>
            <p>All tickets come with secure QR codes</p>
          </div>
          <div className="feature-card">
            <span className="feature-icon">⚡</span>
            <h3>Instant Delivery</h3>
            <p>Get your tickets instantly after purchase</p>
          </div>
          <div className="feature-card">
            <span className="feature-icon">💰</span>
            <h3>Best Prices</h3>
            <p>Competitive prices for all matches</p>
          </div>
        </div>
      </section>

      <section className="upcoming-matches">
        <h2>Featured Matches</h2>
        <div className="matches-grid">
          <div className="match-card">
            <img src="https://media.istockphoto.com/id/1775210110/photo/spectators-at-sport-venue.jpg?s=1024x1024&w=is&k=20&c=0We03ce2VDrSDvqQrYq4i66L6b4VQsY4Nil4eTVfxE0=" alt="Stadium" className="match-image" />
            <div className="match-info">
              <h3>Liverpool vs Manchester United</h3>
              <p>Premier League</p>
              <p className="match-date">March 15, 2025</p>
              <Link to="/tickets" className="match-button">View Tickets</Link>
            </div>
          </div>
          <div className="match-card">
            <img src="https://media.istockphoto.com/id/1775259725/photo/large-crowd-in-a-football-stadium.jpg?s=1024x1024&w=is&k=20&c=aWvDhxy4Dg6a1AvoFsITlAzy-cJ23JqOpvn0W3PTo2s=" alt="Stadium" className="match-image" />
            <div className="match-info">
              <h3>Real Madrid vs Barcelona</h3>
              <p>La Liga</p>
              <p className="match-date">March 20, 2025</p>
              <Link to="/tickets" className="match-button">View Tickets</Link>
            </div>
          </div>
        </div>
      </section>

      <section className="newsletter-section">
        <div className="newsletter-content">
          <h2>Stay Updated</h2>
          <p>Subscribe to get the latest updates on ticket availability</p>
          <form className="newsletter-form">
            <input type="email" placeholder="Enter your email" />
            <button type="submit">Subscribe</button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default Home;