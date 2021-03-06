/*===========* Requires *===============*/

var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Superhero = mongoose.model('superheroes');

/*===========* Routing Functions *===============*/

router.get('/superheroes', getAllSuperheroes);
router.get('/superhero/:id', getOneSuperhero);
router.post('/superheroes', addSuperhero);
router.put('/superhero/:id', updateSuperhero);
router.delete('/superhero/:id', deleteSuperhero);

/*===========* Helper Functions *===============*/

function getAllSuperheroes(req, res, next) {
  Superhero.find(function(err, superheroes) {
     res.render('api', { title: "Superhero API", superheroes: superheroes });
   });
}

function getOneSuperhero(req, res, next) {
  var query = { "_id": req.params.id };

  Superhero.findOne(query, function(err, superhero) {
    res.render('superhero', { title: "Superhero API - " + superhero.name, superhero: superhero });
  });
}

function addSuperhero(req, res, next) {
  new Superhero({name: req.body.name, superpower: req.body.power})
    .save(function(err, superhero) {
      res.redirect('/api/superheroes');
    });
}

function updateSuperhero(req, res, next) {
  var query = { "_id": req.params.id };
  var update = { name: req.body.name, superpower: req.body.power };
  var options = { new: true };

  Superhero.findOneAndUpdate(query, update, options, function(err, superhero) {
    res.render('superhero', { title: 'Superhero API - ' + superhero.name, superhero: superhero });
  });
}

function deleteSuperhero(req, res, next) {
  var query = { "_id": req.params.id };
  Superhero.findOneAndRemove(query, function(err, superhero) {
    res.redirect('/api/superheroes');
  });
}



module.exports = router;
