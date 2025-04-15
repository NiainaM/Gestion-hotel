const db = require('../models');
const Hotel = db.Hotel;

exports.create = async (req, res) => {
  try {
    const hotel = await Hotel.create(req.body);
    res.status(201).json(hotel);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.findOne = async (req, res) => {
  const hotel = await Hotel.findByPk(req.params.id);
  if (hotel) res.json(hotel);
  else res.status(404).json({ message: 'Not found' });
};

exports.update = async (req, res) => {
  const updated = await Hotel.update(req.body, { where: { id: req.params.id } });
  res.json({ updated });
};

exports.delete = async (req, res) => {
  const deleted = await Hotel.destroy({ where: { id: req.params.id } });
  res.json({ deleted });
};