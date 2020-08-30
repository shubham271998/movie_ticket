const mongoose = require('mongoose');
const slugify = require('slugify');

const ticketSchema = new mongoose.Schema(
  {
    moviename: {
      type: String,
      required: [true, 'which movie you want to see'],
      unique:false
    },
    username: {
      type: String,
      required: [true, 'please tell your name'],
      unique:false
    },
    userphonenumber:{
      type:Number,
      required:[true,'please provide contact number'],
      unique:true
    },
    StartTiming:{
      type: Date,
      default: Date.now,
      unique:false
    },
    endtiming:{
      type:Date,
      default:Date.now,
      expires:60
    },
    count_dict:{
      type:Number,
    }
  }
);
ticketSchema.index({createdAt: 1},{expireAfterSeconds: 8*60*60*1000});
const Ticket = mongoose.model('Ticket', ticketSchema);

module.exports = Ticket;