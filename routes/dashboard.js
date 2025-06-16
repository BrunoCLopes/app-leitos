var express = require('express');
var router = express.Router();
const fs = require('fs');
const path = require('path');
const sequelize = require('sequelize');

const { Bed, Bed_status, Bed_unit, Available_bed, Maintenance_bed, Occupied_bed, Request } = require('../models/index');

router.get('/', async function (req, res, next) {
  try {
    // Busca dados por unidade
    const bedsData = await Bed_unit.findAll({
      attributes: [
        'id',
        'name'
      ],
      include: [{
        model: Bed,
        required: false,
        include: [{
          model: Bed_status,
          attributes: ['name']
        }]
      }],
      raw: false,
      nest: true
    });

    // Processa os dados para contar os leitos por status em cada unidade
    const processedData = bedsData.map(unit => ({
      name: unit.name,
      available: unit.Beds.filter(bed => bed.Bed_status.name === 'Disponível').length,
      maintenance: unit.Beds.filter(bed => bed.Bed_status.name === 'Em Manutenção').length,
      occupied: unit.Beds.filter(bed => bed.Bed_status.name === 'Ocupado').length
    }));

    // Calcula os totais
    const totals = processedData.reduce((acc, curr) => ({
      total: acc.total + curr.available + curr.maintenance + curr.occupied,
      available: acc.available + curr.available,
      maintenance: acc.maintenance + curr.maintenance,
      occupied: acc.occupied + curr.occupied
    }), { total: 0, available: 0, maintenance: 0, occupied: 0 });

    const requestsFromDb = await Request.findAll({ order: [['id', 'DESC']], limit: 7 });
    const requests = requestsFromDb.map(request => ({
      responsavel: request.professional,
      tipo: request.type === 'Manutenção' ? 'manutencao'
          : request.type === 'Limpeza' ? 'limpeza'
          : request.type === 'Medicar Paciente' ? 'medicar'
          : request.type === 'Transferência de Paciente' ? 'transferencia'
          : 'outro',
      tipoLabel: request.type,
      leito: request.bed_number
    }));

    // Prepara dados para o gráfico
    const graphData = {
      labels: processedData.map(unit => unit.name),
      datasets: [
        {
          label: 'Disponíveis',
          data: processedData.map(unit => unit.available),
          backgroundColor: '#4CAF50'
        },
        {
          label: 'Manutenção',
          data: processedData.map(unit => unit.maintenance),
          backgroundColor: '#E2C000'
        },
        {
          label: 'Ocupados',
          data: processedData.map(unit => unit.occupied),
          backgroundColor: '#E53935'
        }
      ]
    };

    res.render('pages/dashboard', {
      title: 'Painel',
      total_beds: totals.total,
      available_beds: totals.available,
      maintenance_beds: totals.maintenance,
      occupied_beds: totals.occupied,
      requests,
      graphData
    });

  } catch (error) {
    console.error('Erro ao carregar dados do dashboard:', error);
    res.status(500).send('Erro ao carregar dados do dashboard');
  }
});


module.exports = router;
