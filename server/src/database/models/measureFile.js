const mongoose = require('mongoose')
const { ObjectId } = require('mongodb')

const measureFile = new mongoose.Schema({
  name: String,
  dataId: ObjectId,
  dataType: String,
  createdAt: Date,
  updatedAt: Date
})
measureFile.pre('save', function (next) {
  let now = Date.now()
   
  this.updatedAt = now
  // Set a value for createdAt only if it is null
  if (!this.createdAt) {
    this.createdAt = now
  }
  // Call the next function in the pre-save chain
  next()    
})
module.exports = mongoose.model('MeasureFile', measureFile)
