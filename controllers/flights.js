import { Flight } from "../models/flight.js"

function newFlight(req,res){
  res.render('flights/new', {
    title: 'Add Flight'
  })
}

function create(req,res){
  console.log("form data:", req.body)
  Flight.create(req.body)
  .then(flight =>{
    res.redirect('/flights/new')
  })
  .catch(err => {
    console.log(err)
    res.redirect('/flights/new')
    })
}

function index(req,res){
  console.log('this works')

}

export{
  newFlight as new,
  create,
  index,
}