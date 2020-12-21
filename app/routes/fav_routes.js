const express = require('express')
const passport = require('passport')

const Fav = require('../models/favs')

const customErrors = require('../../lib/custom_errors')

const handle404 = customErrors.handle404
const requireOwnership = customErrors.requireOwnership

const removeBlanks = require('../../lib/remove_blank_fields')
const requireToken = passport.authenticate('bearer', { session: false })

const router = express.Router()

router.get('/favs', requireToken, (req, res, next) => {
  Fav.find()
    .then(favs => {
      return favs.map(fav => fav.toObject())
    })
    .then(favs => res.status(200).json({ favs: favs }))
    .catch(next)
})

router.get('/favs-user', requireToken, (req, res, next) => {
  // console.log(req.user)
  Fav.find({'owner': req.user.id})
    .then(handle404)
    .then(favs => {
      return favs.map(fav => {
        requireOwnership(req, fav)
        return fav.toObject()
      })
    })
    .then(favs => {
    // console.log(favs)
      res.status(200).json({ favs: favs })
    })
    .catch(next)
})

router.get('/favs/:id', requireToken, (req, res, next) => {
  Fav.findById(req.params.id)
    .then(handle404)
    .then(fav => res.status(200).json({ fav: fav.toObject() }))
    .catch(next)
})

router.post('/favs', requireToken, (req, res, next) => {
  req.body.fav.owner = req.user.id

  Fav.create(req.body.fav)
    .then(fav => {
      res.status(201).json({ fav: fav.toObject() })
    })
    .catch(next)
})

router.patch('/favs/:id', requireToken, removeBlanks, (req, res, next) => {
  delete req.body.fav.owner

  Fav.findById(req.params.id)
    .then(handle404)
    .then(fav => {
      requireOwnership(req, fav)

      return fav.updateOne(req.body.fav)
    })
    .then(() => res.sendStatus(204))
    .catch(next)
})

router.delete('/favs/:id', requireToken, (req, res, next) => {
  Fav.findById(req.params.id)
    .then(handle404)
    .then(fav => {
      requireOwnership(req, fav)
      fav.deleteOne()
    })
    .then(() => res.sendStatus(204))
    .catch(next)
})

router.delete('/favs-del-all/', requireToken, (req, res, next) => {
  Fav.deleteMany()
    .then(() => res.sendStatus(204))
    .catch(next)
})

module.exports = router
