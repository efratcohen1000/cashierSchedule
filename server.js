const express = require('express');
const app = express();
const expressValidator = require('express-validator');
const PORT = 3000;
app.listen(PORT, function(req, res){
    console.log('Server is running on PORT: ',PORT);
});

const hbs = require('express-hbs');
const path = require('path');

app.use(express.static('public'));

app.engine('hbs', hbs.express4({
    partialsDir: __dirname + '/views/partials'
}));
app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');


app.use(bodyParser.urlencoded({ extended: false }));
app.use(expressValidator());
app.use(cookieParser());
app.use(session({secret: 'krunal', saveUninitialized: false, resave: false}));
const blockchain = require('./routes/blockchain.route');

app.use('/blockchain',blockchain);