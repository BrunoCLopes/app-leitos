var express = require('express');
var router = express.Router();
const path = require('path');
const {Bed} = require('../models/index');

router.get('/', async function (req, res, next) {
  try {

    const beds = await Bed.findAll({});

    const simplifiedBeds = beds.map(bed => ({
      id: bed.id,
      number: bed.number,
      last_cleaning: bed.last_cleaning,
      unit: bed.unit,
      status: bed.status,
      observation: bed.observation,
    }));

    console.log('Leitos simplificados:', simplifiedBeds);

    res.render('pages/hospital-beds', {
      title: 'Leitos',
      beds: simplifiedBeds
    });
} catch (error) {
    console.error('Erro ao buscar leitos:', error);
    next(error);
  }
});

module.exports = router;
