const db = require('../models');
const Reservation = db.Reservation;

exports.create = async (req, res) => {
  try {
    const reservation = await Reservation.create(req.body);
    res.status(201).json(reservation);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.findAll = async (req, res) => {
  const reservations = await Reservation.findAll();
  res.json(reservations);
};

exports.findOne = async (req, res) => {
  const reservation = await Reservation.findByPk(req.params.id);
  if (reservation) res.json(reservation);
  else res.status(404).json({ message: 'Not found' });
};

exports.update = async (req, res) => {
  const updated = await Reservation.update(req.body, { where: { id: req.params.id } });
  res.json({ updated });
};

exports.delete = async (req, res) => {
  const deleted = await Reservation.destroy({ where: { id: req.params.id } });
  res.json({ deleted });
};