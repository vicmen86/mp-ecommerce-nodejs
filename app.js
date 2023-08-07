const express = require('express');
const exphbs  = require('express-handlebars');
const morgan = require("morgan");
const PaymentControllers = require('./controllers/PaymentControllers');
const PaymentServices = require('./services/PaymentServices');
require('dotenv').config()
const port = process.env.PORT || 3000;

const app = express();

app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');
app.use(morgan("dev"));

app.use(express.static('assets'));
 
app.use('/assets', express.static(__dirname + '/assets'));

app.get('/', function (req, res) {
    res.render('home');
});

app.get('/detail', function (req, res) {
    res.render('detail', req.query);
});
//
app.get("/success", (req, res) => {
    res.render("success", req.query);
  });
  
app.get("/error", (req, res) => {
    res.render("error");
  });
  
app.get("/pending", (req, res) => {
    res.render("pending");
  });
  
app.listen(port,()=>console.log(`App corriendo en el puerto ${port}`));