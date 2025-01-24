import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleInfo, faTrashAlt } from "@fortawesome/free-solid-svg-icons";

interface FlashcardProps {
  title: string;
  description: string;
  onDetails?: () => void;
  onDelete?: () => void;
}

const Flashcard: React.FC<FlashcardProps> = ({ title, description, onDetails, onDelete }) => {
  return (
    <div className="flashcard">
      <div className="flashcard-content">
        <h3 className="flashcard-title">{title}</h3>
        <p className="flashcard-description multiline-ellipsis">{description}</p>
      </div>
      <div className="flashcard-actions">
        {onDetails && (
            <button className="flashcard-action-button primary" onClick={onDetails}>
                <FontAwesomeIcon icon={faCircleInfo} />
            </button>
        )}
        {onDelete && (
            <button className="flashcard-action-button delete" onClick={onDelete}>
                <FontAwesomeIcon icon={faTrashAlt} />
            </button>
        )}
      </div>
    </div>
  );
};

export default Flashcard;
