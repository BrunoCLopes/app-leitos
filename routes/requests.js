var express = require('express');
var router = express.Router();
const fs = require('fs');
const path = require('path');

router.get('/', function(req, res, next) {

  res.render('pages/requests', {
    title: 'Solicitações',
  });
});

module.exports = router;
