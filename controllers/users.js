import userService from '../services/user.js'

export default class UserController {
  getAll = async (req, res) => {
    const result = await userService.getAll()
    res.json(result)
  }

  create = async (req, res) => {
    const { body } = req

    try {
      const result = await userService.createUser({ body })
      console.log('creado')
      res.status(201).json(result)
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  }

  update = async (req, res) => {
    const { id } = req.params
    const { body } = req
    try {
      const result = await userService.updateUser({ id, body })
      res.json(result)
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  }

  delete = async (req, res) => {

  }
}