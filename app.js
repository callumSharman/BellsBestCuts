const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

//const path = require('path');


const url = require('url');


app.get('/', (req, res) => {
    res.send("Hello, world!");
})

// // Serve static files from the 'public' folder
// app.use(express.static(path.join(__dirname, 'public')));

// // Handle all other requests by sending the HTML file
// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, 'public', 'index.html'));
// });

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});