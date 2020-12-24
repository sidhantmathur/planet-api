const express = require('express')
const Planet = require('../models/planet')
const customErrors = require('../../lib/custom_errors')
const handle404 = customErrors.handle404

const router = express.Router()

// SHOW
router.get('/planets/:id', (req, res, next) => {
  Planet.findById(req.params.id)
    .then(handle404)
    .then(planet => res.status(200).json({ planet: planet.toObject() }))
    .catch(next)
})

router.get('/planets-rand', (req, res, next) => {
  // const count = Planet.estimatedDocumentCount()
  // var random = Math.floor(Math.random() * count)
  var random = Math.floor(Math.random() * 4000)

  Planet.findOne()
    .skip(random)
    .then(handle404)
    .then(planet => res.status(200).json({ planet: planet.toObject() }))
    .catch(next)
})

// INDEX
// GET /planets
router.get('/planets', (req, res, next) => {
  Planet.find()
    .then(planets => {
      return planets.map(planet => planet.toObject())
    })
    .then(planets => res.status(200).json({ planets: planets }))
    .catch(next)
})

router.get('/planets-disc/:disc', (req, res, next) => {
  // console.log(req.user)
  Planet.find({'dis_year': req.params.disc})
    .then(handle404)
    .then(planets => {
      return planets.map(planet => {
        return planet.toObject()
      })
    })
    .then(planets => {
    // console.log(planets)
      res.status(200).json({ planets: planets })
    })
    .catch(next)
})

router.get('/planets-row/:row', (req, res, next) => {
  // console.log(req.user)
  Planet.find({'row': req.params.row})
    .then(handle404)
    .then(planets => {
      return planets.map(planet => {
        return planet.toObject()
      })
    })
    .then(planets => {
    // console.log(planets)
      res.status(200).json({ planets: planets })
    })
    .catch(next)
})

// not working routes

// Show Planets by Name
// router.get('/planets-name/:name', (req, res, next) => {
//   // console.log(req.user)
//   Planet.find({'name': req.params.name})
//     .then(handle404)
//     .then(planets => {
//       return planets.map(planet => {
//         return planet.toObject()
//       })
//     })
//     .then(planets => {
//     // console.log(planets)
//       res.status(200).json({ planets: planets })
//     })
//     .catch(next)
// })

// // Show Planets by Mass
// router.get('/planets-mass/:mass', (req, res, next) => {
//   // console.log(req.user)
//   Planet.find({'massE': req.params.mass})
//     .then(handle404)
//     .then(planets => {
//       return planets.map(planet => {
//         return planet.toObject()
//       })
//     })
//     .then(planets => {
//     // console.log(planets)
//       res.status(200).json({ planets: planets })
//     })
//     .catch(next)
// })

// router.get('/planets-rand/', (req, res, next) => {
//   Planet.findById()
//     .then(handle404)
//     .then(planet => res.status(200).json({ planet: planet.toObject() }))
//     .catch(next)
// })

// router.get('/planets/rand', (req, res, next) => {
//   Planet.aggregate.sample(3)()
//     .then(handle404)
//     .then(planet => res.status(200).json({ planet: planet.toObject() }))
//     .catch(next)
// })

// router.get('/planets-count', (req, res, next) => {
//   Planet.countDocuments(function (count) {
//     console.log('there are %d planets', count)
//   })
// })
module.exports = router
