import postService from '../services/post.js'

export default class PostController {
  getAll = async (req, res) => {
    const results = await postService.getAll()
    res.json(results)
  }

  create = async (req, res) => {
    const { body } = req
    const { userId } = req
    const result = await postService.create({ body, userId })

    if (result.error) {
      return res.status(400).json({ error: result.error })
    }

    return res.status(201).json(result)
  }

  update = async (req, res) => {
    const { postId } = req.params
    const { body } = req

    const result = await postService.update({ postId, body })

    return res.json(result)
  }

  delete = async (req, res) => {
    const { id } = req.params
    const result = await postService.delete({ id })

    if (result.error) return res.status(404).json(result)
    return res.status(200).json()
  }
}
