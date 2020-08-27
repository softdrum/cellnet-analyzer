const mongoose = require('mongoose')

const measureData = new mongoose.Schema({
  data: Array
})
measureData.pre('save', function (next) {
  let now = Date.now()
   
  this.updatedAt = now
  // Set a value for createdAt only if it is null
  if (!this.createdAt) {
    this.createdAt = now
  }
  // Call the next function in the pre-save chain
  next()    
})
module.exports = mongoose.model('MeasureData', measureData)
