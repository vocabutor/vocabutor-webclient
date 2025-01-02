import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleInfo, faTrashAlt } from "@fortawesome/free-solid-svg-icons";

interface FlashcardProps {
  title: string;
  description: string;
  onEdit?: () => void;
  onDelete?: () => void;
}

const Flashcard: React.FC<FlashcardProps> = ({ title, description, onEdit, onDelete }) => {
  return (
    <div className="flashcard">
      <div className="flashcard-content">
        <h3 className="flashcard-title">{title}</h3>
        <p className="flashcard-description multiline-ellipsis">{description}</p>
      </div>
      <div className="flashcard-actions">
        <button className="flashcard-action-button primary" onClick={onEdit}>
          <FontAwesomeIcon icon={faCircleInfo} />
        </button>
        <button className="flashcard-action-button delete" onClick={onDelete}>
          <FontAwesomeIcon icon={faTrashAlt} />
        </button>
      </div>
    </div>
  );
};

export default Flashcard;
