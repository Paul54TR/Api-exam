const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProveedorSchema = new Schema({
    ruc: Number,
    nombre: String,
    sancionado : Boolean,
    familiares: Boolean,
    congresistas: Boolean,
    registrado: Boolean,
    rubro: String
})  

module.exports = mongoose.model('Proveedor',ProveedorSchema);