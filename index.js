const express = require('express');
const config = require('./config/index');
const app = express();
const path = require('path');
const morgan = require('morgan');

//Setting

app.set('views', path.join(__dirname, 'src/views'));
app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: false }));

//Route
app.use(require('./src/routes/index'));

//Static routes
app.use(express.static(path.join(__dirname, 'src/public/')));

// 404 HANDLER
app.use((req, res, next) => {
    res.status(404).send('404 Not Found');
})



app.listen(config.api.port, () => {
    console.log('APP in port ', 'http://' + config.api.host + ':' +
        config.api.port);
});