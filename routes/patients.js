var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {

  res.render('pages/patients', {
    title: 'Pacientes',
  });
});

module.exports = router;
