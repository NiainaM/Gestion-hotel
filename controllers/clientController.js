const db = require('../models');
const Client = db.Client;

exports.create = async (req, res) => {
  try {
    const personne = await db.Personne.create(req.body);
    const client = await Client.create({
      personneId: personne.id,
      numeroClient: req.body.numeroClient
    });
    res.status(201).json({ personne, client });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.findAll = async (req, res) => {
  const clients = await Client.findAll( { include: db.Personne });
  res.json(clients);
};

exports.findOne = async (req, res) => {
  const client = await Client.findByPk(req.params.id, { include: db.Personne });
  if (client) res.json(client);
  else res.status(404).json({ message: 'Not found' });
};

exports.update = async (req, res) => {
  const client = await Client.findByPk(req.params.id);
  if (client) {
    await db.Personne.update(req.body, { where: { id: client.personneId } });
    await Client.update(req.body, { where: { id: req.params.id } });
    res.json({ updated: true });
  } else {
    res.status(404).json({ message: 'Not found' });
  }
};

exports.delete = async (req, res) => {
  const client = await Client.findByPk(req.params.id);
  if (client) {
    await db.Personne.destroy({ where: { id: client.personneId } });
    await Client.destroy({ where: { id: req.params.id } });
    res.json({ deleted: true });
  } else {
    res.status(404).json({ message: 'Not found' });
  }
};