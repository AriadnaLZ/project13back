const mongoose = require('mongoose')

const opinionSchema = new mongoose.Schema(
  {
    nombre: {type: String, required: true},
    texto: {type: String, required: true},

  }
)


const Opinion = mongoose.model('opiniones', opinionSchema, 'opiniones')
module.exports = Opinion