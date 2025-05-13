var express = require('express');
var router = express.Router();
const fs = require('fs');
const path = require('path');

router.get('/', function(req, res, next) {
    const pacientsContent = fs.readFileSync(
        path.join(__dirname, '../views/pages/pacients.ejs'),
        'utf8'
      );

  res.render('layout', {
    title: 'Pacientes',
    body: pacientsContent
  });
});

module.exports = router;
