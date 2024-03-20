const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const path = require('path');
const url = require('url');
const fs = require('fs');


// Serve up the static, public files so that they can be used
app.use(express.static(path.join(__dirname, '/src/public')));


/** GET: returns an array of gallery image names */
const galleryDir = path.join(__dirname, '/src/public/img/gallery');
app.get('/api/gallery', (req, res) => {
    fs.readdir(galleryDir, (err, files) => {
        if(err){
            console.log(`Error retrieving gallery folder: ${err}`);
            return;
        }

        // remove README.txt if present
        let index = files.indexOf("README.txt");
        if(index >= 0) files.splice(index, 1);
        
        res.send(JSON.stringify(files));
    })
})


/** GET: returns an array of heading image names */
const headingImgDir = path.join(__dirname, '/src/public/img/headers');
app.get('/api/headingImg', (req, res) => {
    fs.readdir(headingImgDir, (err, files) => {
        if(err){
            console.log(`Error retrieving header images folder: ${err}`);
            return;
        }

        // remove README.txt if present
        let index = files.indexOf("README.txt");
        if(index >= 0) files.splice(index, 1);

        res.send(JSON.stringify(files));
    })
})


/** GET: returns an array of the team image names */
const teamImgDir = path.join(__dirname, '/src/public/img/team');
app.get('/api/team', (req, res) => {
    fs.readdir(teamImgDir, (err, files) => {
        if(err){
            console.log(`Error retrieving team images folder: ${err}`);
            return;
        }

        // remove README.txt if present
        let index = files.indexOf("README.txt");
        if(index >= 0) files.splice(index, 1);

        res.send(JSON.stringify(files));
    })
})


/** GET: returns latest Facebook posts? */
app.get('/api/facebook', (req, res) => {

    res.send("Hello, World!");
})

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/src/public/index.html'));
});

app.get('/order', (req, res) => {
    res.sendFile(path.join(__dirname, '/src/public/order.html'));
});

app.get('/gallery', (req, res) => {
    res.sendFile(path.join(__dirname, '/src/public/gallery.html'));
});

app.get('/enquire', (req, res) => {
    const urlParts = url.parse(req.url, true);
    const query = urlParts.query;
 
    // Extract data from the query
    const name = query.nameField;
    const email = query.emailField;
    const message = query.messageField;

    if((name != undefined) && 
       (email != undefined) && 
       (message != undefined)){

        // Process the data
        console.log('Name:', name);
        console.log('Email:', email);
        console.log('Message:', message);

        // Redirect home
        res.redirect('/');

    }

    res.sendFile(path.join(__dirname, '/src/public/enquire.html'));
});


app.listen(port, () => {
    console.log(`Listening on port ${port}...`);
});