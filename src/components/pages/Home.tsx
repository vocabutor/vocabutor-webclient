import React from 'react';
import './Home.css'

const Home: React.FC = () => {
  return (
    <div className="homepage">
      {/* Header */}
      <header className="header">
        <div className="logo">Vocabutor</div>
        <input
          type="text"
          className="search-bar"
          placeholder="Search decks or cards…"
        />
        <nav className="nav-menu">
          <a href="/" className="nav-link active">
            Home
          </a>
          <a href="/decks" className="nav-link">
            My Decks
          </a>
          <a href="/profile" className="nav-link">
            Profile
          </a>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="hero">
        <h1 className="hero-title">Master Any Language with Ease</h1>
        <p className="hero-subtitle">
          Create custom flashcards, organize them into decks, and learn at your
          pace.
        </p>
        <div className="hero-buttons">
          <button className="btn primary">Get Started</button>
          <button className="btn secondary">Browse Decks</button>
        </div>
      </section>

      {/* Recent Decks */}
      <section className="recent-decks">
        <h2>Your Recent Decks</h2>
        <div className="deck-carousel">
          {[...Array(5)].map((_, i) => (
            <div className="deck-card" key={i}>
              <h3 className="deck-title">Deck {i + 1}</h3>
              <p className="deck-info">20/50 Cards Mastered</p>
              <div className="progress-bar">
                <div className="progress" style={{ width: "40%" }}></div>
              </div>
            </div>
          ))}
          <div className="deck-card add-deck">
            <span>+</span>
            <p>Add New Deck</p>
          </div>
        </div>
      </section>

      {/* Suggested Decks */}
      <section className="suggested-decks">
        <h2>Explore Popular Decks</h2>
        <div className="deck-grid">
          {[...Array(6)].map((_, i) => (
            <div className="deck-card" key={i}>
              <h3 className="deck-title">Popular Deck {i + 1}</h3>
              <button className="btn small">Try Now</button>
            </div>
          ))}
        </div>
      </section>

      {/* Learning Streak */}
      <section className="stats">
        <h2>Learning Streak</h2>
        <div className="streak-info">
          <div className="streak-circle">5 Days</div>
          <div className="stats-details">
            <p>Cards Reviewed Today: 15</p>
            <p>Total Cards Mastered: 120</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div>About Us</div>
        <div>Support</div>
        <div>Social Links</div>
      </footer>
    </div>
  )
};

export default Home;