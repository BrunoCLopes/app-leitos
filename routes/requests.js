var express = require('express');
var router = express.Router();
const fs = require('fs');
const path = require('path');

router.get('/', function(req, res, next) {
    const requestsContent = fs.readFileSync(
        path.join(__dirname, '../views/pages/requests.ejs'),
        'utf8'
      );

  res.render('layout', {
    title: 'Solicitações',
    body: requestsContent
  });
});

module.exports = router;
