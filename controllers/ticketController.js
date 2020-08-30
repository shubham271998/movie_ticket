const Ticket = require('./../models/ticketModel');
const catchAsync = require('./../catchAsync');

var count_dict = {}
exports.getAllTickets = catchAsync(async (req, res, next) => {
  const tickets = await Ticket.find({ StartTiming : req.body.StartTiming})

  res.status(200).json({
    status: 'success',
    results: tickets.length,
    data: {
      tickets
    }
  });
});

exports.getUser = catchAsync(async (req, res, next) => {
  const ticket = await Ticket.findOne(req.params.id,{username:1,userphonenumber:1});


  if(!ticket){
    return "wrong id has given"
  }

  res.status(200).json({
    status: 'success',
    data: {
      ticket
    }
  });
});

exports.getTicket = catchAsync(async (req, res, next) => {
  const ticket = await Ticket.findById(req.params.id);


  if(!ticket){
    return "wrong id has given"
  }

  res.status(200).json({
    status: 'success',
    data: {
      ticket
    }
  });
});

exports.createTicket = catchAsync(async (req, res, next) => {
  const newTicket = await Ticket.create(req.body);
  res.status(201).json({
    status: 'success',
    data: {
      ticket: newTicket
    }
  });
});

exports.checkSeats = catchAsync(async (req, res, next) => {
  const newTicket = await Ticket.create(req.body);
  if (newTicket.StartTiming in count_dict){
    count_dict[newTicket.StartTiming] += 1
    console.log(count_dict)
    if (count_dict[newTicket.StartTiming] > 20){
      return "seat full"
    }
  }
  else{
    count_dict[newTicket.StartTiming] = 1
    console.log(count_dict)
  }
  res.status(201).json({
    status: 'success',
    data: {
      ticket: newTicket
    }
  });
});

exports.updateTicket = catchAsync(async (req,res,next)=>{
  const newtime = await Ticket.findOneAndUpdate(req.params.userphonenumber,req.body,{
    new: true,
    runValidators: true
  })
  if (!newtime) {
    return "no person with that timing and that phonenumber"
  }

  res.status(200).json({
    status: 'success',
    data: {
      data: newtime
    }
  });
});

exports.deleteTicket = catchAsync(async(req,res,next)=>{
  const deleted = await Ticket.findOneAndDelete(req.param.id)

  res.status(204).json({
    status:'success',
    data:null
  })
})


