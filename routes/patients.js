var express = require('express');
var router = express.Router();
const { Occupied_bed, Bed, Bed_unit } = require('../models');

router.get('/', async function(req, res, next) {
  try {
    const patientsRaw = await Occupied_bed.findAll({
      include: [
        {
          model: Bed,
          as: 'bed',
          include: [
            {
              model: Bed_unit,
              as: 'unit'
            }
          ]
        }
      ]
    });

    const patients = patientsRaw.map(patient => {
      let gravityClass = '';
      if (patient.gravity && (patient.gravity.toLowerCase() === 'crítico' || patient.gravity.toLowerCase() === 'critico')) gravityClass = 'critic';
      else if (patient.gravity && patient.gravity.toLowerCase() === 'moderado') gravityClass = 'moderate';
      else gravityClass = 'estable';

      const now = new Date();
      const occupied = new Date(patient.time_occupied);
      const diffMs = now - occupied;
      const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

      return {
        ...patient.toJSON(),
        gravityClass,
        diffDays
      };
    });

    console.log('patients:', patients);

    res.render('pages/patients', {
      title: 'Pacientes',
      patients
    });
  } catch (error) {
    console.error('Erro na rota /patients:', error); // <-- LOG DE ERRO
    next(error);
  }
});

module.exports = router;
