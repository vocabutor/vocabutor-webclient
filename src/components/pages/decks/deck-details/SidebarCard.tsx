import { useState } from 'react';
import { authCookie } from '../../../../helpers/Cookies';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

interface SidebarCardProps {
    cardId: string;
    phrase: string;
    deckId: string;
}

export default function SidebarCard({ cardId, phrase, deckId }: SidebarCardProps) {

    const [selected, setSelected] = useState<boolean>(false);

    const [saving, setSaving] = useState<boolean>(false);

    const handleSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.checked) {
            setSaving(true);
            try {
                const token = authCookie();
                const response = await fetch(`/api/v1/decks/${deckId}/cards/${cardId}`, {
                    method: 'PUT',
                    headers: {
                        "Authorization": 'Bearer ' + token,
                        "Content-Type": "application/json",
                    },
                });
                if (!response.ok) {
                    throw new Error(`Error: ${response.statusText}`);
                }
                setSelected(true);
            } finally {
                setSaving(false);
            }
        }
    };

    return (
        <div className="sliding-window-card">
            <div className="sidebar-list-item-checkbox">
                {selected ? (
                    <span className="icon-with-transition">
                        <FontAwesomeIcon icon={faCheck} className="green-tick-icon" />
                    </span>
                ) : (
                    <input
                        type="checkbox"
                        onChange={handleSelect}
                        disabled={saving}
                        className="checkbox-input"
                    />
                )}
            </div>
            <div className="sidebar-list-item-title">
                {phrase}
            </div>
        </div>
    );
}