import { useEffect, useState } from "react";
import classNames from "classnames";
import { authCookie } from '../../../../helpers/Cookies';
import { DeckDto } from "../../../../helpers/CommonEntities";
import { useSearchParams, Link } from 'react-router-dom';


export default function DeckCreated() {
    const [searchParams] = useSearchParams();
    const [loading, setLoading] = useState<boolean>(true);

    const [title, setTitle] = useState<string>("");
    const [language, setLanguage] = useState<string>("Norwegian"); //TODO load from api when supported
    const [tags, setTags] = useState<string[]>(["Bil", "Hus"]); //TODO load from api when supported

    useEffect(() => {
        const fetchData = async () => {
            const deckId = searchParams.get('deckId')
            const token = authCookie();
            if (token == null) {
                throw new Error("no auth token")
            }
            try {
                const response = await fetch(`/api/v1/decks/${deckId}`, {
                    headers: {
                        "Authorization": 'Bearer ' + token,
                        "Content-Type": "application/json",
                    },
                });
                if (!response.ok) {
                    throw new Error(`Error: ${response.statusText}`);
                }
                const result: DeckDto = await response.json();
                setTitle(result.title)
            } catch (err: any) {
                alert("error:" + err)
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="success-container">
            {/* Tick animation */}
            {!loading ? (<div className="tick-wrapper">
                <div className="tick-mark"></div>
            </div>) : <div></div>}

            {/* Summary section */}
            <div className="success-summary">
                {loading ? (
                    <>
                        <div className="skeleton skeleton-title"></div>
                        <div className="skeleton skeleton-text"></div>
                        <div className="skeleton skeleton-text"></div>
                        <div className="skeleton skeleton-text"></div>
                    </>
                ) : (
                    <>
                        <h2>Deck Created Successfully!</h2>
                        <p>
                            <strong>Title:</strong> {title}
                        </p>
                        <p>
                            <strong>Language:</strong> {language}
                        </p>
                        <p>
                            <strong>Tags:</strong> {tags.join(", ") || "No tags"}
                        </p>
                    </>
                )}
            </div>

            {/* Action buttons */}
            <div className="success-page-action-buttons">
                <Link to="/decks">
                    <button className={classNames("btn primary", { loading })} disabled={loading}>
                        View Decks
                    </button>
                </Link>
                <Link to="/decks/new">
                    <button className={classNames("btn secondary", { loading })} disabled={loading}>
                        Create Another
                    </button>
                </Link>
                <button className={classNames("btn secondary", { loading })} disabled={loading}>
                    Add Card
                </button>
            </div>
        </div>
    );
}