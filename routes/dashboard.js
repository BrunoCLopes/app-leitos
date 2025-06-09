var express = require('express');
var router = express.Router();

const {Bed, Bed_status} = require('../models/index');

router.get('/', async function (req, res, next) {

  let total_beds = 0;
  let available_beds = 0;
  let maintenance_beds = 0;
  let occupied_beds = 0;

  // Total de leitos
  await Bed.count().then(count => {
    console.log(`Total de leitos: ${count}`);
    total_beds = count;
  }).catch(err => {
    console.error('Erro ao contar leitos:', err);
  });

  // verifica quantos leitos estão disponíveis
  await Bed.count({
    include: [
      { model: Bed_status, where: { name: 'Disponível' } }
    ]
  }).then(count => {
    console.log(`Total de leitos disponíveis: ${count}`);
    available_beds = count;
  }).catch(err => {
    console.error('Erro ao contar leitos disponíveis:', err);
  });

  // verifica quantos leitos estão em manutenção
  await Bed.count({
    include: [
      { model: Bed_status, where: { name: 'Em Manutenção' } }
    ]
  }).then(count => {
    console.log(`Total de leitos em manutenção: ${count}`);
    maintenance_beds = count;
  }).catch(err => {
    console.error('Erro ao contar leitos em manutenção:', err);
  });

  // verifica quantos leitos estão ocupados
  await Bed.count({
    include: [
      { model: Bed_status, where: { name: 'Ocupado' } }
    ]
  }).then(count => {
    console.log(`Total de leitos ocupados: ${count}`);
    occupied_beds = count;
  }).catch(err => {
    console.error('Erro ao contar leitos ocupados:', err);
  });


  res.render('pages/dashboard', {
    title: 'Painel',
    total_beds: total_beds,
    available_beds: available_beds,
    maintenance_beds: maintenance_beds,
    occupied_beds: occupied_beds
  });
});


module.exports = router;
