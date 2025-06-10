var express = require('express');
var router = express.Router();
const { Employee, Situation, Request } = require('../models/index');

router.use(express.urlencoded({ extended: true }));

router.get('/', async function (req, res, next) {

  const requests = await Request.findAll();
  const employees = await Employee.findAll({
    include: [{
      model: Situation,
      attributes: ['id', 'name'],
      where: { name: 'Em Plantão' }
    }]
  });

  const simplifiedRequests = requests.map(request => ({
    id: request.id,
    type: request.type,
    bed_number: request.bed_number,
    professional: request.professional,
    observations: request.observations,
  }));

  console.log('Solicitações simplificadas:', simplifiedRequests);

  const simplifiedEmployees = employees.map(employee => ({
    name: employee.name,
    situation: employee.Situation ? employee.Situation.name : null,
  }));

  res.render('pages/requests', {
    title: 'Solicitações',
    requests: simplifiedRequests,
    employees: simplifiedEmployees
  });
});

router.post('/create', async function (req, res, next) {
  try {
    console.log('Campos recebidos:', req.body);
    
    const { type, bed_number, professional, observations } = req.body;

    const newRequest = await Request.create({
      type: type,
      bed_number: bed_number,
      professional: professional,
      observations: observations
    });

    console.log('Nova solicitação criada:', newRequest);
    res.redirect('/requests');
  } catch (error) {
    console.error('Erro ao criar solicitação:', error);
    res.status(500).send('Erro ao criar solicitação');
  }
});

router.post('/update', async function (req, res, next) {
  try {
    console.log('Dados para atualizar:', req.body);
    
    const { id, type, bed_number, professional, observations } = req.body;

    const updatedRequest = await Request.update({
      type: type,
      bed_number: bed_number,
      professional: professional,
      observations: observations
    }, {
      where: { id: id }
    });

    console.log('Solicitação atualizada:', updatedRequest);
    res.redirect('/requests');
  } catch (error) {
    console.error('Erro ao atualizar solicitação:', error);
    res.status(500).send('Erro ao atualizar solicitação');
  }
});

router.post('/delete', async function (req, res, next) {
  try {
    console.log('ID para deletar:', req.body);
    
    const { id } = req.body;

    const deletedRequest = await Request.destroy({
      where: { id: id }
    });

    console.log('Solicitação deletada:', deletedRequest);
    res.redirect('/requests');
  } catch (error) {
    console.error('Erro ao deletar solicitação:', error);
    res.status(500).send('Erro ao deletar solicitação');
  }
});

module.exports = router;
