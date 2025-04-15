const db = require('../models');
const Admin = db.Admin;

exports.create = async (req, res) => {
  try {
    const admin = await Admin.create(req.body);
    res.status(201).json(admin);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.findAll = async (req, res) => {
  const admins = await Admin.findAll();
  res.json(admins);
};

exports.findOne = async (req, res) => {
  const admin = await Admin.findByPk(req.params.id);
  if (admin) res.json(admin);
  else res.status(404).json({ message: 'Not found' });
};

exports.update = async (req, res) => {
  const updated = await Admin.update(req.body, { where: { id: req.params.id } });
  res.json({ updated });
};

exports.delete = async (req, res) => {
  const deleted = await Admin.destroy({ where: { id: req.params.id } });
  res.json({ deleted });
};