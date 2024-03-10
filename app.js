const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

const path = require('path');
const fs = require('fs');

const galleryDir = path.join(__dirname, 'src/gallery');

app.get('/api/gallery', (req, res) => {
    fs.readdir(galleryDir, (err, files) => {
        if(err){
            console.log(`Error retrieving gallery folder: ${err}`);
            return;
        }
        res.send(JSON.stringify(files));
    })
})

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'test.html'));
});

app.listen(port, () => {
    console.log(`Listening on port ${port}...`);
});