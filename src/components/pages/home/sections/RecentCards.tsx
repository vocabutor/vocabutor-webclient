import { Link } from 'react-router-dom';

function RecentCards() {
    return (
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
                <Link to="/cards">
                    <button className="btn primary show-all-btn">
                        Show All
                    </button>
                </Link>
            </div>
        </section>
    );
}

export default RecentCards;