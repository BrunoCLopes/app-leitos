var express = require('express');
var router = express.Router();
const fs = require('fs');
const path = require('path');

router.get('/', function(req, res, next) {
    const patientsContent = fs.readFileSync(
        path.join(__dirname, '../views/pages/patients.ejs'),
        'utf8'
      );

  res.render('layout', {
    title: 'Pacientes',
    body: patientsContent
  });
});

module.exports = router;
