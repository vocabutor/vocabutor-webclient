import { useState, useEffect } from "react";
import { authCookie } from '../../../../helpers/Cookies';
import { DeckDto } from "../../../../helpers/CommonEntities";
import { useParams, useNavigate } from "react-router-dom";
import Flashcard from "../../../Flashcard";

export default function DeckDetails() {

    const { deckId } = useParams();
    const navigate = useNavigate()

    const [loading, setLoading] = useState<boolean>(true);
    const [deck, setDeck] = useState<DeckDto>();

    const handleEdit = () => alert("Edit Flashcard");
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
            </div>

            <div className='flashcard-list'>
                {deck?.cards.map((item) => (
                    <Flashcard
                        key={item.id}
                        title={item.phrase}
                        description="Here goes some description for the card"
                        onDetails={() => navigate(`/cards/${item.id}?source=deck_${deckId}`)}
                        onDelete={() => handleDelete(item.id)}
                    />
                ))}
            </div>



        </div>
    )
}