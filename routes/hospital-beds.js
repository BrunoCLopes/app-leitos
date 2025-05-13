var express = require('express');
var router = express.Router();
const fs = require('fs');
const path = require('path');

router.get('/', function(req, res, next) {
    const hospitalBedsContent = fs.readFileSync(
        path.join(__dirname, '../views/pages/hospital-beds.ejs'),
        'utf8'
      );

  res.render('layout', {
    title: 'Leitos',
    body: hospitalBedsContent
  });
});

module.exports = router;
