import { useEffect, useState } from 'react';
import { authCookie } from '../../../helpers/Cookies';
import { DeckDto } from '../../../helpers/CommonEntities';
import defaultImage from '../../../assets/default-deck2.webp'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark, faThumbTack, faPlusCircle, faPenToSquare } from '@fortawesome/free-solid-svg-icons'
import { Link, useNavigate } from 'react-router-dom';
import Pagination from '../../ui/Pagination';
import PaginationCount from '../../ui/PaginationCount';
import UpdateDeckSidebar from './UpdateDeckSidebar';

function Decks() {

    const navigate = useNavigate();

    const [data, setData] = useState<DeckDto[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [page, setPage] = useState<number>(0);
    const [pageSize, setPageSize] = useState<number>(10);
    const [totalElements, setTotalElements] = useState<number>(0);
    const [isUpdateSidebarOpen, setIsUpdateSidebarOpen] = useState<boolean>(false);    
    const [selectedDeck, setSelectedDeck] = useState<DeckDto | null>(null);
    
    const onUpdateSideClosed = (updated: boolean) => {
        setIsUpdateSidebarOpen(false);
        if (updated) {
            fetchData(page);
        }
    }

    const openUpdateSidebar = (e: React.MouseEvent<HTMLElement>, deck: DeckDto) => {
        e.stopPropagation();
        const deckClone: DeckDto = JSON.parse(JSON.stringify(deck));
        setSelectedDeck(deckClone);
        setIsUpdateSidebarOpen(true);
    }

    const fetchData = async (page: number) => {
        setPage(page);
        const token = authCookie();
        if (token == null) {
            throw new Error("no auth token")
        }
        try {
            const response = await fetch(`/api/v1/decks?size=${pageSize}&page=${page}`, {
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
            setTotalElements(result.totalCount);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData(0);
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
                        <div className='el-card-actions-button lg-screen' onClick={(e) => openUpdateSidebar(e, v)}>
                            <FontAwesomeIcon icon={faPenToSquare} />
                        </div>
                        <div className='el-card-actions-button lg-screen' onClick={(e) => e.stopPropagation()}>
                            <FontAwesomeIcon icon={faThumbTack} />
                        </div>
                        <div className='el-card-actions-button lg-screen' onClick={(e) => e.stopPropagation()}>
                            <FontAwesomeIcon icon={faXmark} />
                        </div>
                        <div className='el-card-actions-button sm-screen' onClick={(e) => e.stopPropagation()}>
                            ...
                        </div>
                    </div>
                ))}
            </div>

            <div>
                <Pagination currentPage={page} totalElements={totalElements} pageSize={pageSize} onPageChange={(page: number) => fetchData(page)} />
                <PaginationCount currentPage={page} totalElements={totalElements} pageSize={pageSize} currentPageSize={data.length} />
            </div>
            
            <UpdateDeckSidebar isOpen={isUpdateSidebarOpen} onClose={(updated: boolean) => onUpdateSideClosed(updated)} deck={selectedDeck} />

        </div>
    );
}

export default Decks;