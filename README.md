# DJS03: React Podcast Landing Page

## Overview

This project is a podcast discovery landing page built with vanilla JavaScript. The app fetches podcast data from an external API and dynamically renders a responsive grid of podcast previews. The focus is on data fetching, DOM manipulation, component structure, and layout styling.

# Core Objectives

Fetch podcast data from the API: https://podcast-api.netlify.app/
 on initial page load.

Display a loading spinner while data is being fetched, and handle errors or empty results with clear user messages.

Render a responsive grid layout of podcast previews using modular, reusable JavaScript functions/components.

# Each podcast card displays:

Podcast image

Podcast title

Number of seasons

Associated genre names

Formatted last updated date (e.g., "2 days ago")

Apply clean, consistent layout and styling across different screen sizes using CSS Grid or Flexbox.

Maintain high-quality, readable code with JSDoc comments for all key functions.

# Technical Requirements

Use vanilla JavaScript and ES6 modules

Use the Fetch API for asynchronous requests

Use DOM manipulation to dynamically render content

Dynamically render podcast cards using reusable functions

Format dates with a custom formatter (formatRelativeTime)

Map genre IDs to names using local data (data.js)

# Responsiveness Requirements

Must display correctly on:

Desktop (≥1200px)

Tablet (~768px)

Mobile (~375px)

Use CSS Grid or Flexbox

Media queries or frameworks like Tailwind CSS are allowed

# Deliverables

Functional JavaScript Application

Fetches podcast data from the API on initial load

Renders a grid of podcast previews using reusable JS functions

Loading, Error, and Empty States

Shows a loading spinner while fetching

Displays meaningful messages if fetching fails or returns no results

Podcast Preview Card Component

# Shows:

Podcast image

Podcast title

Number of seasons

Genre tags

Last updated date (e.g., "3 days ago")

# Responsive Layout

Adapts to mobile, tablet, and desktop screens using responsive design principles

# Codebase

Clean, modular code with clearly separated functions and modules

Key functions documented with JSDoc

Consistent formatting across JavaScript, HTML, and CSS files
