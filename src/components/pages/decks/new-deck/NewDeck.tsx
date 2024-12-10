import { useState } from "react";

export default function NewDeck() {
    const [title, setTitle] = useState<string>("");
    const [tags, setTags] = useState<string[]>([]);
    const [language, setLanguage] = useState<string>("");
    const [tagInput, setTagInput] = useState<string>("");

    const handleAddTag = () => {
        if (tagInput.trim() && !tags.includes(tagInput)) {
            setTags([...tags, tagInput.trim()]);
            setTagInput("");
        }
    };

    const handleRemoveTag = (tagToRemove: string) => {
        setTags(tags.filter((tag) => tag !== tagToRemove));
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = { title, tags, language };
        console.log("Form Data:", formData);
    };

    return (
        <div className="form-container">
            <form onSubmit={handleSubmit}>
                <h2>Create a New Deck</h2>

                <label htmlFor="title">Title</label>
                <input
                    id="title"
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
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
                    />
                    <div className="tags-list">
                        {tags.map((tag) => (
                            <span className="tag" key={tag}>
                                {tag}
                                <button type="button" onClick={() => handleRemoveTag(tag)}>
                                    &times;
                                </button>
                            </span>
                        ))}
                    </div>
                </div>

                <label htmlFor="language">Answer Language</label>
                <select
                    id="language"
                    value={language}
                    onChange={(e) => setLanguage(e.target.value)}
                >
                    <option value="">Select a language</option>
                    <option value="english">English</option>
                    <option value="spanish">Spanish</option>
                    <option value="french">French</option>
                    <option value="">Other</option>
                </select>

                <button type="submit" className="submit-button">
                    Create Deck
                </button>
            </form>
        </div>
    );
}