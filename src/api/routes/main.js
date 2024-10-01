const opinionesRouter = require("./opinion");
const productsRouter = require("./product");
const usersRouter = require("./user");

const mainRouter = require('express').Router()
mainRouter.use('/users', usersRouter)
mainRouter.use('/products', productsRouter)
mainRouter.use('/opiniones', opinionesRouter)

module.exports = mainRouter
