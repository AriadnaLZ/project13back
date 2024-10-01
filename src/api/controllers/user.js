const { generarLlave } = require("../../utils/jwt");
const User = require("../models/user");
const bcrypt = require('bcrypt')

const getUsers = async (req, res, next) => {
  try {
    const users = await User.find()
    return res.status(200).json(users)
  } catch (error) {
    return res.status(400).json('Algo ha fallado mostrando los usuarios')
  }
}

const getUserById = async (req, res, next) => {
  try {
    const {id} = req.params
    const user = await User.findById(id)
    return res.status(200).json(user)
  } catch (error) {
    return res.status(400).json('Algo ha fallado al mostrar el usuario')
  }
}

const register = async (req, res, next) => {
  try {
    const userDuplicated = await User.findOne({userName: req.body.userName})
    if (userDuplicated) {
      return res.status(400).json('Usuario ya existente')
    }
    const password = req.body.password
    if (password.length -1 < 6 || password.length -1 > 10 ){
      return res.status(400).json('La contraseña debe tener entre 6 y 10 caracteres')
    }
    const emailDuplicated = await User.findOne({email: req.body.email})
    if (emailDuplicated) {
      return res.status(400).json('Email ya existente')
    }
    const newUser = new User(
      {
        userName: req.body.userName,
        password: req.body.password,
        email: req.body.email,
        rol: 'user'
      }
    )
    const user = await newUser.save()
    return res.status(201).json(user)
  } catch (error) {
    return res.status(400).json('Algo ha fallado en el registro')
  }
}

const updateUser = async (req, res, next) => {
  try {
    const {id} = req.params
    if (req.user._id.toString() !== id) {
      return res.status(400).json('Solo puedes modificar tu usuario')
    }
    const newUser = new User(req.body)
    newUser._id = id
    const userUpdated = await User.findByIdAndUpdate(id, newUser, {
      new: true
    })
    return res.status(200).json(userUpdated)
  } catch (error) {
    return res.status(400).json('Algo ha fallado modificando el usuario')
  }
}

const login = async (req, res, next) => {
  try {
    const {userName, password} = req.body
    const user = await User.findOne({userName})
    if (!user) {
      return res.status(400).json('Usuario incorrecto')
    }
    if (bcrypt.compareSync(password, user.password)) {
      const token = generarLlave(user._id)
      return res.status(200).json({token, user})
    }
    return res.status(400).json('Contraseña incorrecta')
  } catch (error) {
    return res.status(400).json('Algo ha fallado al iniciar sesión')
  }
}

module.exports = {
  getUsers,
  getUserById,
  register,
  updateUser,
  login
}