var express = require('express');
var router = express.Router();
const {Bed, Bed_status, Bed_unit, Available_bed, Maintenance_bed, Occupied_bed} = require('../models/index');

router.get('/', async function (req, res, next) {
  try {

    const beds = await Bed.findAll({
      include: [
        { model: Bed_status, attributes: ['name'] },
        { model: Bed_unit, attributes: ['name'] },
        { model: Available_bed, attributes: ['observations'] },
        { model: Maintenance_bed, attributes: ['reason', 'estimated_completion', 'responsible'] },
        { model: Occupied_bed, attributes: ['patient', 'time_occupied', 'hospitalization_reason', 'gravity'] }
      ]
    });

    const simplifiedBeds = beds.map(bed => ({
      id: bed.id,
      number: bed.number,
      last_cleaning: bed.last_cleaning,
      unit: bed.Bed_unit ? bed.Bed_unit.name : null,
      status: bed.Bed_status ? bed.Bed_status.name : null,
      available_observations: bed.Available_bed ? bed.Available_bed.observations : null,
      maintenance_reason: bed.Maintenance_bed ? bed.Maintenance_bed.reason : null,
      maintenance_estimated_completion: bed.Maintenance_bed ? bed.Maintenance_bed.estimated_completion : null,
      maintenance_responsible: bed.Maintenance_bed ? bed.Maintenance_bed.responsible : null,
      occupied_patient: bed.Occupied_bed ? bed.Occupied_bed.patient : null,
      occupied_time: bed.Occupied_bed ? bed.Occupied_bed.time_occupied : null,
      occupied_reason: bed.Occupied_bed ? bed.Occupied_bed.hospitalization_reason : null,
      occupied_gravity: bed.Occupied_bed ? bed.Occupied_bed.gravity : null
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
