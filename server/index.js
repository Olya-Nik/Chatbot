let express = require('express')
let morgan = require('morgan')
let fetch = require('node-fetch')
let app = express()
const path = require('path');
const port = 3001;
const indexRouter = require('./indexrouter');
app.use(morgan('dev'))


app.use(express.static(path.join(__dirname, 'public')));

app.use(express.static(__dirname + '/www'));
const corsMiddleware = (req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.header(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept'
    );
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS');
    next();
  };
app.use(corsMiddleware);
app.use('/', indexRouter);
app.listen(port, function () {
    console.log(`Example app listening on port ${port}!`)
});