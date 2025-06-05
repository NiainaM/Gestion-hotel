const express = require('express');
const cors = require('cors');
require('dotenv').config();
const bodyParser = require('body-parser');
const app = express();

const db = require('./models');
(async () => {
    await db.sequelize.sync({ alter: true });
}) ();

app.use(bodyParser.json());
app.use(cors());

app.use('/api/admins', require('./routes/adminRoute'));
app.use('/api/clients', require('./routes/clientRoute'));
app.use('/api/hotels', require('./routes/hotelRoute'));
app.use('/api/chambres', require('./routes/chambreRoute'));
app.use('/api/reservations', require('./routes/reservationRoute'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;