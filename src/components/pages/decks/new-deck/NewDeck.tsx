import { useState } from "react";
import classNames from "classnames";
import { authCookie } from '../../../../helpers/Cookies';
import { useNavigate } from 'react-router-dom';
import { DeckDto } from "../../../../helpers/CommonEntities";

export default function NewDeck() {

    const navigate = useNavigate();

    const [title, setTitle] = useState<string>("");
    const [tags, setTags] = useState<string[]>([]);
    const [language, setLanguage] = useState<string>("");
    const [tagInput, setTagInput] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);

    const handleAddTag = () => {
        if (tagInput.trim() && !tags.includes(tagInput)) {
            setTags([...tags, tagInput.trim()]);
            setTagInput("");
        }
    };

    const handleRemoveTag = (tagToRemove: string) => {
        setTags(tags.filter((tag) => tag !== tagToRemove));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);

        const formData = {
            title: title,
            languageId: 1, //TODO read from state and add tags other fields
            answerLanguageId: null, //TODO ,make selectable after data entry
        };

        const token = authCookie();
        if (token == null) {
            throw new Error("no auth token")
        }

        try {
            const response = await fetch('/api/v1/decks', {
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

            const result: DeckDto = await response.json();
            console.log('Deck created successfully:', result);
            
            navigate('/decks/created?deckId=' + result.id)
        } catch (error) {
            console.error('Error submitting form:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={classNames("form-container", { loading })}>
            <form onSubmit={handleSubmit}>
                <h2>Create a New Deck</h2>

                <label htmlFor="title">Title</label>
                <input
                    id="title"
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                    disabled={loading}
                />

                <label htmlFor="tags">Tags</label>
                <div className="tags-input">
                    <input
                        id="tags"
                        type="text"
                        value={tagInput}
                        onChange={(e) => setTagInput(e.target.value)}
                        placeholder="Add a tag and press Enter"
                        onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), handleAddTag())}
                        disabled={loading}
                    />
                    <div className="tags-list">
                        {tags.map((tag) => (
                            <span className="tag" key={tag}>
                                {tag}
                                <button
                                    type="button"
                                    onClick={() => handleRemoveTag(tag)}
                                    disabled={loading}
                                >
                                    &times;
                                </button>
                            </span>
                        ))}
                    </div>
                </div>

                <label htmlFor="language">Language</label>
                <select
                    id="language"
                    value={language}
                    onChange={(e) => setLanguage(e.target.value)}
                    disabled={loading}
                >
                    <option value="">Select a language</option>
                    <option value="english">English</option>
                    <option value="spanish">Spanish</option>
                    <option value="french">French</option>
                    <option value="">Other</option>
                </select>

                <button type="submit" className="submit-button" disabled={loading}>
                    {loading ? "Submitting..." : "Create Deck"}
                </button>
            </form>
        </div>
    );
}