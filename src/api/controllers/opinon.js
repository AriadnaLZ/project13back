const Opinion = require("../models/opinion");

const getOpiniones = async (req, res, next) => {
  try {
    const opiniones = await Opinion.find()
    return res.status(200).json(opiniones)
  } catch (error) {
    return res.status(400).json('Algo ha fallado al mostrar las opiniones')
  }
}

const getOpinionesById = async (req, res, next) => {
  try {
    const {id} = req.params
    const opinion = await Opinion.findById(id)
    return res.status(200).json(opinion)
  } catch (error) {
    return res.status(400).json('Algo ha fallado mostrando la opinión')
  }
}

const postOpinion = async (req, res, next) => {
  try {
    const newOpinion = new Opinion(req.body)
    const opinion = newOpinion.save()
    return res.status(200).json(product)
  } catch (error) {
    return res.status(400).json('Algo ha fallado subiendo la opinión')
  }
}

const updateOpinion = async (req, res, next) => {
  try {
    const {id} = req.params
    const oldOpinion = await Opinion.findById(id)
    const newOpinion = new Opinion(req.body)
    newOpinion._id = id
    const opinionUpdated = await Opinion.findByIdAndUpdate(id, newOpinion, {new: true})
    return res.status(200).json(opinionUpdated)
  } catch (error) {
    return res.status(400).json('Algo ha fallado modificando la opinión')
  }
}

const deleteOpinion = async (req, res, next) => {
  try {
    const {id} = req.params
    const opinionDeleted = await Opinion.findByIdAndDelete(id)
    return res.status(200).json(
      {
        mensaje: 'Ha sido eliminado la siguiente opinión',
        opinionEliminada: opinionDeleted
      }
    )
  } catch (error) {
    return res.status(400).json('Algo ha fallado eliminado la opinión')
  }
}

module.exports = {
  getOpiniones,
  getOpinionesById,
  postOpinion,
  updateOpinion,
deleteOpinion
}