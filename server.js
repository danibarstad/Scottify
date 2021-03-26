require('dotenv').config();

const express = require('express');
const app = express();
const path = require('path');
const port = 3000;

app.use(express.static('public'));

app.get('/', (req, res) => {
    res.setHeader('Content-Type', 'text/html');
    res.sendFile(path.join(__dirname, 'public/index.html'));
});

app.listen(port, () => {
    console.log(`Listening at port ${port}`);
})


/* 
THIS IS THE BEGINNING OF IMPLEMENTING A DIFFERENT AUTHORIZATION FLOW
*/
// app.get('/login', (req, res) => {
//     let redirect_uri = 'http://127.0.0.1:3000/';
//     let scopes = 'user-read-private playlist-read-private';
//     res.redirect('https://accounts.spotify.com/authorize' +
//         '?response_type=code' +
//         '&client_id=' + process.env.CLIENT_ID +
//         (scopes ? '&scope=' + encodeURIComponent(scopes) : '') +
//         '&redirect_uri=' + encodeURIComponent(redirect_uri));
// });