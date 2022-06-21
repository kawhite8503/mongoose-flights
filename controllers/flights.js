import { Flight } from "../models/flight.js"

function newFlight(req,res){
  res.render('flights/new', {
    title: 'Add Flight'
  })
  // if(req.body.departs === ''){
  //   req.body.departs = new Date().getFullYear() + 1
 //ABOVE IS NOT WORKING
  // }
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
    res.render('flights/index', {
    flights: flights,
    title: 'All Flights'
  })
})
  .catch(err => {
    console.log(err)
    res.redirect('/flights/new')
    })

}

export{
  newFlight as new,
  create,
  index,
}