/*===========* Requires *===============*/

var express = require('express');
var router = express.Router();

/*===========* Routing Functions *===============*/

router.get('/', getHomeRoute);

/*===========* Helper Functions *===============*/

function getHomeRoute(req, res, next) {
  res.render('index', { title: 'Express' });
}

module.exports = router;
