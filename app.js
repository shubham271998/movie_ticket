const express = require('express');
const app = express();

const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }));

const ticketRouter = require("./routes/ticketRoutes")

app.use(bodyParser.json());
app.use('/api/v1/tickets',ticketRouter)

module.exports = app