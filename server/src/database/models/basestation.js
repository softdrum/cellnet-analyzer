const mongoose = require('mongoose')
const {Schema} = require('mongoose')
const basestationSchema = new mongoose.Schema({
  type: String,
  geometry: Schema.Types.Mixed,
  properties: Schema.Types.Mixed,
})
basestationSchema.pre('save', function (next) {
  let now = Date.now()
  this.properties.updatedAt = now
  // Set a value for createdAt only if it is null
  if (!this.properties.createdAt) {
    this.properties.createdAt = now
  }
  // Call the next function in the pre-save chain
  next()    
})
module.exports = mongoose.model('Basestation', basestationSchema)
