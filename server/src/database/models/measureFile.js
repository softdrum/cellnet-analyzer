const mongoose = require('mongoose')
/**
 * This model stores measure session as files
 * Every file has name, datatype and id of document in
 * measureData model that stores all session measurements as an Array
 */
const measureFile = new mongoose.Schema({
  name: String,
  dataId: mongoose.ObjectId,
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
