const Opinion = require("../models/opinion");
const Product = require("../models/product");

const getProducts = async (req, res, next) => {
  try {
    const productos = await Product.find()
    return res.status(200).json(productos)
  } catch (error) {
    return res.status(400).json('Algo ha fallado al mostrar los productos')
  }
}

const getProductById = async (req, res, next) => {
  try {
    const {id} = req.params
    const product = await Product.findById(id)
    return res.status(200).json(product)
  } catch (error) {
    return res.status(400).json('Algo ha fallado mostrando el producto')
  }
}

const postProduct = async (req, res, next) => {
  try {
    const newProduct = new Product(req.body)
    const product = newProduct.save()
    return res.status(201).json(product)
  } catch (error) {
    return res.status(400).json('Algo ha fallado subiendo el producto')
  }
}

const putOpinionesAtProduct = async (req, res, next) => {
  try {
    const {idProduct} = req.params
    const producto = await Product.findById(idProduct)
    const oldProducto = producto

    const {idOpinion} = req.params
    const opinion = await Opinion.findById(idOpinion)
    const oldOpinion = opinion

    const newProduct = new Product({opiniones: idOpinion})
    newProduct._id = idProduct
    newProduct.opiniones = [...oldProducto.opiniones, ...newProduct.opiniones]
    const productoUpdated = await Product.findByIdAndUpdate(idProduct, newProduct, {new: true})
    
    return res.status(200).json(productoUpdated)

  } catch (error) {
    res.status(400).json('Algo ha fallado mostrando las opiniones del producto')
  }
}

const updateProduct = async (req, res ,next) => {
  try {
    const {id} = req.params
    const oldProduct = await Product.findById(id)
    const newProduct = new Product(req.body)
    newProduct._id = id
    newProduct.opiniones = [...oldProduct.opiniones, ...newProduct.opiniones]
    const productUpdated = await Product.findByIdAndUpdate(id, newProduct, {new: true})
    return res.status(200).json(productUpdated)
  } catch (error) {
    return res.status(400).json('Algo ha fallado modificando el evento')
  }
}

const deleteProduct = async (req, res, next) => {
  try {
    const {id} = req.params
    const productDeleted = await Product.findByIdAndDelete(id)
    return res.status(200).json(
      {
        mensaje: 'Ha sido eliminado el siguiente producto',
        producctoEliminado: productDeleted
      }
    )
  } catch (error) {
    return res.status(400).json('Algo ha fallado eliminando el producto')
  }
}

module.exports = {
  getProducts,
  getProductById,
  postProduct,
  updateProduct,
  deleteProduct,
  putOpinionesAtProduct
}