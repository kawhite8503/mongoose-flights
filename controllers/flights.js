import { Flight } from "../models/flight.js"

function newFlight(req,res){
  res.render('flights/new', {
    title: 'Add Flight'
  })
}

function create(req,res){
  console.log('it works')
  console.log("form data:", req.body)
}

export{
  newFlight as new,
  create,
}