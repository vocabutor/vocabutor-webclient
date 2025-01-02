import { useEffect, useState } from 'react';
import { authCookie } from '../../../helpers/Cookies';
import { DeckDto } from '../../../helpers/CommonEntities';
import defaultImage from '../../../assets/default-deck2.webp'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark, faThumbTack, faPlusCircle, faPenToSquare } from '@fortawesome/free-solid-svg-icons'
import { Link, useNavigate } from 'react-router-dom';

function Decks() {

    const navigate = useNavigate();

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
        <div className="padded-container">
            <div className='list-header-section'>
                <h1 className='header-title'>Decks</h1>
                <div className='list-header-actions'>
                    <Link to="/decks/new">
                        <button className="btn primary">
                            New Deck
                            <FontAwesomeIcon icon={faPlusCircle} />
                        </button>
                    </Link>
                </div>
            </div>

            <div className='list-main-section'>
                {data.map((v, _) => (
                    <div className="el-card" onClick={(_: React.MouseEvent<HTMLElement>) => {
                        navigate(`/decks/${v.id}`)
                      }}>
                        <div className="el-card-photo">
                            <img src={defaultImage} alt="Item Photo" />
                        </div>
                        <div className="el-card-content">
                            <h3 className="el-card-title">{v.title}</h3>
                            <p className="el-card-description multiline-ellipsis">Optional description goes here. This can provide more details about the item.</p>
                        </div>
                        <div className='el-card-actions-button lg-screen'>
                            <FontAwesomeIcon icon={faPenToSquare} />
                        </div>
                        <div className='el-card-actions-button lg-screen'>
                            <FontAwesomeIcon icon={faThumbTack} />
                        </div>
                        <div className='el-card-actions-button lg-screen'>
                            <FontAwesomeIcon icon={faXmark} />
                        </div>
                        <div className='el-card-actions-button sm-screen'>
                            ...
                        </div>
                    </div>
                ))}
            </div>

        </div>
    );
}

export default Decks;