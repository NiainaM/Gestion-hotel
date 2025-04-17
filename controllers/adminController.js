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
  const admins = await Admin.findAll({ include: db.Personne });
  res.json(admins);
};

exports.findOne = async (req, res) => {
  const admin = await Admin.findByPk(req.params.id, { include: db.Personne });
  if (admin) res.json(admin);
  else res.status(404).json({ message: 'Not found' });
};

exports.update = async (req, res) => {
  const admin = await Admin.findByPk(req.params.id);
  if (admin) {
    await db.Personne.update(req.body, { where: { id: admin.personneId } });
    await Admin.update(req.body, { where: { id: req.params.id } });
    res.json({ updated: true });
  } else {
    res.status(404).json({ message: 'Not found' });
  }
};

exports.delete = async (req, res) => {
  const admin = await Admin.findByPk(req.params.id, { include: db.Personne});
  if (admin) {
    await db.Personne.destroy({ where: { id: admin.personneId } });
    await Admin.destroy({ where: { id: req.params.id } });
    res.json({ deleted: true });
  } else {
    res.status(404).json({ message: 'Not found' });
  }
};