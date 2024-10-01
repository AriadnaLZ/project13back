const { getOpiniones, getOpinionesById, postOpinion, updateOpinion, deleteOpinion } = require('../controllers/opinon')

const opinionesRouter = require('express').Router()

opinionesRouter.get('/', getOpiniones)
opinionesRouter.get('/:id', getOpinionesById)
opinionesRouter.post('/', postOpinion)
opinionesRouter.put('/:id', updateOpinion)
opinionesRouter.delete('/:id', deleteOpinion)

module.exports = opinionesRouter