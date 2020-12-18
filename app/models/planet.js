const mongoose = require('mongoose')

const planetSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  orbit: {
    type: Number
  },
  orbitPeriod: {
    type: Number
  },
  starBrightness: {
    type: Number
  },
  starTemp: {
    type: Number
  },
  temp: {
    type: Number
  },
  radiusE: {
    type: Number
  },
  massE: {
    type: Number
  },
  density: {
    type: Number
  },
  discovered: {
    type: Number
  }
}, {
  timestamps: true
})

module.exports = mongoose.model('Planet', planetSchema)
