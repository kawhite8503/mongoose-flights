import mongoose from 'mongoose'

const Schema = mongoose.Schema


const mealSchema = new Schema({
  meal: {
    type: String,
    unique: true
  }
  },{
    timestamps: true
})


const Meal = mongoose.model('Meal', mealSchema)



export {
  Meal
}