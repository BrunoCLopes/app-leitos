var express = require('express');
var router = express.Router();
const fs = require('fs');
const path = require('path');

router.get('/', function(req, res, next) {
    const teamContent = fs.readFileSync(
        path.join(__dirname, '../views/pages/team.ejs'),
        'utf8'
      );

  res.render('layout', {
    title: 'Equipe',
    body: teamContent
  });
});

module.exports = router;
