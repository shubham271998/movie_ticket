const express = require('express');
const ticketController = require('./../controllers/ticketController');

const router = express.Router();

const bodyParser = require('body-parser')
var jsonParser = bodyParser.json()

router
  .route('/')
  .get(ticketController.getAllTickets)
  .post(jsonParser,ticketController.checkSeats, ticketController.createTicket);

router
  .route('/:id')
  .get(ticketController.getTicket)
  .patch(ticketController.updateTicket)
  .delete(ticketController.deleteTicket);

router
.route('/getUser/:userphonenumber')
.get(ticketController.getUser)

module.exports = router;