import blogService from '../services/post.js'

export default class BlogController {
  getAll = async (req, res) => {
    const results = await blogService.getAll()
    res.json(results)
  }

  create = async (req, res) => {
    const { body } = req
    const { userId } = req
    const result = await blogService.create({ body, userId })

    if (result.error) {
      return res.status(400).json({ error: result.error })
    }

    return res.status(201).json(result)
  }

  update = async (req, res) => {
    const { blogId } = req.params
    const { body } = req

    const result = await blogService.update({ blogId, body })

    res.json(result)
  }

  delete = async (req, res) => {

  }
}
