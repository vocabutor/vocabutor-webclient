import { useState, useEffect } from "react";
import { authCookie } from '../../../../helpers/Cookies';
import { DeckDto } from "../../../../helpers/CommonEntities";
import { useParams, useNavigate } from "react-router-dom";
import Flashcard from "../../../Flashcard";
import DeckDetailsAddCardsSlidingWindow from "./DeckDetailsAddCardsSlidingWindow";
import defaultImage from '../../../../assets/default-deck2.webp'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons'

export default function DeckDetails() {

    const { deckId } = useParams();
    const navigate = useNavigate()

    const [loading, setLoading] = useState<boolean>(true);
    const [deck, setDeck] = useState<DeckDto>();

    const [searchText, setSearchText] = useState("");
    const [categoryFilter, setCategoryFilter] = useState("All");
    const [sortOption, setSortOption] = useState("Title");
    const [selectedTags, setSelectedTags] = useState<string[]>([]);
    
    const [isWindowOpen, setIsWindowOpen] = useState(false);

    const openWindow = () => setIsWindowOpen(true);
    const closeWindow = () => {
        setIsWindowOpen(false);
        fetchData();
    };

    const allTags = ["Object", "Car", "Color", "Verb", "Animal", "House"];

    const toggleTag = (tag: string) => {
        setSelectedTags((prev) =>
            prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
        );
    };

    const handleDelete = async (cardId: string) => {
        const token = authCookie();
        if (token == null) {
            throw new Error("no auth token")
        }
        try {
            const response = await fetch(`/api/v1/decks/${deckId}/cards/${cardId}`, {
                method: 'DELETE',
                headers: {
                    "Authorization": 'Bearer ' + token,
                    "Content-Type": "application/json",
                },
            });
            if (!response.ok) {
                throw new Error(`Error: ${response.statusText}`);
            }
            fetchData();
        } catch (err: any) {
            alert("error:" + err)
        }
    };

    const fetchData = async () => {
        const token = authCookie();
        if (token == null) {
            throw new Error("no auth token")
        }
        setLoading(true);
        try {
            const response = await fetch(`/api/v1/decks/${deckId}/with-cards`, {
                headers: {
                    "Authorization": 'Bearer ' + token,
                    "Content-Type": "application/json",
                },
            });
            if (!response.ok) {
                throw new Error(`Error: ${response.statusText}`);
            }
            const result: DeckDto = await response.json();
            setDeck(result)
        } catch (err: any) {
            alert("error:" + err)
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div className="padded-container">
            <div className='list-header-section'>
                {loading ? (
                    <>
                        <div className="skeleton skeleton-main-title"></div>
                    </>
                ) : (
                    <>
                        <h1 className='header-title'>{deck?.title}</h1>
                    </>
                )}
                <button className="btn primary" disabled={loading} onClick={() => openWindow()}>
                    Add Cards
                    <FontAwesomeIcon icon={faPlusCircle} />
                </button>
            </div>

            <div className="stretch">

                <div className="deck-info">
                    <div className="deck-image">
                        {loading ? 
                        <div className="skeleton deck-image-skeleton" />
                            
                            :
                            <img src={defaultImage} alt="Deck default image" />
                        }
                        
                    </div>
                    {loading ?
                        <div className="description-skeleton">
                            <p className="skeleton text-line-skeleton"></p>
                            <p className="skeleton text-line-skeleton"></p>
                            <p className="skeleton text-halfline-skeleton"></p>
                        </div> 
                        :
                        <div className="deck-description">
                            Here is a description for this amazing deck. It can be auto generated by AI based on the cards added to deck.
                        </div>
                    }
                </div>

                <div className="flashcard-list-filters">
                    {loading ? 
                    <div className="skeleton skeleton-row">
                    </div>
                    :
                    <div className="filters-row">
                        <div className="filter-item-box">
                            <input
                                type="text"
                                placeholder="Search by title..."
                                value={searchText}
                                onChange={(e) => setSearchText(e.target.value)}
                                className="filter-input"
                            />
                        </div>

                        <div className="filter-item-box">
                            <select
                                value={categoryFilter}
                                onChange={(e) => setCategoryFilter(e.target.value)}
                                className="filter-dropdown"
                            >
                                <option value="All">All Categories</option>
                                <option value="Math">Math</option>
                                <option value="Science">Science</option>
                                <option value="History">History</option>
                            </select>
                        </div>

                        <div className="filter-item-box">
                            <select
                                value={sortOption}
                                onChange={(e) => setSortOption(e.target.value)}
                                className="sort-dropdown"
                            >
                                <option value="Title">Sort by Title</option>
                                <option value="Category">Sort by Category</option>
                            </select>
                        </div>
                    </div> 
                }
                </div>

                {/* Tags Row */}
                <div className="tags-row">
                    {loading ? 
                        <>
                            <div className="skeleton tag-skeleton"></div>
                            <div className="skeleton tag-skeleton"></div>
                            <div className="skeleton tag-skeleton"></div>
                            <div className="skeleton tag-skeleton"></div>
                            <div className="skeleton tag-skeleton"></div>
                        </>
                        :
                        <>
                        {allTags.map((tag) => (
                            <button
                                key={tag}
                                onClick={() => toggleTag(tag)}
                                className={`tag ${selectedTags.includes(tag) ? "selected" : ""}`}
                            >
                                {tag}
                            </button>
                        ))}
                        </>
                    }
                </div>

                <div className='flashcard-list'>
                    {loading ? 
                    <>
                        {Array.from({ length: 10 }, (_, index) => (
                        <div key={index} className="skeleton flash-card-skeleton"></div>
                        ))}
                    </>
                    :
                    <>
                    {deck?.cards.map((item) => (
                        <Flashcard
                            key={item.id}
                            title={item.phrase}
                            description="Here goes some description for the card"
                            onDetails={() => navigate(`/cards/${item.id}?source=deck_${deckId}`)}
                            onDelete={() => handleDelete(item.id)}
                        />
                    ))}
                    </>
                    }
                </div>
            </div>

            <div>
                Displaying {deck?.cards.length} of {deck?.cards.length} items
            </div>
            
            <DeckDetailsAddCardsSlidingWindow isOpen={isWindowOpen} onClose={closeWindow} excludeDeckId={deckId!!} />

        </div>
    )
}