var express = require('express');
var router = express.Router();
const fs = require('fs');
const path = require('path');

router.get('/', function(req, res, next) {
    const dashboardContent = fs.readFileSync(
        path.join(__dirname, '../views/pages/dashboard.ejs'),
        'utf8'
      );

  res.render('layout', {
    title: 'Painel',
    body: dashboardContent
  });
});

module.exports = router;
