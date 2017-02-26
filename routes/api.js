var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Superhero = mongoose.model('superheroes');

/* GET api page. */
router.get('/superheroes', function(req, res, next) {
  Superhero.find(function(err, superheroes) {
    console.log(superheroes);
    res.render('api', { title: "Superhero API", superheroes: superheroes });
  });
});


router.post('/superheroes', function(req, res, next) {
  new Superhero({name: req.body.name, superpower: req.body.power})
    .save(function(err, superhero) {
      console.log(superhero);
      res.redirect('/api/superheroes');
    });
});

router.get('/superhero/:id', function(req, res, next) {
  var query = { "_id": req.params.id };

  Superhero.findOne(query, function(err, superhero) {
    console.log(superhero);
    res.render('superhero', { title: "Superhero API - " + superhero.name, superhero: superhero });
  });
});


router.put('/superhero/:id', function(req, res, next) {
  var query = { "_id": req.params.id };
  var update = { name: req.body.name, superpower: req.body.power };
  var options = { new: true };

  Superhero.findOneAndUpdate(query, update, options, function(err, superhero) {
    console.log(superhero);
    res.render('superhero', { title: 'Superhero API - ' + superhero.name, superhero: superhero });
  });

});


router.delete('/superhero/:id', function(req, res, next) {
  var query = { "_id": req.params.id };
  Superhero.findOneAndRemove(query, function(err, superhero) {
    console.log(superhero);
    res.redirect('/api/superheroes');
  });
});






module.exports = router;
