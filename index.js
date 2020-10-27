const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const {search} = require('./src/modules/search/controller');
const PORT = process.env.PORT || 3000;
const app = express();

// Parse application/json
app.use(bodyParser.json({ limit: '50mb' }));
// Parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'src/public')));

app.get('/', (req, res) => res.render('index'))
app.get('/search', search)

app.listen(PORT, () => {
    console.log(
      `App is up & running on port ${PORT}`
    );
});