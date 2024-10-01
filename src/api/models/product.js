const mongoose = require('mongoose')

const productSchema = new mongoose.Schema(
  {
    nombre: {type: String, required: true},
    imagen: {type: String, required: true},
    precio: {type: Number, required: true},
    descripcion: {type: String, required: true},
    tipo: {type: String, required: true, enum: ['Rubia', 'IPA', 'APA', 'Tostada', 'Sin alcohol']},
    // rating: {type: Number, required: true, min: 0, max: 5}
    opiniones: [{type: mongoose.Types.ObjectId, ref: 'opiniones'}]
  }
)

const Product = mongoose.model('products', productSchema, 'products')
module.exports = Product