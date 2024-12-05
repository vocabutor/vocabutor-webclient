import { useEffect, useState } from 'react';
import { authCookie } from '../../../../helpers/Cookies';
import { DeckDto } from '../../../../helpers/CommonEntities';

function RecentDecks() {

    const [data, setData] = useState<DeckDto[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    
    useEffect(() => {
      const fetchData = async () => {
        const token = authCookie();
        if (token == null) {
          throw new Error("no auth token")
        }
        try {
          const response = await fetch("/api/v1/decks?size=10", {
            headers: {
              "Authorization": 'Bearer ' + token,
              "Content-Type": "application/json",
            },
          });
          if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`);
          }
          const result = await response.json();
          setData(result.items);
        } catch (err: any) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      };
  
      fetchData();
    }, []);
    
    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <section className="home-main-section recent-items">
        <h2>Your Recent Decks</h2>
        <div className="carousel">
          {data.map((v, i) => (
            <div className="carousel-card" key={v.id}>
              <h3 className="card-title">{v.title}</h3>
              <p className="card-info">{v.cards.length}</p>
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
    );
}

export default RecentDecks;