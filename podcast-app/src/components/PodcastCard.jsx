import React from "react";
import { formatDistanceToNow } from "date-fns";
import "./PodcastCard.css";

/**
 * @component PodcastCard
 * @param {Object} podcast - Single podcast data object
 */
const PodcastCard = ({ podcast }) => {
  const { title, image, genreNames = [], updated, seasons } = podcast;

  const formattedDate = updated
    ? formatDistanceToNow(new Date(updated), { addSuffix: true })
    : "Unknown";

  return (
    <div className="podcast-card">
      <img src={image} alt={title} className="podcast-image" />
      <div className="podcast-info">
        <h2>{title}</h2>
        <p>{seasons ?? 0} {seasons === 1 ? "season" : "seasons"}</p>
        <div className="genres">
          {genreNames.length > 0
            ? genreNames.map((name, idx) => (
                <span key={idx} className="genre-tag">{name}</span>
              ))
            : <span className="genre-tag">Uncategorized</span>}
        </div>
        <small>Updated {formattedDate}</small>
      </div>
    </div>
  );
};

export default PodcastCard;