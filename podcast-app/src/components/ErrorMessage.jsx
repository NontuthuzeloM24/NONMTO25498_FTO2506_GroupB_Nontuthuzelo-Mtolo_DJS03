import React from "react";
import "./ErrorMessage.css";

/**
 * @component ErrorMessage
 * @description Displays an error or empty-state message with optional retry button.
 * @param {string} message - Error or empty state message.
 * @param {Function} onRetry - Optional callback to retry the action.
 */
const ErrorMessage = ({ message, onRetry }) => (
  <div className="error-container">
    <p className="error">{message}</p>
    {onRetry && (
      <button className="retry-button" onClick={onRetry}>
        Retry
      </button>
    )}
  </div>
);

export default ErrorMessage;