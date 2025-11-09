import React from "react";
import PodcastCard from "./PodcastCard";
import "./PodcastGrid.css";

/**
 * @component PodcastGrid
 * @description Displays a grid of podcast cards.
 * @param {Array} podcasts - Array of podcast objects
 */
const PodcastGrid = ({ podcasts }) => {
  return (
    <div className="podcast-grid">
      {podcasts.map((podcast) => (
        <PodcastCard key={podcast.id} podcast={podcast} />
      ))}
    </div>
  );
};

export default PodcastGrid;
