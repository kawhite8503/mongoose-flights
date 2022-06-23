import methodOverride from "method-override"
import { Flight } from "../models/flight.js"

// function sortFlights(req,res){
//   flight.departs.forEach(flight => {
//     if(flight.departs)
//   })

// }

function newFlight(req,res){
  const newFlight = new Flight()
  const defaultDepart = newFlight.departs
  const formattedDepart = defaultDepart.toISOString().slice(0,16)
  res.render('flights/new', {
    title: 'Add Flight',
    departs: formattedDepart
  })
  .catch(err => {
    console.log(err)
    res.redirect('/flights')
  })
}

function create(req,res){
  console.log("REQ.BODY:", req.body)
  for (let key in req.body){
    if(req.body[key] === '') delete req.body[key]
  }
  Flight.create(req.body)
  .then(flight =>{
    res.redirect('/flights')
  })
  .catch(err => {
    console.log(err)
    res.redirect('/flights')
    })
}

function index(req,res){
  Flight.find({})
  .then(flights => {
    flights.forEach(flight => {
      if(flight.departs?.toISOString() < new Date()?.toISOString()){
      flight.color = 'red'
    }
  })
  res.render('flights/index', {
  flights: flights,
  title: 'All Flights'
  })
})
  .catch(err => {
    console.log(err)
    res.redirect('/')
    })
}

function show(req,res){
  Flight.findById(req.params.id)
  .then(flight => {
    res.render('flights/show', {
      title: 'Flight Detail',
      flight: flight,
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect('/')
    })
}

function deleteFlight(req,res) {
  Flight.findByIdAndDelete(req.params.id)
  .then(() =>{
    res.redirect('/flights')
  })
  .catch(err => {
    console.log(err)
    res.redirect('/')
    })
}

function deleteTicket(req,res) {
  Flight.findById(req.params.flightId) 
  .then(flight => {
    flight.tickets.remove(req.params.ticketId)
    flight.save()
    .then(() => {
      res.redirect(`/flights/${flight._id}`)
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect('/')
    })
}

function edit(req,res) {
  Flight.findById(req.params.id)
  .then(flight => {
    res.render('flights/edit', {
      flight: flight,
      title: 'Edit Flight'
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect('/flights')
    })
}

function update(req,res) {
  Flight.findByIdAndUpdate(req.params.id, req.body, {new: true})
  .then(flight => {
    res.redirect(`/flights/${flight._id}`)
  })
  .catch(err => {
    console.log(err)
    res.redirect('/')
    })
}

function createTicket(req,res) {
  Flight.findById(req.params.id)
  .then(flight => {
    flight.tickets.push(req.body)
    flight.save()
      .then(() => {
      res.redirect(`/flights/${flight._id}`)
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect('/')
    })
}

export{
  newFlight as new,
  create,
  index,
  show,
  deleteFlight as delete,
  edit,
  update,
  createTicket,
  deleteTicket,
}