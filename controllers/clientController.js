const db = require('../models');
const Client = db.Client;

exports.create = async (req, res) => {
  try {
    const personneData = {
      nom: req.body.nom,
      prenoms: req.body.prenoms,
      email: req.body.email,
      tel: req.body.tel,
      password: req.body.password  // Ce champ sera hashé dans le model
    };

    const personne = await db.Personne.create(personneData);

    const client = await Client.create({
      personneId: personne.id,
      numeroClient: req.body.numeroClient
    });

    // On retire le mot de passe de la réponse
    const { password, ...safePersonne } = personne.toJSON();
    res.status(201).json({ personne: safePersonne, client });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.findAll = async (req, res) => {
  const clients = await Client.findAll( { include: db.Personne });
  res.json(clients);
};

exports.findOne = async (req, res) => {
   try {
    const client = await Client.findByPk(req.params.id, {
      include: db.Personne
    });

    if (!client) {
      return res.status(404).json({ message: 'Not found' });
    }

    // Supprimer le mot de passe de la réponse
    const clientData = client.toJSON();
    if (clientData.Personne && clientData.Personne.password) {
      delete clientData.Personne.password;
    }

    res.json(clientData);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.update = async (req, res) => {
  try {
    const client = await Client.findByPk(req.params.id, { include: db.Personne })
    if (!client) {
      res.status(404).json({ message: 'Not found' });
    }
    const personne = client.Personne;

    if (personne) {
      personne.nom = req.body.nom || personne.nom;
      personne.prenoms = req.body.prenoms || personne.prenoms;
      personne.email = req.body.email || personne.email;
      personne.tel = req.body.tel || personne.tel;
      if (req.body.password) personne.password = req.body.password;
      await personne.save();
    }

    client.numeroClient = req.body.numeroClient || client.numeroClient;

    res.json({update: true});
  } catch (error) {
    res.status(500).json({message: error.message});
  }
};

exports.delete = async (req, res) => {
  try {
    const client = await Client.findByPk(req.params.id, { include: db.Personne });

    if (!client) {
      return res.status(404).json({ message: 'Not found' });
    }

    // Supprimer d'abord le client, puis la personne liée
    await client.destroy();
    if (client.Personne) {
      await client.Personne.destroy();
    }

    res.json({ deleted: true });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};