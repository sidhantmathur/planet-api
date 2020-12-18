const planetJSON = require('./planetData.json')
// const planet = require('../models/planet')
// const db = require('../../config/db')

let planetData = planetJSON.map(data => {
  let x = {
    name: data.name,
    orbit: data.orbit,
    orbitPeriod: data.orbit_period,
    starBrightness: data.star_brightness,
    starTemp: data.star_temp,
    temp: data.temp,
    radiusE: data.radius_e,
    massE: data.mass_e,
    density: data.density,
    discovered: data.discovered
  }
  return x
})

console.log(planetData)

// db.planets.insert(planetData)
