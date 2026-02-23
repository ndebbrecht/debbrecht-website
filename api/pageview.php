<?php
// Pageview Counter API Endpoint
// Minimal, non-blocking endpoint to track pageviews

header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
header('Cache-Control: no-cache, no-store, must-revalidate');

// Path to counter file
$varDir = __DIR__ . '/../var';
$counterFile = $varDir . '/pageviews.json';

// Ensure var directory exists
if (!is_dir($varDir)) {
    mkdir($varDir, 0755, true);
}

// Initialize or load counter
$data = [];
if (file_exists($counterFile)) {
    $data = json_decode(file_get_contents($counterFile), true) ?? [];
}

// Increment counter
$data['count'] = (isset($data['count']) ? $data['count'] : 0) + 1;
$data['last_visit'] = date('c');

// Save updated counter
file_put_contents($counterFile, json_encode($data, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES));

// Return success response
http_response_code(200);
echo json_encode([
    'success' => true,
    'count' => $data['count'],
    'timestamp' => $data['last_visit']
]);
?>
