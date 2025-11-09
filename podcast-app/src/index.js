/**
 * @fileoverview Main application entry point
 * Initializes the podcast app and handles the main application flow
 */

// Import functions from other modules
import { fetchAllPodcasts, fetchPodcastById, getGenreNames, formatRelativeTime } from './api.js';
import { 
  createPodcastCard, 
  createLoadingSpinner, 
  createErrorMessage, 
  renderPodcastGrid, 
  openPodcastModal, 
  closeModal, 
  setupModalListeners 
} from './components.js';

/**
 * Stores all fetched podcasts
 * @type {Array}
 */
let allPodcasts = [];

/**
 * Loads all podcasts from the API and renders them
 * @async
 * @function loadPodcasts
 */
async function loadPodcasts() {
  const grid = document.getElementById('podcastGrid');
  
  try {
    // Show loading spinner
    grid.innerHTML = '';
    grid.appendChild(createLoadingSpinner());
    
    // Fetch podcasts from API
    allPodcasts = await fetchAllPodcasts();
    
    // Log success
    console.log(`✅ Successfully loaded ${allPodcasts.length} podcasts`);
    
    // Render podcast grid
    renderPodcastGrid(allPodcasts);
    
  } catch (error) {
    // Show error message
    console.error('❌ Failed to load podcasts:', error);
    grid.innerHTML = '';
    grid.appendChild(createErrorMessage(`Failed to load podcasts: ${error.message}`));
  }
}

/**
 * Initializes the application
 * Sets up event listeners and loads initial data
 * @function initApp
 */
function initApp() {
  console.log('🎙️ Initializing Podcast App...');
  
  // Setup modal listeners
  setupModalListeners();
  
  // Load podcasts
  loadPodcasts();
  
  console.log('✅ App initialized');
}

/**
 * Start the app when DOM is ready
 */
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initApp);
} else {
  initApp();
}

// Expose loadPodcasts to global scope for retry button
window.loadPodcasts = loadPodcasts;