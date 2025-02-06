import { useEffect, useState } from 'react';
import { authCookie } from '../../../helpers/Cookies';
import { CardDto } from '../../../helpers/CommonEntities';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link, useNavigate } from 'react-router-dom';
import Flashcard from '../../Flashcard';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons'

export default function Cards() {

    const navigate = useNavigate();
    
    const [data, setData] = useState<CardDto[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    
    const handleDelete = async (cardId: string) => {
        const token = authCookie();
        if (token == null) {
            throw new Error("no auth token")
        }
        try {
            const response = await fetch(`/api/v1/cards/${cardId}`, {
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
        try {
            const response = await fetch("/api/v1/cards?size=20", {
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

    useEffect(() => {
        fetchData();
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="padded-container">
            <div className='list-header-section'>
                <h1 className='header-title'>Cards</h1>
                <div className='list-header-actions'>
                    <Link to="/cards/new">
                        <button className="btn primary">
                            New Card
                            <FontAwesomeIcon icon={faPlusCircle} />
                        </button>
                    </Link>
                </div>
            </div>

            <div className='flashcard-list'>
            <>
                    {data.map((item) => (
                        <Flashcard
                            key={item.id}
                            title={item.phrase}
                            description="Here goes some description for the card"
                            onDetails={() => navigate(`/cards/${item.id}?source=cards`)}
                            onDelete={() => handleDelete(item.id)}
                        />
                    ))}
                    </>
            </div>
            
            <div className="sub-paged-list">
                Displaying {data.length} of {data.length} items
            </div>

        </div>
    );
}