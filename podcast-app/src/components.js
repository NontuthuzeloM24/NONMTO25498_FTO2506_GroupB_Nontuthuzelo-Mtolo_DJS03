/**
 * @fileoverview UI component creation functions
 * Contains functions that generate HTML elements for the podcast app
 */

import { fetchPodcastById, getGenreNames, formatRelativeTime } from './api.js';

/**
 * Creates a podcast card element for the grid
 * @function createPodcastCard
 * @param {Object} podcast - Podcast preview object
 * @param {string} podcast.id - Podcast ID
 * @param {string} podcast.title - Podcast title
 * @param {string} podcast.image - Podcast cover image URL
 * @param {number} podcast.seasons - Number of seasons
 * @param {number[]} podcast.genres - Array of genre IDs
 * @param {string} podcast.updated - Last update date
 * @returns {HTMLElement} Podcast card DOM element
 * 
 * @example
 * const card = createPodcastCard(podcastData);
 * document.querySelector('.grid').appendChild(card);
 */
export function createPodcastCard(podcast) {
  const card = document.createElement('div');
  card.className = 'podcast-card';
  card.style.cssText = `
    background: white;
    border-radius: 8px;
    padding: 1rem;
    cursor: pointer;
    transition: transform 0.2s, box-shadow 0.2s;
    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  `;
  
  // Hover effect
  card.addEventListener('mouseenter', () => {
    card.style.transform = 'translateY(-4px)';
    card.style.boxShadow = '0 4px 16px rgba(0,0,0,0.15)';
  });
  
  card.addEventListener('mouseleave', () => {
    card.style.transform = 'translateY(0)';
    card.style.boxShadow = '0 2px 8px rgba(0,0,0,0.1)';
  });
  
  // Get genre names
  const genreNames = getGenreNames(podcast.genres);
  const genreTags = genreNames.slice(0, 2).join(', ');
  
  // Create card HTML
  card.innerHTML = `
    <img 
      src="${podcast.image}" 
      alt="${podcast.title}"
      style="width: 100%; height: 200px; object-fit: cover; border-radius: 6px; margin-bottom: 0.75rem;"
    />
    <h3 style="margin: 0 0 0.5rem 0; font-size: 1rem; line-height: 1.3;">${podcast.title}</h3>
    <p style="margin: 0; color: var(--grey-text); font-size: 0.85rem;">
      ${podcast.seasons} Season${podcast.seasons !== 1 ? 's' : ''}
    </p>
    <p style="margin: 0.5rem 0 0 0; color: var(--grey-text); font-size: 0.75rem;">
      ${genreTags}
    </p>
  `;
  
  // Add click handler to open modal
  card.addEventListener('click', () => openPodcastModal(podcast.id));
  
  return card;
}

/**
 * Creates a loading spinner element
 * @function createLoadingSpinner
 * @returns {HTMLElement} Loading spinner DOM element
 */
export function createLoadingSpinner() {
  const spinner = document.createElement('div');
  spinner.style.cssText = `
    display: flex;
    justify-content: center;
    align-items: center;
    height: 60vh;
    font-size: 1.5rem;
    color: var(--grey-text);
  `;
  spinner.textContent = '⏳ Loading podcasts...';
  return spinner;
}

/**
 * Creates an error message element
 * @function createErrorMessage
 * @param {string} message - Error message to display
 * @returns {HTMLElement} Error message DOM element
 */
export function createErrorMessage(message) {
  const error = document.createElement('div');
  error.style.cssText = `
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 60vh;
    text-align: center;
    padding: 2rem;
  `;
  
  error.innerHTML = `
    <p style="font-size: 3rem; margin: 0;">⚠️</p>
    <p style="font-size: 1.2rem; color: #d32f2f; margin: 1rem 0;">${message}</p>
    <button 
      onclick="window.loadPodcasts()" 
      style="
        padding: 0.75rem 1.5rem;
        background: #007bff;
        color: white;
        border: none;
        border-radius: 6px;
        cursor: pointer;
        font-size: 1rem;
      "
    >
      🔄 Try Again
    </button>
  `;
  
  return error;
}

/**
 * Renders the podcast grid with all podcasts
 * @function renderPodcastGrid
 * @param {Array} podcasts - Array of podcast objects
 */
export function renderPodcastGrid(podcasts) {
  const grid = document.getElementById('podcastGrid');
  grid.innerHTML = '';
  
  if (!podcasts || podcasts.length === 0) {
    grid.appendChild(createErrorMessage('No podcasts found.'));
    return;
  }
  
  podcasts.forEach(podcast => {
    const card = createPodcastCard(podcast);
    grid.appendChild(card);
  });
}

/**
 * Opens the modal and displays detailed podcast information
 * @async
 * @function openPodcastModal
 * @param {string} podcastId - ID of the podcast to display
 */
export async function openPodcastModal(podcastId) {
  const modal = document.getElementById('modal');
  const modalTitle = document.getElementById('modalTitle');
  const modalImage = document.getElementById('modalImage');
  const modalDesc = document.getElementById('modalDesc');
  const modalGenres = document.getElementById('modalGenres');
  const modalUpdated = document.getElementById('modalUpdated');
  const seasonList = document.getElementById('seasonList');
  
  // Show modal with loading state
  modal.classList.remove('hidden');
  modalTitle.textContent = 'Loading...';
  seasonList.innerHTML = '<li style="list-style: none;">Loading seasons...</li>';
  
  try {
    // Fetch detailed podcast data
    const podcast = await fetchPodcastById(podcastId);
    
    // Populate modal with data
    modalTitle.textContent = podcast.title;
    modalImage.src = podcast.image;
    modalImage.alt = podcast.title;
    modalDesc.textContent = podcast.description;
    
    // Render genre tags
    const genreNames = getGenreNames(podcast.genres);
    modalGenres.innerHTML = genreNames
      .map(name => `<span class="tag">${name}</span>`)
      .join('');
    
    // Format and display last updated
    modalUpdated.textContent = `Last updated: ${formatRelativeTime(podcast.updated)}`;
    
    // Render seasons
    seasonList.innerHTML = '';
    if (podcast.seasons && podcast.seasons.length > 0) {
      podcast.seasons.forEach(season => {
        const seasonItem = document.createElement('li');
        seasonItem.className = 'season-item';
        seasonItem.innerHTML = `
          <div>
            <div class="season-title" style="font-weight: 600; margin-bottom: 0.25rem;">
              ${season.title}
            </div>
            <div class="episodes">${season.episodes.length} Episode${season.episodes.length !== 1 ? 's' : ''}</div>
          </div>
          <button 
            style="
              padding: 0.5rem 1rem;
              background: #007bff;
              color: white;
              border: none;
              border-radius: 4px;
              cursor: pointer;
              font-size: 0.85rem;
            "
            onmouseover="this.style.background='#0056b3'"
            onmouseout="this.style.background='#007bff'"
          >
            View Episodes
          </button>
        `;
        seasonList.appendChild(seasonItem);
      });
    } else {
      seasonList.innerHTML = '<li style="list-style: none; color: var(--grey-text);">No seasons available</li>';
    }
    
  } catch (error) {
    console.error('Error loading podcast details:', error);
    modalTitle.textContent = 'Error';
    seasonList.innerHTML = `
      <li style="list-style: none; color: #d32f2f;">
        Failed to load podcast details. Please try again.
      </li>
    `;
  }
}

/**
 * Closes the podcast modal
 * @function closeModal
 */
export function closeModal() {
  const modal = document.getElementById('modal');
  modal.classList.add('hidden');
}

/**
 * Sets up modal event listeners
 * @function setupModalListeners
 */
export function setupModalListeners() {
  const closeBtn = document.getElementById('closeModal');
  const modal = document.getElementById('modal');
  
  // Close button
  closeBtn.addEventListener('click', closeModal);
  
  // Click outside modal to close
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });
  
  // ESC key to close
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
      closeModal();
    }
  });
}