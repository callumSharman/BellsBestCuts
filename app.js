const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

const path = require('path');
const fs = require('fs');

// Serve static files from the 'public' folder
app.use(express.static(path.join(__dirname, 'src', 'public')));

// Handle all other requests by sending the HTML file
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'src', 'public', 'index.html'));
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});