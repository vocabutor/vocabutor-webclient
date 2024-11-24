import React from 'react';
import './Home.css'

const Home: React.FC = () => {
  return (
    <>
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
      
      {/* Learning Streak */}
      <section className="home-main-section stats">
        <h2>Learning Streak</h2>
        <div className="streak-info">
          <div className="streak-circle">5 Days</div>
          <div className="stats-details">
            <p>Cards Reviewed Today: 15</p>
            <p>Total Cards Mastered: 120</p>
          </div>
        </div>
      </section>

      {/* Recent Decks */}
      <section className="home-main-section recent-items">
        <h2>Your Recent Decks</h2>
        <div className="carousel">
          {[...Array(5)].map((_, i) => (
            <div className="carousel-card" key={i}>
              <h3 className="card-title">Deck {i + 1}</h3>
              <p className="card-info">20/50 Cards Mastered</p>
              <div className="progress-bar">
                <div className="progress" style={{ width: "40%" }}></div>
              </div>
            </div>
          ))}
          <div className="carousel-card add-deck">
            <span>+</span>
            <p>Add New Deck</p>
          </div>
        </div>

        <div className="show-all-container">
          <button className="btn primary show-all-btn" onClick={() => window.location.href = '/decks'}>
            Show All
          </button>
        </div>
      </section>

      {/* Recent Cards */}
      <section className="home-main-section recent-items">
        <h2>Your Recent Cards</h2>
        <div className="carousel">
          {[...Array(5)].map((_, i) => (
            <div className="carousel-card" key={i}>
              <h3 className="card-title">Deck {i + 1}</h3>
              <p className="card-info">20/50 Cards Mastered</p>
              <div className="progress-bar">
                <div className="progress" style={{ width: "40%" }}></div>
              </div>
            </div>
          ))}
          <div className="carousel-card add-deck">
            <span>+</span>
            <p>Add New Deck</p>
          </div>
        </div>

        <div className="show-all-container">
          <button className="btn primary show-all-btn" onClick={() => window.location.href = '/cards'}>
            Show All
          </button>
        </div>
      </section>

      {/* Suggested Decks */}
      <section className="home-main-section suggested-decks">
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

      

    </>
  )
};

export default Home;