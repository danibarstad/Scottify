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