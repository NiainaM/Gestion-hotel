const db = require('../models');
const sendMail = require('../utils/mailer');
const Reservation = db.Reservation;

exports.create = async (req, res) => {
  try {
    const reservation = await Reservation.create({
      dateDebut: req.body.dateDebut,
      dateFin: req.body.dateFin,
      ChambreId: req.body.ChambreId,
      ClientId: req.body.ClientId
    });

    // Récupérer le client et son email via la relation
    const client = await db.Client.findByPk(req.body.ClientId, {
      include: db.Personne
    });

    if (client && client.Personne && client.Personne.email) {
      const email = client.Personne.email;
      const prenoms = client.Personne.prenoms;

      await sendMail(
        email,
        'Confirmation de votre réservation',
        `Bonjour ${prenoms},\n\nVotre réservation du ${req.body.dateDebut} au ${req.body.dateFin} a bien été enregistrée.\n\nMerci !`
      );
    }
    
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