const express = require('express');
const app = express();

app.use(express.json());
app.use(express.static('public'));

let urlMap = {};

app.post('/shorten', (req, res) => {
    const longUrl = req.body.url;
    const shortId = Math.random().toString(36).substring(7);

    urlMap[shortId] = longUrl;

    res.json({ shortUrl: "http://localhost:3000/" + shortId });
});

app.get('/:id', (req, res) => {
    const longUrl = urlMap[req.params.id];
    if (longUrl) {
        res.redirect(longUrl);
    } else {
        res.send("URL not found");
    }
});

app.listen(3000, () => {
    console.log("Server running on port 3000");
});
