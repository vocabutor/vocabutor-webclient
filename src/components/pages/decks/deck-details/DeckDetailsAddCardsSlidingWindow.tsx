import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClose } from '@fortawesome/free-solid-svg-icons'

import { authCookie } from '../../../../helpers/Cookies';
import { CardDto, PageDto } from "../../../../helpers/CommonEntities";
import SidebarCard from "./SidebarCard";

interface SlidingWindowProps {
    isOpen: boolean;
    onClose: () => void;
    excludeDeckId: string;
}

const DeckDetailsAddCardsSlidingWindow: React.FC<SlidingWindowProps> = ({ isOpen, onClose, excludeDeckId }) => {

    const [loading, setLoading] = useState<boolean>(true);

    const [page, setPage] = useState<number>(0);
    const [hasMore, setHasMore] = useState<boolean>(true);
    const [cards, setCards] = useState<CardDto[]>([]);
    const [totalCount, setTotalCount] = useState<number | null>(null);

    const loadMore = async () => {
        if (loading || !isOpen) {
            return;
        }
        setPage(page + 1);
        await fetchData(page + 1);
    };

    const fetchData = async (currentPage: number) => {
        const token = authCookie();
        if (token == null) {
            throw new Error("no auth token")
        }
        setLoading(true);
        try {
            const response = await fetch(`/api/v1/cards?page=${currentPage}`, {
                headers: {
                    "Authorization": 'Bearer ' + token,
                    "Content-Type": "application/json",
                },
            });
            if (!response.ok) {
                throw new Error(`Error: ${response.statusText}`);
            }
            const result: PageDto<CardDto> = await response.json();
            setHasMore(result.hasNext);
            setTotalCount(result.totalCount);
            if (result.items.length > 0) {
                setCards([...cards, ...result.items]);
            }
        } catch (err: any) {
            alert("error:" + err)
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (!isOpen) {
            return;
        }
        console.log("use effect fetching data");
        fetchData(page);
    }, [isOpen]);

    return (
        <div className={`sliding-window ${isOpen ? "open" : ""}`}>
            <div className="sliding-window-content">
                <div className="sliding-window-header">
                    <h2>Add Cards</h2>
                    <button onClick={onClose} className="sliding-window-close-button">
                        <FontAwesomeIcon icon={faClose}></FontAwesomeIcon>
                    </button>
                </div>

                <div className="sidebar-list">
                    {cards.map((card) => (
                        <SidebarCard key={card.id} cardId={card.id} phrase={card.phrase} deckId={excludeDeckId} />
                    ))}
                </div>

                <div className="sliding-window-footer">
                    {hasMore && <button className="sliding-window-hasmore" disabled={loading} onClick={() => loadMore()}>Load more</button>}
                    {totalCount && <div>
                        Displaying {cards.length} out of {totalCount} cards
                    </div>}
                </div>
            </div>
        </div>
    );
};

export default DeckDetailsAddCardsSlidingWindow;