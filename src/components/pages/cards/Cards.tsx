import { useEffect, useState } from 'react';
import { authCookie } from '../../../helpers/Cookies';
import { CardDto, PageDto } from '../../../helpers/CommonEntities';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link, useNavigate } from 'react-router-dom';
import Flashcard from '../../Flashcard';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons'
import Pagination from '../../ui/Pagination';
import PaginationCount from '../../ui/PaginationCount';

export default function Cards() {

    const navigate = useNavigate();

    const [data, setData] = useState<CardDto[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [page, setPage] = useState<number>(0);
    const [totalElements, setTotalElements] = useState<number>(0);
    const [pageSize, setPageSize] = useState<number>(20);

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
            fetchData(0);
        } catch (err: any) {
            alert("error:" + err)
        }
    };

    const fetchData = async (page: number) => {
        setPage(page);
        const token = authCookie();
        if (token == null) {
            throw new Error("no auth token")
        }
        try {
            setLoading(true);
            const response = await fetch(`/api/v1/cards?size=${pageSize}&page=${page}`, {
                headers: {
                    "Authorization": 'Bearer ' + token,
                    "Content-Type": "application/json",
                },
            });
            if (!response.ok) {
                throw new Error(`Error: ${response.statusText}`);
            }
            const result: PageDto<CardDto> = await response.json();
            setTotalElements(result.totalCount)
            setData(result.items);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData(0);
    }, []);

    if (error) return <div>Error: {error}</div>;

    return (
        <div className="padded-container">
            <div className='list-header-section'>
                <h1 className='header-title'>Cards</h1>
                <div className='list-header-actions'>
                    <Link to="/cards/new">
                        <button className="btn primary" disabled={loading}>
                            New Card
                            <FontAwesomeIcon icon={faPlusCircle} />
                        </button>
                    </Link>
                </div>
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
                }
            </div>

            <div>
                <PaginationCount
                    currentPage={page}
                    totalElements={totalElements}
                    pageSize={pageSize}
                    currentPageSize={data.length}
                />
            </div>

            <div>
                <Pagination
                    currentPage={page + 1}
                    totalElements={totalElements}
                    pageSize={20}
                    onPageChange={(page) => fetchData(page - 1)}
                />
            </div>

        </div>
    );
}