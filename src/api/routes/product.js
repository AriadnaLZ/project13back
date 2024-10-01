const { getProductById, getProducts, postProduct, updateProduct, deleteProduct, putOpinionesAtProduct } = require("../controllers/product");

const productsRouter = require('express').Router()

productsRouter.get('/', getProducts)
productsRouter.get('/:id', getProductById)
productsRouter.post('/', postProduct)
productsRouter.put('/:id', updateProduct)
productsRouter.put('/:idProduct/:idOpinion', putOpinionesAtProduct)
productsRouter.delete('/:id', deleteProduct)

module.exports = productsRouter