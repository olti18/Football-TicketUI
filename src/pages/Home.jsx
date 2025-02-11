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
      <section className="hero-section">
        <div className="hero-overlay"></div>
        <div className="hero-content animate">
          <h1>Experience the Beautiful Game</h1>
          <p>Get premium tickets for the world's biggest football matches</p>
          <div className="hero-buttons">
            <Link to="/tickets" className="cta-button primary">Browse Tickets</Link>
            <Link to="/matches" className="cta-button secondary">View Matches</Link>
          </div>
        </div>
      </section>

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

      <section className="features-section">
        <h2 className="section-title animate">Why Choose Us</h2>
        <div className="features-grid">
          {[
            { icon: '🎫', title: 'Secure Tickets', desc: 'Digital QR codes for instant access' },
            { icon: '⚡', title: 'Instant Delivery', desc: 'Get your tickets immediately' },
            { icon: '💰', title: 'Best Prices', desc: 'Competitive pricing guaranteed' },
            { icon: '🔒', title: 'Safe & Secure', desc: 'Protected transactions' }
          ].map((feature, index) => (
            <div key={index} className="feature-card animate">
              <span className="feature-icon">{feature.icon}</span>
              <h3>{feature.title}</h3>
              <p>{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="upcoming-matches">
        <h2 className="section-title animate">Featured Matches</h2>
        <div className="matches-grid">
          {[
            {
              image: "https://images.unsplash.com/photo-1577223608772-0a6c9fbcc7b3",
              teams: "Liverpool vs Manchester United",
              league: "Premier League",
              date: "March 15, 2025",
              price: "From $99"
            },
            {
              image: "https://images.unsplash.com/photo-1577223608772-0a6c9fbcc7b3",
              teams: "Real Madrid vs Barcelona",
              league: "La Liga",
              date: "March 20, 2025",
              price: "From $120"
            }
          ].map((match, index) => (
            <div key={index} className="match-card animate">
              <div className="match-image-container">
                <img src={match.image} alt={match.teams} className="match-image" />
                <div className="match-overlay">
                  <span className="match-price">{match.price}</span>
                </div>
              </div>
              <div className="match-info">
                <h3>{match.teams}</h3>
                <p className="match-league">{match.league}</p>
                <p className="match-date">{match.date}</p>
                <Link to="/tickets" className="match-button">View Tickets</Link>
              </div>
            </div>
          ))}
        </div>
      </section>

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
