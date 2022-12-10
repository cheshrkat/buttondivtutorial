const express = require('express');
const path = require('path');
const app = express();
const port = 3000;
const sourceDir = process.env.BUTTONDIV_SOURCE_DIR || 'source';

/**
 * Stricly speaking we don't need a server, but it is a bit easier to make the tests work this way.
 */
app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, `/${sourceDir}/index.html`));
});
app.get('/index.css', function (req, res) {
    res.sendFile(path.join(__dirname, `/${sourceDir}/index.css`));
});
app.get('/index.js', function (req, res) {
    res.sendFile(path.join(__dirname, `/${sourceDir}/index.js`));
});

app.listen(port, () => {
    console.log(`App is now listening at http://localhost:${port} (ctrl+c to quit)`);
})
