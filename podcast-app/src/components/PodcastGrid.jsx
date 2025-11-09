import React from "react";
import PodcastCard from "./PodcastCard";
import "./PodcastGrid.css";

/**
 * @component PodcastGrid
 * @param {Object[]} podcasts - Array of podcast data objects
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
