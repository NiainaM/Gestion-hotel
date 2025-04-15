const db = require('../models');
const Client = db.Client;

exports.create = async (req, res) => {
  try {
    const client = await Client.create(req.body);
    res.status(201).json(client);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.findAll = async (req, res) => {
  const clients = await Client.findAll();
  res.json(clients);
};

exports.findOne = async (req, res) => {
  const client = await Client.findByPk(req.params.id);
  if (client) res.json(client);
  else res.status(404).json({ message: 'Not found' });
};

exports.update = async (req, res) => {
  const updated = await Client.update(req.body, { where: { id: req.params.id } });
  res.json({ updated });
};

exports.delete = async (req, res) => {
  const deleted = await Client.destroy({ where: { id: req.params.id } });
  res.json({ deleted });
};