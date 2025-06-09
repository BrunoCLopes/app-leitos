var express = require('express');
var router = express.Router();
const {Request} = require('../models/index');

router.get('/', async function(req, res, next) {

    const requests = await Request.findAll();

    const simplifiedRequests = requests.map(request => ({
      id: request.id,
      type: request.type,
      bed_number: request.bed_number,
      professional: request.professional,
      observations: request.observations,
    }));

    console.log('Solicitações simplificadas:', simplifiedRequests);

  res.render('pages/requests', {
    title: 'Solicitações',
    requests: simplifiedRequests
  });
});

router.post('/', async function(req, res, next) {
  const { type, bed_number, professional, observations } = req.body;

  try {
    console.log('Solicitação recebida:', {
      type,
      bed_number,
      professional,
      observations
    });

    await Request.create({
      type: type,
      bed_number: bed_number,
      professional: professional,
      observations: observations,
    });

    res.status(201).json({ message: 'Solicitação criada com sucesso!' });
  } catch (error) {
    console.error('Erro ao enviar solicitação:', error);
    res.status(500).json({ error: 'Erro ao criar solicitação.' });
  }
});

module.exports = router;
