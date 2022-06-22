import mongoose from 'mongoose'

const Schema = mongoose.Schema

const flightSchema = new Schema({
  airline: { 
    type: String,
    enum: ["American", "Southwest", "United"]
  },
  airport: { type: String, 
    enum: ["DEN", "AUS", "DFW", "LAX", "SAN"]
  },
  flightNo: { 
    type: Number,
    min: 10,
    max: 9999
  },
  departs: { 
    type: Date, 
    default: function(){
    const today = new Date()
    const oneYear = today.getFullYear() + 1
    today.setFullYear(oneYear)
    return today
    },
  }
}, {
  timestamps: true,
})

const Flight = mongoose.model('Flight', flightSchema)

export {
  Flight
}