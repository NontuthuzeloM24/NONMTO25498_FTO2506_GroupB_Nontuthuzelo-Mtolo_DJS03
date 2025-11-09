/**
 * @fileoverview API service for fetching podcast data
 * Handles all communication with the podcast API at https://podcast-api.netlify.app
 */

import { genres } from './data.js';

/**
 * Base URL for the podcast API
 * @constant {string}
 */
const API_BASE_URL = 'https://podcast-api.netlify.app/';

/**
 * Fetches all podcasts from the API
 * @async
 * @function fetchAllPodcasts
 * @returns {Promise<Array>} Array of podcast preview objects
 * @throws {Error} If the API request fails
 * 
 * @example
 * const podcasts = await fetchAllPodcasts();
 * console.log(podcasts);
 */
export async function fetchAllPodcasts() {
  try {
    const response = await fetch(API_BASE_URL);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching podcasts:', error);
    throw error;
  }
}

/**
 * Fetches detailed information for a specific podcast by ID
 * @async
 * @function fetchPodcastById
 * @param {string} id - Podcast ID
 * @returns {Promise<Object>} Detailed podcast object with seasons
 * @throws {Error} If the API request fails
 * 
 * @example
 * const podcast = await fetchPodcastById('10716');
 * console.log(podcast.seasons);
 */
export async function fetchPodcastById(id) {
  try {
    const response = await fetch(`${API_BASE_URL}/id/${id}`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Error fetching podcast ${id}:`, error);
    throw error;
  }
}

/**
 * Maps genre IDs to genre names using local genre data
 * @function getGenreNames
 * @param {number[]} genreIds - Array of genre ID numbers
 * @returns {string[]} Array of genre names
 * 
 * @example
 * const names = getGenreNames([1, 2, 3]);
 * // Returns: ["Personal Growth", "Investigative Journalism", "History"]
 */
export function getGenreNames(genreIds) {
  if (!genreIds || !Array.isArray(genreIds)) {
    return ['Uncategorized'];
  }
  
  const names = genreIds.map(id => {
    const genre = genres.find(g => g.id === id);
    return genre ? genre.title : 'Unknown';
  });
  
  return names.length > 0 ? names : ['Uncategorized'];
}

/**
 * Formats a date to a relative time string (e.g., "2 days ago")
 * @function formatRelativeTime
 * @param {string} dateString - ISO date string
 * @returns {string} Formatted relative time string
 * 
 * @example
 * formatRelativeTime('2024-01-15T10:30:00Z');
 * // Returns: "2 days ago"
 */
export function formatRelativeTime(dateString) {
  if (!dateString) return 'Unknown';
  
  const date = new Date(dateString);
  const now = new Date();
  const diffInSeconds = Math.floor((now - date) / 1000);
  
  const intervals = {
    year: 31536000,
    month: 2592000,
    week: 604800,
    day: 86400,
    hour: 3600,
    minute: 60
  };
  
  for (const [unit, seconds] of Object.entries(intervals)) {
    const interval = Math.floor(diffInSeconds / seconds);
    if (interval >= 1) {
      return `${interval} ${unit}${interval > 1 ? 's' : ''} ago`;
    }
  }
  
  return 'just now';
}