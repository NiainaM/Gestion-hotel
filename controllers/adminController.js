const db = require('../models');
const Admin = db.Admin;

exports.create = async (req, res) => {
  try {
    const personneData = {
      nom: req.body.nom,
      prenoms: req.body.prenoms,
      email: req.body.email,
      tel: req.body.tel,
      password: req.body.password
    };

    const personne = await db.Personne.create(personneData);

    const admin = await Admin.create({
      personneId: personne.id,
      matricule: req.body.matricule
    });

    const { password, ...safePersonne } = personne.toJSON();

    res.status(201).json({ personne: safePersonne, admin });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.findAll = async (req, res) => {
  const admins = await Admin.findAll({ include: db.Personne });
  res.json(admins);
};

exports.findOne = async (req, res) => {
  try {
    const admin = await Admin.findByPk(req.params.id, {
      include: db.Personne
    });

    if (!admin) {
      return res.status(404).json({ message: 'Not found' });
    }

    const adminData = admin.toJSON();
    if (adminData.Personne && adminData.Personne.password) {
      delete adminData.Personne.password;
    }

    res.json(adminData);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.update = async (req, res) => {
  try {
    const admin = await Admin.findByPk(req.params.id);

    if (!admin) {
      return res.status(404).json({ message: 'Not found' });
    }

    await db.Personne.update(req.body, {
      where: { id: admin.personneId },
      individualHooks: true 
    });

    await Admin.update(req.body, { where: { id: req.params.id } });

    res.json({ updated: true });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.delete = async (req, res) => {
   try {
    const admin = await Admin.findByPk(req.params.id, { include: db.Personne });

    if (!admin) {
      return res.status(404).json({ message: 'Not found' });
    }

    // Supprimer d'abord l'admin, ensuite la personne liée
    await admin.destroy();
    if (admin.Personne) {
      await admin.Personne.destroy();
    }

    res.json({ deleted: true });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};