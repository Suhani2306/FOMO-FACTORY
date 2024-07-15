const mongoose = require('mongoose');

const coinSchema = new mongoose.Schema({}, { strict: false });

module.exports = mongoose.model('Coin', coinSchema, 'coin-based-data');
