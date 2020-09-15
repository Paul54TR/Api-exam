const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const LicitacionSchema = new Schema({
    rubro: String
})

module.exports = mongoose.model('Licitacion',LicitacionSchema);