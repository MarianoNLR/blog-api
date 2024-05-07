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
    const { id } = req.params
    const result = await userService.delete({ id })
    res.json(result)
  }

  login = async (req, res) => {
    const { body } = req
    const result = await userService.login({ body })

    if (result.error) {
      return res.status(401).json(result.error)
    } else {
      return res.status(200).json(result)
    }
  }
}
