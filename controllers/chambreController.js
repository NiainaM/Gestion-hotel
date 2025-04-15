const db = require('../models');
const Chambre = db.Chambre;

exports.create = async (req, res) => {
  try {
    const chambre = await Chambre.create(req.body);
    res.status(201).json(chambre);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.findAll = async (req, res) => {
  const chambres = await Chambre.findAll();
  res.json(chambres);
};

exports.findOne = async (req, res) => {
  const chambre = await Chambre.findByPk(req.params.id);
  if (chambre) res.json(chambre);
  else res.status(404).json({ message: 'Not found' });
};

exports.update = async (req, res) => {
  const updated = await Chambre.update(req.body, { where: { id: req.params.id } });
  res.json({ updated });
};

exports.delete = async (req, res) => {
  const deleted = await Chambre.destroy({ where: { id: req.params.id } });
  res.json({ deleted });
};