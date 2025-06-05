var express = require('express');
var router = express.Router();
const fs = require('fs');
const path = require('path');
const { Employee, Role, Situation, Speciality } = require('../models/index');

router.get('/', async function (req, res, next) {
  try {

    const employees = await Employee.findAll({
      include: [
        { model: Role, attributes: ['id', 'name'] },
        { model: Situation, attributes: ['id', 'name'] },
        { model: Speciality, attributes: ['id', 'name'] }
      ]
    });

    const simplifiedEmployees = employees.map(employee => ({
      id: employee.id,
      name: employee.name,
      role: employee.Role ? employee.Role.name : null,
      situation: employee.Situation ? employee.Situation.name : null,
      speciality: employee.Speciality ? employee.Speciality.name : null
    }));

    console.log('Funcionários simplificados:', simplifiedEmployees);

    res.render('pages/team', {
      title: 'Equipe',
      employees: simplifiedEmployees
    });
  } catch (error) {
    console.error('Erro ao buscar funcionários:', error);
    next(error);
  }
});


module.exports = router;
