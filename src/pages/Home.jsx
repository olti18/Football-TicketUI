import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
  useEffect(() => {
    // Animate elements on scroll
    const observerCallback = (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, {
      threshold: 0.1
    });

    document.querySelectorAll('.animate').forEach(element => {
      observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="home-container">
      <div className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">
            Experience the <span className="highlight">Thrill</span> of Live Football
          </h1>
          <p className="hero-subtitle">
            Get your tickets now and be part of the action
          </p>
          <Link to="/tickets" className="cta-button">
            Browse Tickets
            <span className="button-arrow">→</span>
          </Link>
        </div>
        <div className="hero-graphics">
          <div className="stadium-graphic"></div>
          <div className="floating-tickets">
            <div className="ticket-card ticket-1"></div>
            <div className="ticket-card ticket-2"></div>
            <div className="ticket-card ticket-3"></div>
          </div>
        </div>
      </div>

      <section className="stats-section animate">
        <div className="stat-container">
          <div className="stat-item">
            <span className="stat-number">50K+</span>
            <span className="stat-label">Happy Fans</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">100+</span>
            <span className="stat-label">Matches</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">98%</span>
            <span className="stat-label">Satisfaction</span>
          </div>
        </div>
      </section>

      <div className="features-section">
        <div className="feature-card">
          <div className="feature-icon">🎟️</div>
          <h3>Easy Booking</h3>
          <p>Book your tickets in minutes with our simple process</p>
        </div>
        <div className="feature-card">
          <div className="feature-icon">🏟️</div>
          <h3>Best Seats</h3>
          <p>Choose from a wide selection of premium seats</p>
        </div>
        <div className="feature-card">
          <div className="feature-icon">📱</div>
          <h3>Mobile Tickets</h3>
          <p>Get your tickets delivered instantly to your phone</p>
        </div>
      </div>

      <div className="upcoming-matches">
        <h2>Upcoming Matches</h2>
        <div className="matches-grid">
          {[1, 2, 3].map((match) => (
            <div key={match} className="match-card">
              <div className="teams">
                <span className="team">Team A</span>
                <span className="vs">VS</span>
                <span className="team">Team B</span>
              </div>
              <div className="match-info">
                <span className="date">Mar 15, 2024</span>
                <span className="time">20:00</span>
              </div>
              <Link to="/tickets" className="view-tickets">
                View Tickets
              </Link>
            </div>
          ))}
        </div>
      </div>

      <section className="newsletter-section">
        <div className="newsletter-content animate">
          <h2>Never Miss a Match</h2>
          <p>Subscribe for exclusive ticket alerts and special offers</p>
          <form className="newsletter-form" onSubmit={(e) => e.preventDefault()}>
            <input type="email" placeholder="Enter your email address" />
            <button type="submit">Subscribe</button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default Home;
