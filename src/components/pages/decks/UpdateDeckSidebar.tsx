import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from '@fortawesome/free-solid-svg-icons'
import { useState } from "react";
import { authCookie } from "../../../helpers/Cookies";
import { DeckDto } from "../../../helpers/CommonEntities";

interface UpdateDeckSidebarProps {
    isOpen: boolean;
    onClose: (updated: boolean) => void;
    deck: DeckDto | null;
}

export default function UpdateDeckSidebar({ isOpen, onClose, deck }: UpdateDeckSidebarProps) {

    const [title, setTitle] = useState<string>("");
    const [submitting, setSubmitting] = useState<boolean>(false);
    
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (deck == null) {
            return;
        }
        setSubmitting(true);

        const formData = {
            title: title,
        };

        const token = authCookie();
        if (token == null) {
            throw new Error("no auth token")
        }

        try {
            const response = await fetch(`/api/v1/decks/${deck.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                throw new Error(`Failed to submit: ${response.statusText}`);
            }
            await response.json();
            onClose(true);
        } catch (error) {
            console.error('Error submitting form:', error);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <>
            {isOpen && <div className="overlay" onClick={() => onClose(false)}></div>}
            <div className={`sliding-window ${isOpen ? "open" : ""}`}>
                <div className="sliding-window-content">
                    <div className="sliding-window-header">
                        <h2>Update Deck</h2>
                        <button onClick={() => onClose(false)} className="sliding-window-close-button">
                            <FontAwesomeIcon icon={faClose}></FontAwesomeIcon>
                        </button>
                    </div>
                    <div className="form-container">
                        <form onSubmit={handleSubmit}>
                            <label htmlFor="title">Title</label>
                            <input
                                id="title"
                                type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                required
                                disabled={submitting}
                            />

                            <button type="submit" className="submit-button" disabled={submitting}>
                                {submitting ? "Submitting..." : "Update Deck"}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}