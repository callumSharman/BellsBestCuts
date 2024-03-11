const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const path = require('path');
const fs = require('fs');


// Serve up the static, public files so that they can be used
app.use(express.static(path.join(__dirname, '/src/public')));


/** GET: returns an array of image names */
const galleryDir = path.join(__dirname, '/src/public/img/gallery');
app.get('/api/gallery', (req, res) => {
    fs.readdir(galleryDir, (err, files) => {
        if(err){
            console.log(`Error retrieving gallery folder: ${err}`);
            return;
        }
        res.send(JSON.stringify(files));
    })
})


/** GET: returns an array of image names */
const headingImgDir = path.join(__dirname, '/src/public/img/headers');
app.get('/api/headingImg', (req, res) => {
    fs.readdir(headingImgDir, (err, files) => {
        if(err){
            console.log(`Error retrieving header images folder: ${err}`);
            return;
        }
        res.send(JSON.stringify(files));
    })
})


app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});


app.listen(port, () => {
    console.log(`Listening on port ${port}...`);
});