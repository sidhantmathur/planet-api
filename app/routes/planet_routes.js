// Express docs: http://expressjs.com/en/api.html
const express = require('express')
// Passport docs: http://www.passportjs.org/docs/
const passport = require('passport')

// pull in Mongoose model for planets
const Planet = require('../models/planet')

// this is a collection of methods that help us detect situations when we need
// to throw a custom error
const customErrors = require('../../lib/custom_errors')

// we'll use this function to send 404 when non-existant document is requested
const handle404 = customErrors.handle404
// we'll use this function to send 401 when a user tries to modify a resource
// that's owned by someone else
const requireOwnership = customErrors.requireOwnership

// this is middleware that will remove blank fields from `req.body`, e.g.
// { planet: { title: '', text: 'foo' } } -> { planet: { text: 'foo' } }
const removeBlanks = require('../../lib/remove_blank_fields')
// passing this as a second argument to `router.<verb>` will make it
// so that a token MUST be passed for that route to be available
// it will also set `req.user`
const requireToken = passport.authenticate('bearer', { session: false })

// instantiate a router (mini app that only handles routes)
const router = express.Router()

// INDEX
// GET /planets
router.get('/planets', (req, res, next) => {
  Planet.find()
    .then(planets => {
      // `planets` will be an array of Mongoose documents
      // we want to convert each one to a POJO, so we use `.map` to
      // apply `.toObject` to each one
      return planets.map(planet => planet.toObject())
    })
    // respond with status 200 and JSON of the planets
    .then(planets => res.status(200).json({ planets: planets }))
    // if an error occurs, pass it to the handler
    .catch(next)
})

// SHOW
// GET /planets/5a7db6c74d55bc51bdf39793
router.get('/planets/:id', (req, res, next) => {
  // req.params.id will be set based on the `:id` in the route
  Planet.findById(req.params.id)
    .then(handle404)
    // if `findById` is succesful, respond with 200 and "planet" JSON
    .then(planet => res.status(200).json({ planet: planet.toObject() }))
    // if an error occurs, pass it to the handler
    .catch(next)
})

// CREATE
// POST /planets
router.post('/planets', requireToken, (req, res, next) => {
  // set owner of new planet to be current user
  req.body.planet.owner = req.user.id

  Planet.create(req.body.planet)
    // respond to succesful `create` with status 201 and JSON of new "planet"
    .then(planet => {
      res.status(201).json({ planet: planet.toObject() })
    })
    // if an error occurs, pass it off to our error handler
    // the error handler needs the error message and the `res` object so that it
    // can send an error message back to the client
    .catch(next)
})

// UPDATE
// PATCH /planets/5a7db6c74d55bc51bdf39793
router.patch('/planets/:id', requireToken, removeBlanks, (req, res, next) => {
  // if the client attempts to change the `owner` property by including a new
  // owner, prevent that by deleting that key/value pair
  delete req.body.planet.owner

  Planet.findById(req.params.id)
    .then(handle404)
    .then(planet => {
      // pass the `req` object and the Mongoose record to `requireOwnership`
      // it will throw an error if the current user isn't the owner
      requireOwnership(req, planet)

      // pass the result of Mongoose's `.update` to the next `.then`
      return planet.updateOne(req.body.planet)
    })
    // if that succeeded, return 204 and no JSON
    .then(() => res.sendStatus(204))
    // if an error occurs, pass it to the handler
    .catch(next)
})

// DESTROY
// DELETE /planets/5a7db6c74d55bc51bdf39793
router.delete('/planets/:id', requireToken, (req, res, next) => {
  Planet.findById(req.params.id)
    .then(handle404)
    .then(planet => {
      // throw an error if current user doesn't own `planet`
      requireOwnership(req, planet)
      // delete the planet ONLY IF the above didn't throw
      planet.deleteOne()
    })
    // send back 204 and no content if the deletion succeeded
    .then(() => res.sendStatus(204))
    // if an error occurs, pass it to the handler
    .catch(next)
})

module.exports = router
