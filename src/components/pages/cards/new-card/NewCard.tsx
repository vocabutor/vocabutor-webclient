import { useState } from "react";
import classNames from "classnames";
import { authCookie } from '../../../../helpers/Cookies';
import { useNavigate } from 'react-router-dom';
import { CardDto } from "../../../../helpers/CommonEntities";

export default function NewCard() {

    const navigate = useNavigate();
    
    const [phrase, setPhrase] = useState<string>("");
    const [answer, setAnswer] = useState<string>("");
    
    const [loading, setLoading] = useState<boolean>(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);

        const formData = {
            phrase: phrase,
            answer: answer,
            languageId: 1, //TODO read from state and add tags other fields
        };

        const token = authCookie();
        if (token == null) {
            throw new Error("no auth token")
        }

        try {
            const response = await fetch('/api/v1/cards', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                throw new Error(`Failed to submit: ${response.statusText}`);
            }

            const result: CardDto = await response.json();
            
            navigate('/cards');
        } catch (error) {
            console.error('Error submitting form:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={classNames("form-container", { loading })}>
            <form onSubmit={handleSubmit}>
                <h2>Create a New Card</h2>

                <label htmlFor="phrase">Phrase</label>
                <input
                    id="phrase"
                    type="text"
                    value={phrase}
                    onChange={(e) => setPhrase(e.target.value)}
                    required
                    disabled={loading}
                />
                
                <label htmlFor="answer">Answer</label>
                <input
                    id="answer"
                    type="text"
                    value={answer}
                    onChange={(e) => setAnswer(e.target.value)}
                    required
                    disabled={loading}
                />

                <button type="submit" className="submit-button" disabled={loading}>
                    {loading ? "Submitting..." : "Create Card"}
                </button>
            </form>
        </div>
    );

}