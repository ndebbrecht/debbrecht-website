// Pageview Tracker - Minimal, Async, Non-Blocking
// Sends a pageview event to the tracking endpoint
(function() {
  'use strict';

  // Use sendBeacon if available (most reliable), fallback to fetch
  if (navigator.sendBeacon) {
    // sendBeacon is the best approach - it queues requests even if page unloads
    const trackingUrl = '/api/pageview.php';
    navigator.sendBeacon(trackingUrl);
  } else if (typeof fetch !== 'undefined') {
    // Fallback to fetch with keepalive for similar behavior
    const trackingUrl = '/api/pageview.php';
    fetch(trackingUrl, {
      method: 'GET',
      keepalive: true,
      headers: {
        'Accept': 'application/json'
      }
    }).catch(() => {
      // Silently fail - don't impact page experience
    });
  }
})();
