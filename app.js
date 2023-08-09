const express = require('express');
const exphbs  = require('express-handlebars');
const morgan = require("morgan");
const paymentRoutes = require('./routes/paymentRoutes');
const cors = require('cors');
require('dotenv').config()
const port = process.env.PORT || 3000;

const app = express();

app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');
app.use(morgan("dev"));
app.use(express.json());
app.use(cors());
app.use(express.static('assets'));
 
app.use('/assets', express.static(__dirname + '/assets'));

app.use(paymentRoutes);

app.listen(port,()=>console.log(`App corriendo en el puerto ${port}`));