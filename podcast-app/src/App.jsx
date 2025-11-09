import React, { useEffect, useState, useCallback } from "react";
import PodcastGrid from "./components/PodcastGrid";
import Loading from "./components/Loading";
import ErrorMessage from "./components/ErrorMessage";
import { genres } from "./data";
import "./App.css";

/**
 * @component App
 * @description Root component that fetches and manages podcast data.
 */
function App() {
  const [podcasts, setPodcasts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  /**
   * Fetch podcast data from API and map genre IDs to names.
   * @function fetchPodcasts
   */
  const fetchPodcasts = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("https://podcast-api.netlify.app/");
      if (!response.ok) throw new Error("Failed to fetch podcast data");
      const data = await response.json();

      const podcastsWithGenres = data.map((podcast) => {
        const genreNames = podcast.genre_ids?.map((id) => {
          const found = genres.find((g) => g.id === id);
          return found ? found.title : "Unknown";
        }) || [];
        return { ...podcast, genreNames };
      });

      setPodcasts(podcastsWithGenres);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPodcasts();
  }, [fetchPodcasts]);

  if (loading) return <Loading />;

  if (error)
    return <ErrorMessage message={error} onRetry={fetchPodcasts} />;

  if (podcasts.length === 0)
    return <ErrorMessage message="No podcasts found." onRetry={fetchPodcasts} />;

  return (
    <div className="App">
      <header className="app-header">
        <h1>🎧 Podcast Discovery</h1>
      </header>
      <PodcastGrid podcasts={podcasts} />
    </div>
  );
}

export default App;